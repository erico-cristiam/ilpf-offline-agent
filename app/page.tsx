"use client";

import { FormEvent, useState } from "react";

type Screen = "home" | "chat" | "learn" | "library";
type Message = { role: "assistant" | "user"; content: string; source?: string };

const suggestedQuestions = [
  "Como recuperar uma pastagem degradada?",
  "Árvores melhoram o conforto do gado?",
  "Como começar em uma pequena propriedade?",
];

const lessons = [
  { id: "01", title: "Entendendo a ILPS", duration: "4 min", progress: 100 },
  { id: "02", title: "Diagnóstico da propriedade", duration: "6 min", progress: 65 },
  { id: "03", title: "Planejamento do sistema", duration: "8 min", progress: 0 },
];

function answerFor(question: string) {
  const text = question.toLowerCase();

  if (text.includes("pastagem") || text.includes("degradada")) {
    return {
      content: "A recuperação começa pelo diagnóstico do solo e da cobertura atual. Em uma estratégia ILPS, a lavoura pode ajudar a custear a correção do solo enquanto uma nova pastagem é estabelecida. Antes de escolher o consórcio, confirme análise de solo, regime de chuvas e disponibilidade de máquinas com a assistência técnica local.",
      source: "Embrapa — ILPF: perguntas e respostas",
    };
  }

  if (text.includes("árvore") || text.includes("gado") || text.includes("conforto")) {
    return {
      content: "Árvores bem planejadas podem oferecer sombra, reduzir o estresse térmico dos animais, proteger o solo e diversificar a renda. A espécie e o espaçamento devem considerar clima, pastagem, manejo do rebanho e objetivo econômico.",
      source: "Embrapa Florestas — Sistemas de ILPF",
    };
  }

  if (text.includes("pequena") || text.includes("começar")) {
    return {
      content: "É possível começar em uma pequena propriedade. Uma abordagem segura é escolher um talhão-piloto, definir o principal problema produtivo e avaliar quais recursos já estão disponíveis. O desenho final deve ser validado com assistência técnica.",
      source: "Embrapa — ILPF em pequenas propriedades",
    };
  }

  return {
    content: "Para adaptar a explicação à sua realidade, conte qual é a atividade principal, o tamanho aproximado da área e o maior desafio da propriedade hoje.",
    source: "Resposta demonstrativa do protótipo",
  };
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [profileReady, setProfileReady] = useState(false);
  const [propertySize, setPropertySize] = useState("Até 50 hectares");
  const [activity, setActivity] = useState("Pecuária");
  const [question, setQuestion] = useState("");
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Olá! O que você gostaria de aprender sobre ILPS hoje?" },
  ]);

  function sendQuestion(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    const answer = answerFor(trimmed);
    setMessages((current) => [...current, { role: "user", content: trimmed }, { role: "assistant", ...answer }]);
    setQuestion("");
    setScreen("chat");
  }

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendQuestion(question);
  }

  return (
    <main className="prototype-stage">
      <aside className="concept-panel">
        <span className="concept-kicker">PROTÓTIPO MOBILE · ECO-HACK UFAC</span>
        <h1>ILPS no Campo</h1>
        <p>Uma experiência educacional para levar conhecimento técnico sobre sistemas integrados a produtores da Amazônia.</p>
        <dl>
          <div><dt>Modelo planejado</dt><dd>Gemma 3n E2B</dd></div>
          <div><dt>Uso principal</dt><dd>Celular Android offline</dd></div>
          <div><dt>Estado atual</dt><dd>Protótipo navegável</dd></div>
        </dl>
        <small>Use o aparelho ao lado para explorar o fluxo.</small>
      </aside>

      <section className="phone" aria-label="Simulação do aplicativo ILPS no Campo">
        <div className="phone-speaker" aria-hidden="true" />
        <div className="status-bar" aria-hidden="true"><span>9:41</span><span>● ◒ ▰</span></div>

        <div className="app-viewport">
          {screen === "home" && (
            <div className="screen home-screen">
              <header className="app-topbar">
                <div className="app-brand"><span>I</span><div><strong>ILPS no Campo</strong><small>Modo local</small></div></div>
                <button className="icon-button" aria-label="Abrir menu">•••</button>
              </header>

              <section className="welcome-block">
                <span className="eyebrow">BOM DIA</span>
                <h2>O que vamos cultivar de conhecimento hoje?</h2>
                <button className="ask-card" onClick={() => setScreen("chat")}>
                  <span className="ask-icon">✦</span>
                  <span><strong>Pergunte ao tutor</strong><small>Tire uma dúvida sobre ILPS</small></span>
                  <b>→</b>
                </button>
              </section>

              <section className="home-section">
                <div className="section-heading"><h3>Continue aprendendo</h3><button onClick={() => setScreen("learn")}>Ver trilha</button></div>
                <button className="lesson-card" onClick={() => setScreen("learn")}>
                  <span className="lesson-number">02</span>
                  <span className="lesson-info"><small>TRILHA FUNDAMENTOS</small><strong>Diagnóstico da propriedade</strong><i><b style={{ width: "65%" }} /></i></span>
                  <span>›</span>
                </button>
              </section>

              <section className="home-section">
                <h3>Acesso rápido</h3>
                <div className="quick-grid">
                  <button onClick={() => sendQuestion("Como recuperar uma pastagem degradada?")}><span>PA</span><strong>Pastagem</strong><small>Recuperação</small></button>
                  <button onClick={() => sendQuestion("Árvores melhoram o conforto do gado?")}><span>AR</span><strong>Árvores</strong><small>Bem-estar</small></button>
                  <button onClick={() => setScreen("library")}><span>BI</span><strong>Biblioteca</strong><small>Fontes locais</small></button>
                </div>
              </section>

              <div className="offline-card"><span>✓</span><div><strong>Disponível sem internet</strong><small>Conteúdo salvo neste dispositivo</small></div></div>
            </div>
          )}

          {screen === "chat" && (
            <div className="screen chat-screen">
              <header className="screen-header"><button onClick={() => setScreen("home")} aria-label="Voltar">←</button><div><strong>Tutor ILPS</strong><small><span /> disponível offline</small></div><button aria-label="Informações">i</button></header>
              {!profileReady ? (
                <section className="onboarding">
                  <span className="onboarding-step">1 de 2</span>
                  <h2>Antes de começar</h2>
                  <p>Conte um pouco sobre sua propriedade para receber exemplos mais próximos da sua realidade.</p>
                  <label>Tamanho da propriedade<select value={propertySize} onChange={(event) => setPropertySize(event.target.value)}><option>Até 50 hectares</option><option>De 51 a 200 hectares</option><option>Mais de 200 hectares</option></select></label>
                  <label>Atividade principal<select value={activity} onChange={(event) => setActivity(event.target.value)}><option>Pecuária</option><option>Lavoura</option><option>Sistema misto</option><option>Ainda estou planejando</option></select></label>
                  <button className="app-primary" onClick={() => setProfileReady(true)}>Continuar</button>
                  <button className="text-button" onClick={() => setProfileReady(true)}>Pular por enquanto</button>
                </section>
              ) : (
                <>
                  <div className="profile-chip"><span>Perfil</span>{propertySize} · {activity}<button onClick={() => setProfileReady(false)}>Editar</button></div>
                  <div className="messages" aria-live="polite">
                    {messages.map((message, index) => (
                      <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
                        <p>{message.content}</p>
                        {message.source && <small><strong>Fonte</strong>{message.source}</small>}
                      </article>
                    ))}
                  </div>
                  <div className="prompt-chips">{suggestedQuestions.map((item) => <button key={item} onClick={() => sendQuestion(item)}>{item}</button>)}</div>
                  <form className="chat-composer" onSubmit={submitQuestion}><label className="sr-only" htmlFor="question">Digite sua pergunta</label><input id="question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Digite sua pergunta..." /><button type="submit" aria-label="Enviar">↑</button></form>
                  <p className="prototype-note">Respostas simuladas nesta versão. A inferência real será demonstrada no notebook.</p>
                </>
              )}
            </div>
          )}

          {screen === "learn" && (
            <div className="screen learn-screen">
              <header className="screen-title"><span className="eyebrow">MINHA TRILHA</span><h2>Fundamentos da ILPS</h2><p>Aprenda no seu ritmo. O progresso fica salvo no aparelho.</p></header>
              <div className="lesson-list">{lessons.map((lesson) => <article key={lesson.id}><span className={lesson.progress === 100 ? "done" : ""}>{lesson.progress === 100 ? "✓" : lesson.id}</span><div><small>{lesson.duration}</small><strong>{lesson.title}</strong><i><b style={{ width: `${lesson.progress}%` }} /></i></div><button aria-label={`Abrir ${lesson.title}`}>›</button></article>)}</div>
              <section className="quiz-box">
                <span className="quiz-label">REVISE O QUE APRENDEU</span>
                <h3>Qual é o primeiro passo antes de planejar um sistema ILPS?</h3>
                {[
                  "Escolher as espécies de árvores",
                  "Diagnosticar a propriedade",
                  "Comprar novos equipamentos",
                ].map((option) => <button className={quizAnswer === option ? "selected" : ""} key={option} onClick={() => setQuizAnswer(option)}><span>{quizAnswer === option ? "●" : "○"}</span>{option}</button>)}
                {quizAnswer && <p className={quizAnswer === "Diagnosticar a propriedade" ? "correct" : "incorrect"}>{quizAnswer === "Diagnosticar a propriedade" ? "Correto. Solo, clima, estrutura e objetivos orientam as próximas decisões." : "Tente novamente. Antes de escolher componentes, precisamos compreender a propriedade."}</p>}
              </section>
            </div>
          )}

          {screen === "library" && (
            <div className="screen library-screen">
              <header className="screen-title"><span className="eyebrow">BIBLIOTECA LOCAL</span><h2>Fontes confiáveis</h2><p>Materiais preparados para consulta mesmo sem conexão.</p></header>
              <label className="search-field"><span>⌕</span><input aria-label="Buscar na biblioteca" placeholder="Buscar assunto ou palavra-chave" /></label>
              <div className="library-filter"><button className="active">Todos</button><button>Pastagem</button><button>Floresta</button><button>Solo</button></div>
              <div className="document-list">
                <article><span>PDF</span><div><strong>ILPF: perguntas e respostas</strong><small>Embrapa · disponível offline</small></div><button aria-label="Abrir documento">›</button></article>
                <article><span>PDF</span><div><strong>Sistemas de ILPF na Região Norte</strong><small>Embrapa · disponível offline</small></div><button aria-label="Abrir documento">›</button></article>
                <article><span>GUIA</span><div><strong>Recuperação de pastagens</strong><small>Embrapa · disponível offline</small></div><button aria-label="Abrir documento">›</button></article>
              </div>
              <div className="storage-info"><span>✓</span><p><strong>3 materiais disponíveis</strong><small>Última atualização: hoje</small></p></div>
            </div>
          )}
        </div>

        <nav className="bottom-nav" aria-label="Navegação principal">
          <button className={screen === "home" ? "active" : ""} onClick={() => setScreen("home")} aria-current={screen === "home" ? "page" : undefined}><span>⌂</span>Início</button>
          <button className={screen === "chat" ? "active" : ""} onClick={() => setScreen("chat")} aria-current={screen === "chat" ? "page" : undefined}><span>✦</span>Tutor</button>
          <button className={screen === "learn" ? "active" : ""} onClick={() => setScreen("learn")} aria-current={screen === "learn" ? "page" : undefined}><span>✓</span>Trilha</button>
          <button className={screen === "library" ? "active" : ""} onClick={() => setScreen("library")} aria-current={screen === "library" ? "page" : undefined}><span>▤</span>Biblioteca</button>
        </nav>
        <div className="home-indicator" aria-hidden="true" />
      </section>
    </main>
  );
}
