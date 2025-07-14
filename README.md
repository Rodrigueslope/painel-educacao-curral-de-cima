# Painel Educacional - Secretaria de Educação de Curral de Cima

![Painel Educacional](https://img.shields.io/badge/Status-Ativo-green) ![React](https://img.shields.io/badge/React-18.0-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.0-cyan)

## 📋 Sobre o Projeto

Painel web interativo desenvolvido para a Secretaria de Educação do município de Curral de Cima – PB, focado em alunos do Ensino Fundamental I da rede municipal. O sistema oferece apoio escolar remoto, acompanhamento de indicadores educacionais e ferramentas de gestão.

### 🎯 Funcionalidades Principais

#### 🎓 1. Apoio Escolar Remoto
- **Vídeo-aulas por disciplina**: Português, Matemática, Geografia e História
- **5 aulas por disciplina** com duração mínima de 3 minutos
- **Avatar animado** no estilo professor(a) com linguagem regionalizada
- **Conteúdo contextualizado** para a realidade de Curral de Cima

#### 📈 2. Indicadores IDEB
- **Gráficos interativos** com dados históricos do IDEB municipal
- **Comparações** com médias da Paraíba e do Brasil
- **Metas futuras** com indicadores de progresso
- **Destaque regional**: 1º lugar no Vale do Mamanguape

#### 📚 3. Conteúdos Complementares
- **Material de reforço** para cada disciplina (PDFs)
- **Atividades semanais** com botão para download
- **Orientações para pais** e acompanhamento familiar
- **Conteúdo regionalizado** com elementos da cultura local

#### 🌟 4. Destaques da Semana
- **Recado da direção** (áudio/vídeo)
- **Conteúdo recomendado** semanal
- **Aluno destaque** com foto e mensagem
- **Calendário de eventos** educacionais

#### 📊 5. Painel do Gestor
- **Acompanhamento em tempo real** de acessos por disciplina
- **Dados de engajamento** dos alunos
- **Estatísticas de downloads** e vídeos assistidos
- **Horários de pico** de utilização
- **Crescimento semanal** com métricas comparativas

## 🛠️ Estrutura Técnica

### Tecnologias Utilizadas
- **React 18** - Framework principal
- **Tailwind CSS** - Estilização
- **Shadcn/UI** - Componentes de interface
- **Recharts** - Gráficos interativos
- **Lucide Icons** - Ícones
- **Vite** - Build tool

### Estrutura de Arquivos
```
painel-educacao-curral-de-cima/
├── public/
│   ├── data/                    # Dados JSON estruturados
│   │   ├── disciplinas.json     # Informações das disciplinas e aulas
│   │   ├── ideb.json           # Dados históricos do IDEB
│   │   └── engajamento.json    # Métricas de engajamento
│   ├── videos/                 # Vídeo-aulas
│   │   ├── portugues_aula01.mp4
│   │   ├── matematica_aula01.mp4
│   │   ├── geografia_aula03.mp4
│   │   └── historia_aula01.mp4
│   └── materiais/              # PDFs e materiais complementares
│       ├── portugues_material_reforco.pdf
│       └── matematica_material_reforco.pdf
├── src/
│   ├── assets/                 # Imagens e recursos estáticos
│   │   ├── brasao-curral-de-cima.png
│   │   └── logo-prefeitura.png
│   ├── components/             # Componentes React
│   │   ├── ui/                 # Componentes de UI (shadcn)
│   │   └── DownloadButton.jsx  # Componente de download
│   ├── hooks/                  # Hooks personalizados
│   │   └── useData.js          # Hook para carregamento de dados
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos principais
│   └── main.jsx               # Ponto de entrada
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou pnpm

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/painel-educacao-curral-de-cima.git

# Entre no diretório
cd painel-educacao-curral-de-cima

# Instale as dependências
npm install
# ou
pnpm install
```

### Desenvolvimento
```bash
# Inicie o servidor de desenvolvimento
npm run dev
# ou
pnpm run dev

# Acesse http://localhost:5173
```

### Build para Produção
```bash
# Gere os arquivos de produção
npm run build
# ou
pnpm run build

# Os arquivos estarão na pasta 'dist/'
```

## 📱 Responsividade

O painel foi desenvolvido com design responsivo, funcionando perfeitamente em:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)
- **Conexões 3G** - Otimizado para baixa velocidade

## 🎨 Design e Identidade Visual

### Paleta de Cores
- **Azul Principal**: #3B82F6 (Educação e confiança)
- **Verde Secundário**: #10B981 (Crescimento e sucesso)
- **Amarelo Destaque**: #F59E0B (Energia e criatividade)
- **Roxo Complementar**: #8B5CF6 (Inovação)

### Elementos Visuais
- **Brasão oficial** de Curral de Cima
- **Logo da Prefeitura** Municipal
- **Cores da bandeira** da Paraíba
- **Elementos regionais** nordestinos

## 📊 Dados e Métricas

### IDEB 2023 - Curral de Cima
- **Anos Iniciais**: 5,0 (Meta: 5,0) ✅
- **Anos Finais**: 4,8 (Meta: 4,8) ✅
- **Posição Regional**: 1º lugar no Vale do Mamanguape

### Engajamento (Dados Simulados)
- **Total de Acessos**: 733+
- **Downloads**: 267+
- **Vídeos Assistidos**: 156+
- **Alunos Ativos**: 89+

## 🔧 Funcionalidades Técnicas

### Carregamento Dinâmico
- Dados carregados via JSON
- Hooks personalizados para gerenciamento de estado
- Loading states e error handling

### Downloads Funcionais
- Sistema de download real para PDFs
- Tracking de downloads para analytics
- Organização por disciplina

### Tempo Real (Simulado)
- Atualização automática de métricas
- Simulação de dados em tempo real
- Timestamps atualizados

### Acessibilidade
- Navegação por teclado
- Contraste adequado
- Textos alternativos em imagens
- Estrutura semântica HTML

## 🌐 Deploy

### GitHub Pages
O projeto está configurado para deploy automático no GitHub Pages:

1. Faça push para a branch `main`
2. O GitHub Actions fará o build automaticamente
3. O site estará disponível em: `https://seu-usuario.github.io/painel-educacao-curral-de-cima`

### Outras Plataformas
- **Vercel**: Deploy direto do GitHub
- **Netlify**: Drag & drop da pasta `dist/`
- **Servidor próprio**: Upload dos arquivos da pasta `dist/`

## 📈 Roadmap Futuro

### Funcionalidades Planejadas
- [ ] Sistema de login para alunos e professores
- [ ] Chat de suporte em tempo real
- [ ] Integração com APIs educacionais
- [ ] Sistema de avaliações online
- [ ] Relatórios personalizados para gestores
- [ ] App mobile nativo
- [ ] Integração com Google Classroom
- [ ] Sistema de gamificação

### Melhorias Técnicas
- [ ] PWA (Progressive Web App)
- [ ] Cache offline
- [ ] Notificações push
- [ ] Analytics avançado
- [ ] Testes automatizados
- [ ] CI/CD pipeline

## 👥 Equipe

**Desenvolvido para:**
- **Secretaria de Educação de Curral de Cima - PB**
- **Prefeitura Municipal de Curral de Cima**

**Contato:**
- Email: educacao@curraldecima.pb.gov.br
- Telefone: (83) 3000-0000

## 📄 Licença

Este projeto foi desenvolvido especificamente para a Secretaria de Educação de Curral de Cima - PB.

## 🤝 Contribuições

Para sugestões e melhorias, entre em contato com a Secretaria de Educação.

---

**© 2025 Secretaria de Educação de Curral de Cima - PB**  
*Construindo um novo tempo através da educação*

