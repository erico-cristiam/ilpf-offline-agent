"use client";

import { FormEvent, useMemo, useState } from "react";

type Message = {
  role: "assistant" | "user";
  content: string;
  source?: string;
};

const suggestions = [
  "Como recuperar uma pastagem degradada?",
  "Quais benefícios das árvores para o gado?",
  "Como começar uma ILPS em pequena propriedade?",
];

const guidedSteps = [
  { number: "01", title: "Conheça a propriedade", text: "Área, atividade atual, solo e objetivo do produtor." },
  { number: "02", title: "Aprenda com contexto", text: "Explicações simples, exemplos locais e fontes confiáveis." },
  { number: "03", title: "Leve ao campo", text: "Checklist e perguntas para conversar com a assistência técnica." },
];

function demoAnswer(question: string) {
  const normalized = question.toLowerCase();

  if (normalized.includes("pastagem") || normalized.includes("degradada")) {
    return {
      content:
        "A recuperação começa pelo diagnóstico do solo e da cobertura atual. Em uma estratégia ILPS, a lavoura pode ajudar a custear a correção do solo enquanto uma nova pastagem é estabelecida. Antes de escolher o consórcio, confirme análise de solo, regime de chuvas e disponibilidade de máquinas com a assistência técnica local.",
      source: "Embrapa — Integração Lavoura-Pecuária-Floresta: perguntas e respostas",
    };
  }

  if (normalized.includes("árvore") || normalized.includes("gado") || normalized.includes("sombra")) {
    return {
      content:
        "Árvores bem planejadas podem melhorar o conforto térmico dos animais, diversificar a renda e contribuir para a conservação do solo. A espécie, o espaçamento e a orientação das linhas precisam considerar clima, pastagem, manejo do rebanho e objetivo econômico da propriedade.",
      source: "Embrapa Florestas — Sistemas de Integração Lavoura-Pecuária-Floresta",
    };
  }

  if (normalized.includes("pequena") || normalized.includes("começar")) {
    return {
      content:
        "Comece pequeno: defina um talhão-piloto, identifique o principal problema produtivo e escolha uma modalidade de integração compatível com seus recursos. A ILPS pode ser adotada em propriedades pequenas, mas exige planejamento e acompanhamento técnico para adequar o sistema ao solo e ao clima.",
      source: "Embrapa — É possível adotar ILPF em pequenas propriedades?",
    };
  }

  return {
    content:
      "Posso ajudar a transformar essa dúvida em uma trilha de aprendizagem sobre ILPS. Para orientar melhor, conte qual é a atividade principal da propriedade, o tamanho aproximado da área e o maior desafio que você enfrenta hoje.",
    source: "Resposta demonstrativa — a versão final usará RAG com documentos técnicos locais",
  };
}

export default function Home() {
  const [activeView, setActiveView] = useState<"chat" | "journey" | "library">("chat");
  const [profileReady, setProfileReady] = useState(false);
  const [propertySize, setPropertySize] = useState("Até 50 hectares");
  const [activity, setActivity] = useState("Pecuária");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Olá! Eu sou o seu tutor de ILPS. Posso explicar conceitos, indicar cuidados e preparar perguntas para você levar à assistência técnica.",
    },
  ]);

  const profileLabel = useMemo(
    () => `${propertySize} · ${activity}`,
    [propertySize, activity],
  );

  function sendQuestion(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    const answer = demoAnswer(trimmed);
    setMessages((current) => [
      ...current,
      { role: "user", content: trimmed },
      { role: "assistant", ...answer },
    ]);
    setQuestion("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendQuestion(question);
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="ILPS no Campo — início">
          <span className="brand-mark" aria-hidden="true">I</span>
          <span>
            <strong>ILPS no Campo</strong>
            <small>Conhecimento que cria raízes</small>
          </span>
        </a>
        <div className="status-pill"><span /> Protótipo Eco-Hack</div>
      </header>

      <section className="hero" id="inicio">
        <div className="eyebrow">Educação rural acessível, mesmo sem internet</div>
        <h1>Decisões mais conscientes começam com conhecimento claro.</h1>
        <p>
          Um agente educacional pensado para pequenos e médios produtores da Amazônia
          aprenderem sobre Integração Lavoura-Pecuária-Silvicultura.
        </p>
        <div className="hero-badges" aria-label="Características do projeto">
          <span>Gemma 3n</span><span>Offline-first</span><span>Fontes verificáveis</span>
        </div>
      </section>

      <section className="app-frame" aria-label="Demonstração do agente educacional">
        <div className="app-header">
          <div>
            <span className="app-kicker">Demonstração interativa</span>
            <h2>Seu tutor de ILPS</h2>
          </div>
          <div className="offline-badge"><span aria-hidden="true">●</span> arquitetura offline</div>
        </div>

        <nav className="tabs" aria-label="Áreas da demonstração">
          <button className={activeView === "chat" ? "active" : ""} onClick={() => setActiveView("chat")}>Conversa</button>
          <button className={activeView === "journey" ? "active" : ""} onClick={() => setActiveView("journey")}>Minha jornada</button>
          <button className={activeView === "library" ? "active" : ""} onClick={() => setActiveView("library")}>Biblioteca</button>
        </nav>

        {activeView === "chat" && (
          <div className="chat-layout">
            {!profileReady ? (
              <section className="profile-card">
                <span className="step-tag">PASSO 1 DE 2</span>
                <h3>Vamos conhecer sua realidade</h3>
                <p>Essas informações ajudam o tutor a adaptar a linguagem e os exemplos.</p>
                <label>
                  Tamanho aproximado da propriedade
                  <select value={propertySize} onChange={(event) => setPropertySize(event.target.value)}>
                    <option>Até 50 hectares</option>
                    <option>De 51 a 200 hectares</option>
                    <option>Mais de 200 hectares</option>
                  </select>
                </label>
                <label>
                  Atividade principal hoje
                  <select value={activity} onChange={(event) => setActivity(event.target.value)}>
                    <option>Pecuária</option>
                    <option>Lavoura</option>
                    <option>Sistema misto</option>
                    <option>Ainda estou planejando</option>
                  </select>
                </label>
                <button className="primary-button" onClick={() => setProfileReady(true)}>Começar conversa <span>→</span></button>
              </section>
            ) : (
              <section className="conversation">
                <div className="profile-summary">
                  <span>Perfil da conversa</span><strong>{profileLabel}</strong>
                  <button onClick={() => setProfileReady(false)}>Editar</button>
                </div>
                <div className="messages" aria-live="polite">
                  {messages.map((message, index) => (
                    <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
                      <span className="message-author">{message.role === "assistant" ? "Tutor ILPS" : "Você"}</span>
                      <p>{message.content}</p>
                      {message.source && <small><strong>Fonte:</strong> {message.source}</small>}
                    </article>
                  ))}
                </div>
                <div className="suggestions">
                  {suggestions.map((item) => <button key={item} onClick={() => sendQuestion(item)}>{item}</button>)}
                </div>
                <form className="composer" onSubmit={handleSubmit}>
                  <label className="sr-only" htmlFor="question">Digite sua dúvida sobre ILPS</label>
                  <input id="question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Pergunte sobre ILPS..." />
                  <button type="submit" aria-label="Enviar pergunta">Enviar</button>
                </form>
                <p className="demo-note">Respostas pré-configuradas para esta interface. O notebook demonstrará o pipeline real Gemma + RAG.</p>
              </section>
            )}
          </div>
        )}

        {activeView === "journey" && (
          <section className="journey-panel">
            <span className="step-tag">TRILHA INICIAL</span>
            <h3>Da curiosidade ao diálogo técnico</h3>
            <div className="steps-grid">
              {guidedSteps.map((step) => (
                <article key={step.number}><span>{step.number}</span><h4>{step.title}</h4><p>{step.text}</p></article>
              ))}
            </div>
            <div className="quiz-card">
              <div><small>VERIFICAÇÃO DE APRENDIZAGEM</small><strong>Qual é o primeiro passo antes de implantar uma ILPS?</strong></div>
              <button>Responder quiz</button>
            </div>
          </section>
        )}

        {activeView === "library" && (
          <section className="library-panel">
            <span className="step-tag">BASE TÉCNICA LOCAL</span>
            <h3>Conhecimento confiável, perto do produtor</h3>
            <p>Na versão final, estes materiais serão preparados no Kaggle e consultados diretamente no celular.</p>
            <div className="source-list">
              <article><span>01</span><div><strong>ILPF: perguntas e respostas</strong><small>Embrapa · fundamentos e implantação</small></div></article>
              <article><span>02</span><div><strong>Sistemas de ILPF na Região Norte</strong><small>Embrapa · contexto amazônico</small></div></article>
              <article><span>03</span><div><strong>Recuperação de pastagens</strong><small>Embrapa · manejo sustentável do solo</small></div></article>
            </div>
          </section>
        )}
      </section>

      <section className="principles">
        <div><span>01</span><h3>Local por princípio</h3><p>Projetado para funcionar no celular do produtor, sem depender de conectividade constante.</p></div>
        <div><span>02</span><h3>Educar, não prescrever</h3><p>Explica possibilidades e riscos, sem substituir o diagnóstico de um profissional de campo.</p></div>
        <div><span>03</span><h3>Resposta com origem</h3><p>Cada orientação aponta o material técnico usado, ajudando a combater desinformação.</p></div>
      </section>

      <section className="architecture">
        <div>
          <span className="eyebrow">Visão de produto</span>
          <h2>Do protótipo web ao aplicativo offline.</h2>
          <p>Esta experiência valida o fluxo educacional. A evolução embarca Gemma 3n E2B, busca semântica e documentos técnicos no próprio Android.</p>
        </div>
        <div className="architecture-flow" aria-label="Arquitetura futura">
          <span>Pergunta do produtor</span><b>→</b><span>Busca local</span><b>→</b><span>Gemma 3n</span><b>→</b><span>Resposta + fonte</span>
        </div>
      </section>

      <footer>
        <strong>ILPS no Campo</strong>
        <p>Projeto desenvolvido para o Build with Gemma: Amazon Eco-Hack · UFAC</p>
        <span>Protótipo educacional — não substitui assistência técnica.</span>
      </footer>
    </main>
  );
}
