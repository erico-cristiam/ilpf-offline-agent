# Base de conhecimento

A AGROFLORA IA usa recuperação de contexto (RAG) antes de enviar a pergunta ao Gemma. Os arquivos desta pasta não alteram os pesos do modelo.

## Níveis de autoridade

- `fonte_legal_primaria`: texto oficial, com prioridade em perguntas jurídicas.
- `referencia_tecnica`: publicação técnica usada para educação e planejamento.
- `artigo_cientifico` ou `livro_cientifico`: contexto conceitual e evidência científica.
- `referencia_tecnica_regional`: publicação técnica usada para contextualizar Amazônia e Acre.
- `conteudo_institucional_divulgacao`: visão institucional, usada somente para conceitos gerais.
- `conteudo_web_divulgacao_revisao_pendente` e `conteudo_web_comercial_revisao_pendente`: materiais práticos que exigem conferência antes de orientar manejo.
- `referencia_complementar_revisao_pendente`: material fornecido pela equipe que exige validação antes de orientar uma decisão.

O arquivo `chunks.json` contém os trechos curtos e metadados usados pela busca local. Os PDFs originais não são necessários em tempo de execução e não são distribuídos neste repositório. Materiais internos permanecem apenas no catálogo de proveniência; só entram no RAG depois de revisão e com uma fonte verificável.

Percentuais, custos, doses, prazos e regras operacionais de páginas comerciais não são tratados como fatos confirmados. Quando uma recomendação prática depender desses valores, a resposta deve priorizar uma publicação técnica e solicitar validação de assistência local.

## Regra de segurança

Respostas sobre embargo, multas, APP, Reserva Legal, CAR, PRA ou licenciamento são educacionais. A aplicação deve indicar a fonte oficial e recomendar confirmação com o órgão ambiental e um profissional habilitado.
