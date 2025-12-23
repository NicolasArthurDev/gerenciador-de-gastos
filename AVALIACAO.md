# Avaliação

# Projeto prático (a3) de Programação Frontend II

**Equipe**: frontenders

- LUIS RENATO FREITAS DE ALMEIDA
- NICOLAS ARTHUR RAULINO OLIVEIRA
- NICOLAS PITZ

## Avaliações

| entrega      | data       | commit           | nota       | peso |
| ------------ | ---------- | ---------------- | ---------- | ---- |
| 1            | 26/11/2025 | 1bc4031          | 9/10       | 1    |
| 2            | 10/12/2025 | 9f45914          | 7,8/10     | 2    |
| 3            |            |                  | 7,7/10     | 3    |
| apresentação |            | Luis Renato      | 8/10       | 4    |
| **total**    |            |                  | **8/10**   |      |
| apresentação |            | Nicolas Oliveira | 8,5/10     | 4    |
| **total**    |            |                  | **8,2/10** |      |
| apresentação |            | Nicolas Pitz     | 7,3/10     | 4    |
| **total**    |            |                  | **7,7/10** |      |

## Entrega 1

- a. Requisitos funcionais definidos (2/2)

  - atendido.

- b. Projeto inicializado com vite + TypeScript (2/2)

  - atendido.

- c. Estrutura básica de pastas e arquivos criada (1/2)

  - Além da estrutura fornecida pelo vite, quase nada foi criado.

- d. Dependências principais instaladas (React Router, biblioteca de estilo, etc.) (2/2)

  - atendido.

- e. README inicial com descrição do projeto e responsáveis (2/2)

  - atendido.

## Entrega 2

- a.Funcionalidades principais implementadas conforme escopo definido

  - RF1 - Não encontrei como atualizar os registros.
  - RF2 - atendido.
  - RF3 - não atendido.
  - RF4 - não atendido.
  - RF5 - não atendido.
  - RF6 - não atendido.

- b.Componentes principais criados e reutilizáveis

  - O componente `ExchangeRatesCard` tem trechos de código repetidos. Isso poderia ter sido evitado com a criação de um ou mais componentes.
  - O mesmo vale para `ExpenseDistributionCard`, `UpcomingBillsCard`.
  - O componente `UpcomingBillsCard` tem dados diretamente no código.
  - Vocês criaram 10 componentes chamados `Card`. Isso poderia ser reduzido com componentes reutilizáveis.

- c.Gerenciamento de estado implementado

  - atendido.

- d.Consumo de API externa funcional

  - atendido.

- e.Todos os scripts do package.json funcionando

  - adiado para a próxima entrega.

- f.Testes unitários para componentes e funções principais

  - atendido.

- Outras observações:

  - Sobre a tela:
    - A data é mesmo obrigatória ao cadastrar uma entrada/despesa? Sugiro fazer com que ela seja opcional para o usuário.
    - Quando os campos obrigatórios não forem preenchidos, indiquem isso para o usuário.
    - O botão para adicionar meta está muito grande, diferente dos de adicionar receita e despesa.
    - Quem registrou as próximas contas? Durante o desenvolvimento, é interessante já ter alguns registros para testes. Mas remova na versão final, pois o usuário não quer acessar uma aplicação que já tenha receitas e gastos cadastrados.
    - Fazer com que os cartões sejam clicáveis e que levem para as ações correspondentes traria um ótimo adicional para a aplicação.
    - Tentem fazer com que a atualização do progresso para as metas seja mais automático.
  - Há muitos condicionais ternários (até aninhados!) no meio do jsx, dificultando a legibilidade. Tentem reescrever para melhorar o código.
  - Padronizem os nomes dos arquivos. Alguns `NomeDoComponente.tsx` e outros `NomeDoCompnente/index.tsx`. Usem apenas um estilo.
  - Dentro do `FinanceContext` vocês colocaram funções para tratamento dos estados e no hook `useFinanceContext` vocês apenas disponibilizaram o contexto. Sugiro mover essas funções para o hook para organização de código.
  - Coloquem uma rota coringa (`*`) caso seja digitado um endereço inválido

## Entraga 3

- a.Funcionalidades principais implementadas conforme escopo definido

  - RF1 - atendido.
  - RF2 - atendido.
  - RF3 - não atendido.
  - RF4 - não atendido.
  - RF5 - não atendido.
  - RF6 - atendido.

- b. Requisitos não funcionais

  - RNF1 - atendido.
  - RNF2 - atendido.
  - RNF3 - atendido.
  - RNF4 - parcial.
    - O README não traz instruções de execução ou estrutura do projeto.
  - RNF5 - atendido.

- c. Testes

  - atendido.

- d. Qualidade do código

  - Valores monetários estão tipados como `string` (`amount: string`). Em geral é melhor armazenar como `number` internamente e formatar na UI, para evitar bugs de soma/ordenação.
  - Há `console.error` no `ExchangeRatesCard`.
