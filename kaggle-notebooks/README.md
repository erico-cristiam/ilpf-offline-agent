# Notebook Kaggle

O arquivo [`agroflora_ia_gemma3n_rag.ipynb`](agroflora_ia_gemma3n_rag.ipynb) está pronto para ser importado no Kaggle e demonstra o mesmo fluxo usado pelo protótipo:

1. apresentação do problema na Amazônia;
2. escolha do Gemma 3n E2B para execução eficiente;
3. leitura do catálogo e dos trechos da base;
4. recuperação dos contextos relevantes;
5. geração da resposta com fontes;
6. comparação entre Gemma sem contexto e Gemma + RAG;
7. testes com perguntas de ILPF e regularização ambiental;
8. limitações, segurança e caminho para Android offline.

Para executar a versão completa no Kaggle:

1. importe o arquivo `.ipynb`;
2. adicione `knowledge-base/chunks.json` como um Kaggle Dataset;
3. adicione o Gemma 3n E2B Instruct em **Add Input → Models**;
4. selecione uma GPU;
5. execute **Save & Run All**;
6. substitua no notebook os campos reservados ao Live Demo e ao vídeo público.

Sem os pesos do modelo, o notebook continua executável em modo RAG demonstrativo e informa claramente que não houve geração. A interface web permanece como demonstração do produto mobile.
