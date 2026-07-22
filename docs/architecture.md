# Decisões de arquitetura

## Por que começamos pela web

O hackathon tem duração de um dia. Um protótipo web nos permite validar a experiência do produtor, testar a linguagem e gravar a demonstração sem gastar a maior parte do tempo com empacotamento Android.

O site não é apresentado como produto final. Em telas grandes ele mostra um aparelho simulado; em celulares, ocupa toda a tela como um aplicativo.

## Como o protótipo funciona hoje

- A interface é construída com React e vinext.
- As respostas do chat são exemplos locais e determinísticos.
- O perfil, a trilha, o quiz e a biblioteca existem apenas durante a sessão.
- Nenhum dado é enviado a serviços externos.

## Como o aplicativo deverá funcionar

```text
pergunta
  → busca semântica nos documentos locais
  → seleção dos trechos mais relevantes
  → prompt com contexto para o Gemma 3n E2B
  → resposta com referência e aviso técnico
```

Componentes planejados:

- aplicativo Android em Kotlin;
- Gemma 3n E2B em formato compatível com LiteRT-LM;
- índice de busca e documentos armazenados no aparelho;
- histórico e preferências mantidos localmente;
- atualização opcional da base quando houver conexão.

## Limites de segurança

O tutor pode explicar conceitos, comparar possibilidades e sugerir perguntas para uma visita técnica. Escolha de espécies, correção do solo, dosagens, custos e desenho definitivo do sistema dependem de diagnóstico local e devem ser confirmados por profissional qualificado.
