# Desafio Técnico - Easysecrets

Este projeto é uma solução para o desafio técnico de Front-end da Easysecrets. O objetivo é desenvolver uma aplicação React com TypeScript para ler dados de vendas de um arquivo JSON e transformá-los em gráficos interativos e insights visuais, demonstrando habilidades em visualização de dados, gerenciamento de estado, design responsivo e boas práticas de desenvolvimento.

## 🚀 Tecnologias Utilizadas

* **React**: Biblioteca para construção da interface do usuário.
* **TypeScript**: Adiciona tipagem estática ao JavaScript para maior robustez e manutenibilidade.
* **Vite**: Ferramenta de build rápida e moderna para projetos React.
* **Redux Toolkit**: Biblioteca oficial e recomendada para gerenciamento de estado global.
* **React Redux**: Integração do Redux com React.
* **Recharts**: Biblioteca para criação de gráficos interativos e responsivos.
* **Tailwind CSS**: Framework CSS utility-first para estilização rápida e responsiva.
* **shadcn/ui**: Coleção de componentes de UI reusáveis, construídos com Tailwind CSS e Radix UI, focados em acessibilidade e personalização.
* **Framer Motion**: Biblioteca para animações e transições fluidas de componentes.
* **React Router DOM**: Gerenciamento de rotas e navegação entre páginas.
* **Next Themes**: Solução para gerenciamento de tema (Dark/Light Mode) com persistência.
* **Sonner**: Biblioteca para exibir toasts (notificações) amigáveis.
* **Lucide React**: Biblioteca de ícones (utilizada para os ícones da sidebar e insights).

## 💻 Instruções para Rodar o Projeto

Siga os passos abaixo para clonar o repositório, instalar as dependências e executar o projeto em sua máquina local.

### Pré-requisitos

* **Node.js**: Versão 18 ou superior.
* **npm** (Node Package Manager) ou **Yarn**.

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/kauevecchia/Desafio-tecnico-Easysecrets.git
    cd Desafio-tecnico-Easysecrets
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

4.  Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada pelo terminal).

## 🧠 Decisões Técnicas Detalhadas

Minha abordagem para este desafio foi ir além dos requisitos básicos, focando em entregar uma solução que não apenas fosse funcional, mas também **robusta, escalável, visualmente agradável e com uma excelente experiência de usuário (UX)**. A prioridade foi demonstrar um entendimento profundo das boas práticas de desenvolvimento Front-end em um ambiente de produção.

### Escolha das Bibliotecas

* **React + TypeScript + Vite**: Esta é uma combinação moderna e altamente eficiente. **React** oferece uma abordagem componentizada, **TypeScript** garante a segurança de tipos e melhora a detecção de erros em tempo de desenvolvimento, e **Vite** proporciona um ambiente de desenvolvimento extremamente rápido com Hot Module Replacement (HMR) e otimizações de build.

* **Redux Toolkit (RTK)**: Optei pelo RTK para o gerenciamento de estado global. Embora Context API e Zustand sejam opções válidas para projetos menores, o RTK foi escolhido por ser uma das tecnologias requisitadas na descrição da vaga, demonstrando meu alinhamento com a stack da empresa e capacidade de me adaptar. O RTK simplifica o Redux tradicional, reduzindo o boilerplate e adicionando as melhores práticas, como imutabilidade e ferramentas de depuração (Redux DevTools), que são cruciais para a **previsibilidade e manutenibilidade do estado** em uma aplicação orientada a dados. Ele é usado para gerenciar os dados brutos de vendas e todos os estados de filtros e seleções do usuário.

* **Recharts**: Uma biblioteca flexível e declarativa para gráficos React. Sua API intuitiva permitiu criar gráficos interativos (Pie Chart e Line Chart) com **animações fluidas e responsividade**, que são essenciais para uma visualização de dados eficaz.

* **Tailwind CSS**: Escolhido por sua abordagem utility-first, que acelera o processo de estilização e garante **consistência no design** sem a necessidade de escrever CSS complexo. É altamente responsivo e otimiza o CSS final.

* **shadcn/ui**: Complementa o Tailwind CSS oferecendo componentes de UI pré-construídos e acessíveis. A filosofia do `shadcn/ui` de "copiar e colar" o código fonte dos componentes permite **total controle e personalização**, integrando-se perfeitamente com o tema e o design do projeto.

* **Framer Motion**: Integrado para adicionar **animações de entrada e saída suaves** nas transições de páginas e componentes, elevando a experiência do usuário e adicionando um toque de profissionalismo.

* **Next Themes**: Uma solução robusta para implementar o **Dark/Light Mode**.

* **Sonner**: Uma biblioteca para exibir **notificações (toasts)** de forma elegante, fornecendo feedback claro ao usuário para ações como a submissão de uma comparação.

### Estrutura de Pastas

A estrutura de pastas foi pensada para ser modular, escalável e de fácil navegação, seguindo padrões comuns da comunidade React:

```
src/
├── components/           # Componentes React reutilizáveis e organizados por domínio/tipo
│   ├── ComparisonDisplay.tsx       # Exibição de resultados da comparação
│   ├── ComparisonSetupForm.tsx     # Formulário de seleção para comparação
│   ├── Header.tsx                  # Componente do cabeçalho da aplicação
│   ├── MobileMenu.tsx              # Menu para a navegação entre as páginas da aplicação para mobile
│   ├── ProductDetailSection.tsx    # Seção inteligente para gráfico de linha e insights de produto único
│   ├── ProductInsightsPanel.tsx    # Painel de insights para produto único (ao lado do ProductLineChart)
│   ├── ProductsComparisonFlow.tsx  # Orquestra o fluxo de comparação (setup vs display)
│   ├── ProductsComparisonInsightsPanel.tsx # Painel de insights para comparação de produtos
│   ├── ProductsScorecard.tsx       # Placar de produtos mais vendidos
│   ├── ProductSalesSection.tsx     # Seção inteligente para Pie Chart e Placar de vendas
│   ├── Sidebar.tsx                 # Componente da barra lateral de navegação
│   ├── SidebarItem.tsx             # Item reutilizável da barra lateral
│   ├── ThemeProvider.tsx           # Provedor de tema
│   ├── ThemeToggler.tsx            # Componente para alternar o tema (Dark/Light Mode)
│   └── ui/                         # Componentes Shadcn/ui (Button, Select, Card, etc.)
├── data/                 # Arquivos de dados estáticos (JSON de vendas, meses)
│   └── salesData.ts
├── layouts/              # Layout base da aplicação
│   └── DefaultLayout.tsx
├── lib/                  # Utilitários, hooks customizados e componentes de gráficos
│   ├── charts/           # Componentes de gráficos de apresentação (ComparisonLineChart, ProductLineChart, SalesPieChart)
│   │   ├── ComparisonLineChart.tsx
│   │   ├── ProductLineChart.tsx
│   │   └── SalesPieChart.tsx
│   └── ...               # Outros utilitários ou libs customizadas
├── pages/                # Páginas principais da aplicação (rotas)
│   ├── Dashboard.tsx
│   └── ProductsComparison.tsx
├── store/                # Configuração e slices do Redux
│   ├── slices/           # Módulos de estado (filtersSlice, productSlice)
│   │   ├── filterSlice.ts
│   │   └── productSlice.ts
│   ├── hooks.ts          # Hooks tipados para Redux (useAppDispatch, useAppSelector)
│   └── index.ts          # Configuração da store principal do Redux
├── App.tsx               # Componente raiz da aplicação
├── Router.tsx            # Configuração das rotas
└── main.tsx              # Ponto de entrada da aplicação (Vite)
```

Essa organização promove a **separação de preocupações**: componentes "inteligentes" (como `ProductSalesSection`, `ProductDetailSection`, `ProductsComparisonFlow`, `ComparisonDisplay`, `ComparisonSetupForm`) que lidam com a lógica de negócios e estado, e componentes "burros" (como `SalesPieChart`, `ProductLineChart`, `ComparisonLineChart`, `ProductInsightsPanel`, `ProductsComparisonInsightsPanel`) que focam apenas na apresentação dos dados que recebem via props.

### Diferenciais Implementados

* **Gerenciamento de Estado Profissional (Redux Toolkit)**: Uso do Redux para centralizar e gerenciar de forma previsível os dados de vendas e os estados de filtro complexos, crucial para a interatividade dos gráficos e insights.

* **Arquitetura Componentizada Robusta**: Separação clara entre componentes de container/lógica e componentes de apresentação/UI, facilitando a manutenção e a escalabilidade.

* **Animações e Experiência do Usuário (UX)**:
    * **Transições de Página Fluidas** com Framer Motion.
    * **Animações de Gráficos** Recharts ao carregar ou filtrar dados, garantindo feedback visual.
    * **Tema Claro/Escuro** (Dark/Light Mode) com persistência de preferência.
    * **Notificações** (Toasts) para feedback de sucesso em ações do usuário.

* **Visualização de Dados Abrangente**:
    * **Dashboard Interativo**: Exibe um **Gráfico de Pizza** das vendas por produto com filtro de mês, e um **Placar de Vendas** (estrutura já preparada).
    * **Seção de Detalhes de Produto**: Apresenta um **Gráfico de Linha** das vendas mensais de um produto selecionado, acompanhado de um **Painel de Insights** (vendas totais, média, melhor/pior mês, tendência).
    * **Página de Comparação de Produtos**: Permite selecionar dois produtos para visualizar um **Gráfico de Linha Comparativo** de suas vendas ao longo dos meses, complementado por um **Painel de Insights Comparativos** (diferença total, porcentagem, "vencedor", mês de maior divergência). O fluxo de seleção e exibição de resultados é guiado para uma UX clara.

* **Tipagem Forte com TypeScript**: Todo o projeto é desenvolvido com TypeScript, garantindo maior segurança, menos bugs em tempo de execução e melhor documentação do código.

* **Design Responsivo**: O layout da aplicação é totalmente responsivo, utilizando Tailwind CSS para se adaptar a diferentes tamanhos de tela (mobile, tablet, desktop).

* **Práticas de Git (Implícito)**: O uso de commits atômicos e semânticos (eg: `"feat: mensagem do commit"`, `"refactor: mensagem do commit"`), demonstra domínio de Git e familiaridade com fluxos de trabalho de equipe .

* **Tratamento de Estado Vazio/Erro**: Mensagens claras e amigáveis para o usuário quando não há dados para exibir nos gráficos ou painéis.
