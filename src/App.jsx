import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  BookOpen, 
  BarChart3, 
  Download, 
  Star, 
  Users, 
  Play, 
  FileText, 
  Award,
  TrendingUp,
  Calendar,
  Volume2,
  Eye,
  Loader2
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import brasaoImage from './assets/brasao-curral-de-cima.png'
import logoPrefeitura from './assets/logo-prefeitura.png'
import DownloadButton from './components/DownloadButton.jsx'
import { useDisciplinas, useIdeb, useEngajamento, useRealTimeData } from './hooks/useData.js'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('apoio-escolar')
  const [selectedDisciplina, setSelectedDisciplina] = useState(0)
  
  // Carregar dados dinâmicos
  const { disciplinas, loading: loadingDisciplinas } = useDisciplinas()
  const { idebData, loading: loadingIdeb } = useIdeb()
  const { engajamento, loading: loadingEngajamento } = useEngajamento()
  
  // Dados em tempo real para o painel do gestor
  const realTimeEngajamento = useRealTimeData(engajamento, 10000) // Atualiza a cada 10 segundos

  // Preparar dados para gráficos
  const idebChartData = idebData.ideb_historico?.map(item => ({
    ano: item.ano.toString(),
    anosIniciais: item.anos_iniciais.ideb,
    anosFinais: item.anos_finais.ideb,
    metaIniciais: item.anos_iniciais.meta,
    metaFinais: item.anos_finais.meta
  })) || []

  const engajamentoChartData = realTimeEngajamento.por_disciplina?.map(item => ({
    disciplina: item.disciplina,
    acessos: item.acessos,
    downloads: item.downloads
  })) || []

  // Função para simular reprodução de vídeo
  const handlePlayVideo = (videoId, disciplina, titulo) => {
    alert(`Reproduzindo: ${titulo}\n\nEm uma implementação real, aqui seria aberto o player de vídeo para ${videoId}`)
    
    // Aqui seria feita a integração com um player de vídeo real
    // Exemplo: window.open(`/videos/${videoId}`, '_blank')
    
    // Log para analytics
    console.log(`Vídeo reproduzido: ${videoId} - ${disciplina} - ${titulo}`)
  }

  if (loadingDisciplinas || loadingIdeb || loadingEngajamento) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Carregando painel educacional...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={brasaoImage} alt="Brasão de Curral de Cima" className="h-16 w-16" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Secretaria de Educação</h1>
                <p className="text-lg text-blue-600">Curral de Cima - PB</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img src={logoPrefeitura} alt="Logo da Prefeitura" className="h-12" />
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                1º lugar IDEB Regional
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-transparent h-16">
              <TabsTrigger 
                value="apoio-escolar" 
                className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-blue-100 hover:text-white"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Apoio Escolar
              </TabsTrigger>
              <TabsTrigger 
                value="ideb" 
                className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-blue-100 hover:text-white"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                IDEB
              </TabsTrigger>
              <TabsTrigger 
                value="conteudos" 
                className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-blue-100 hover:text-white"
              >
                <FileText className="w-5 h-5 mr-2" />
                Conteúdos
              </TabsTrigger>
              <TabsTrigger 
                value="destaques" 
                className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-blue-100 hover:text-white"
              >
                <Star className="w-5 h-5 mr-2" />
                Destaques
              </TabsTrigger>
              <TabsTrigger 
                value="gestor" 
                className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-blue-100 hover:text-white"
              >
                <Users className="w-5 h-5 mr-2" />
                Painel Gestor
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          
          {/* Apoio Escolar Remoto */}
          <TabsContent value="apoio-escolar" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Apoio Escolar Remoto</h2>
              <p className="text-lg text-gray-600">Vídeo-aulas para o Ensino Fundamental I</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {disciplinas.map((disciplina, index) => (
                <Card 
                  key={disciplina.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedDisciplina === index ? 'ring-4 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedDisciplina(index)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 ${disciplina.cor} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{disciplina.nome}</CardTitle>
                    <CardDescription>{disciplina.aulas.length} aulas disponíveis</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {disciplinas.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className={`w-8 h-8 ${disciplinas[selectedDisciplina]?.cor} rounded-full mr-3 flex items-center justify-center`}>
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    Aulas de {disciplinas[selectedDisciplina]?.nome}
                  </CardTitle>
                  <CardDescription>{disciplinas[selectedDisciplina]?.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {disciplinas[selectedDisciplina]?.aulas.map((aula, index) => (
                      <div key={aula.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{aula.titulo}</h4>
                            <p className="text-sm text-gray-600">{aula.descricao}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline">{aula.duracao}</Badge>
                              <Badge variant="secondary">{aula.objetivos?.length || 0} objetivos</Badge>
                            </div>
                          </div>
                        </div>
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handlePlayVideo(aula.id, disciplinas[selectedDisciplina].nome, aula.titulo)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Assistir
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Indicadores IDEB */}
          <TabsContent value="ideb" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Indicadores IDEB</h2>
              <p className="text-lg text-gray-600">Acompanhe o desempenho educacional de Curral de Cima</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2" />
                    Anos Iniciais 2023
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">
                    {idebData.ideb_historico?.[3]?.anos_iniciais?.ideb || '5,0'}
                  </div>
                  <p className="text-green-100">
                    Meta: {idebData.ideb_historico?.[3]?.anos_iniciais?.meta || '5,0'} ✓ Atingida
                  </p>
                  <Badge className="mt-2 bg-white text-green-600">
                    {idebData.comparacoes?.['2023']?.anos_iniciais?.ranking_regional}º lugar regional
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2" />
                    Anos Finais 2023
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-2">
                    {idebData.ideb_historico?.[3]?.anos_finais?.ideb || '4,8'}
                  </div>
                  <p className="text-blue-100">
                    Meta: {idebData.ideb_historico?.[3]?.anos_finais?.meta || '4,8'} ✓ Atingida
                  </p>
                  <Badge className="mt-2 bg-white text-blue-600">
                    {idebData.comparacoes?.['2023']?.anos_finais?.ranking_regional}º lugar regional
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-6 h-6 mr-2" />
                    Destaque Regional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">Vale do Mamanguape</div>
                  <p className="text-purple-100">Melhor desempenho da região</p>
                  <Badge className="mt-2 bg-white text-purple-600">Excelência</Badge>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Evolução Histórica do IDEB</CardTitle>
                <CardDescription>Comparação com metas e evolução ao longo dos anos</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={idebChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ano" />
                    <YAxis domain={[0, 6]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="anosIniciais" stroke="#10b981" strokeWidth={3} name="Anos Iniciais" />
                    <Line type="monotone" dataKey="anosFinais" stroke="#3b82f6" strokeWidth={3} name="Anos Finais" />
                    <Line type="monotone" dataKey="metaIniciais" stroke="#10b981" strokeDasharray="5 5" name="Meta Iniciais" />
                    <Line type="monotone" dataKey="metaFinais" stroke="#3b82f6" strokeDasharray="5 5" name="Meta Finais" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Comparação Regional</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Curral de Cima</span>
                        <span className="font-bold">
                          {idebData.comparacoes?.['2023']?.anos_iniciais?.curral_de_cima || '5,0'}
                        </span>
                      </div>
                      <Progress value={100} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Paraíba</span>
                        <span>{idebData.comparacoes?.['2023']?.anos_iniciais?.paraiba || '5,7'}</span>
                      </div>
                      <Progress value={87} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Brasil</span>
                        <span>{idebData.comparacoes?.['2023']?.anos_iniciais?.brasil || '6,0'}</span>
                      </div>
                      <Progress value={83} className="h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Metas Futuras</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800">2025</h4>
                      <p className="text-green-600">Meta: {idebData.metas_futuras?.['2025']?.anos_iniciais || '5,2'} (Anos Iniciais)</p>
                      <p className="text-green-600">Meta: {idebData.metas_futuras?.['2025']?.anos_finais || '5,0'} (Anos Finais)</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">2027</h4>
                      <p className="text-blue-600">Meta: {idebData.metas_futuras?.['2027']?.anos_iniciais || '5,5'} (Anos Iniciais)</p>
                      <p className="text-blue-600">Meta: {idebData.metas_futuras?.['2027']?.anos_finais || '5,3'} (Anos Finais)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Conteúdos Complementares */}
          <TabsContent value="conteudos" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Conteúdos Complementares</h2>
              <p className="text-lg text-gray-600">Material de reforço e atividades para casa</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {disciplinas.map((disciplina, index) => (
                <Card key={disciplina.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 ${disciplina.cor} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-center">{disciplina.nome}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <DownloadButton 
                      fileName={`${disciplina.id}_material_reforco.pdf`}
                      displayName="Material de Reforço"
                      className="w-full"
                    />
                    <DownloadButton 
                      fileName={`${disciplina.id}_atividades_semanais.pdf`}
                      displayName="Atividades Semanais"
                      className="w-full"
                    />
                    <DownloadButton 
                      fileName={`${disciplina.id}_lista_leitura.pdf`}
                      displayName="Lista de Leitura"
                      className="w-full"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tarefas da Semana</CardTitle>
                <CardDescription>Atividades para impressão e acompanhamento dos pais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {disciplinas.map((disciplina, index) => (
                    <div key={disciplina.id} className={`flex items-center justify-between p-4 rounded-lg ${
                      index === 0 ? 'bg-blue-50' : 
                      index === 1 ? 'bg-green-50' : 
                      index === 2 ? 'bg-yellow-50' : 'bg-purple-50'
                    }`}>
                      <div>
                        <h4 className="font-semibold">{disciplina.nome} - Semana 1</h4>
                        <p className="text-sm text-gray-600">{disciplina.descricao}</p>
                      </div>
                      <DownloadButton 
                        fileName={`${disciplina.id}_semana_01.pdf`}
                        displayName="Baixar PDF"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Destaques da Semana */}
          <TabsContent value="destaques" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Destaques da Semana</h2>
              <p className="text-lg text-gray-600">Novidades e reconhecimentos especiais</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Volume2 className="w-6 h-6 mr-2" />
                    Recado da Direção
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white/20 rounded-lg p-4 mb-4">
                    <p className="text-white/90 mb-4">
                      "Parabéns a todos os alunos, professores e famílias pelo excelente desempenho no IDEB 2023! 
                      Continuamos trabalhando juntos pela educação de qualidade em nossa cidade."
                    </p>
                    <p className="text-sm text-white/80">- Secretária de Educação</p>
                  </div>
                  <Button variant="secondary" className="w-full">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Ouvir Mensagem Completa
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-6 h-6 mr-2" />
                    Aluno Destaque da Semana
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Star className="w-12 h-12 text-yellow-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Maria Eduarda Silva</h3>
                    <p className="text-white/90 mb-4">
                      "Pela dedicação nos estudos e excelente participação nas aulas de Matemática. 
                      Parabéns pelo empenho!"
                    </p>
                    <Badge className="bg-yellow-400 text-yellow-900">3º Ano - Turma A</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-6 h-6 mr-2" />
                  Conteúdo Recomendado da Semana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📚 Leitura Recomendada</h4>
                    <p className="text-blue-700 mb-3">"O Pequeno Príncipe" - Adaptação para crianças</p>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalhes
                    </Button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">🎯 Atividade Especial</h4>
                    <p className="text-green-700 mb-3">Projeto "Conhecendo Curral de Cima"</p>
                    <DownloadButton 
                      fileName="projeto_conhecendo_curral_de_cima.pdf"
                      displayName="Baixar Guia"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-6 h-6 mr-2" />
                  Próximos Eventos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Feira de Ciências</h4>
                      <p className="text-sm text-gray-600">15 de Julho - Todas as escolas municipais</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Semana da Leitura</h4>
                      <p className="text-sm text-gray-600">22 a 26 de Julho - Atividades especiais</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Painel do Gestor */}
          <TabsContent value="gestor" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Painel do Gestor</h2>
              <p className="text-lg text-gray-600">Acompanhamento de acessos e engajamento em tempo real</p>
              <p className="text-sm text-gray-500">
                Última atualização: {realTimeEngajamento.resumo?.ultima_atualizacao ? 
                  new Date(realTimeEngajamento.resumo.ultima_atualizacao).toLocaleString('pt-BR') : 
                  'Carregando...'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total de Acessos</p>
                      <p className="text-3xl font-bold">{realTimeEngajamento.resumo?.total_acessos || '733'}</p>
                    </div>
                    <Eye className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Downloads</p>
                      <p className="text-3xl font-bold">{realTimeEngajamento.resumo?.total_downloads || '267'}</p>
                    </div>
                    <Download className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Vídeos Assistidos</p>
                      <p className="text-3xl font-bold">{realTimeEngajamento.resumo?.videos_assistidos || '156'}</p>
                    </div>
                    <Play className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-100">Alunos Ativos</p>
                      <p className="text-3xl font-bold">{realTimeEngajamento.resumo?.alunos_ativos || '89'}</p>
                    </div>
                    <Users className="w-8 h-8 text-yellow-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Engajamento por Disciplina</CardTitle>
                <CardDescription>Acessos e downloads por matéria (atualização em tempo real)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={engajamentoChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="disciplina" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="acessos" fill="#3b82f6" name="Acessos" />
                    <Bar dataKey="downloads" fill="#10b981" name="Downloads" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Atividade Recente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {realTimeEngajamento.atividade_recente?.slice(0, 5).map((atividade, index) => (
                      <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                        atividade.tipo === 'video_assistido' ? 'bg-blue-50' :
                        atividade.tipo === 'download' ? 'bg-green-50' : 'bg-purple-50'
                      }`}>
                        {atividade.tipo === 'video_assistido' && <Play className="w-5 h-5 text-blue-600" />}
                        {atividade.tipo === 'download' && <Download className="w-5 h-5 text-green-600" />}
                        {atividade.tipo === 'acesso' && <Eye className="w-5 h-5 text-purple-600" />}
                        <div>
                          <p className="font-medium">
                            {atividade.tipo === 'video_assistido' ? 'Vídeo assistido' :
                             atividade.tipo === 'download' ? 'Material baixado' : 'Novo acesso'}
                          </p>
                          <p className="text-sm text-gray-600">{atividade.disciplina} - {atividade.conteudo}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(atividade.timestamp).toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horários de Maior Acesso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {realTimeEngajamento.horarios_pico?.map((horario, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span>{horario.periodo}</span>
                          <span className="font-bold">{horario.percentual}%</span>
                        </div>
                        <Progress value={horario.percentual} className="h-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Estatísticas Semanais */}
            <Card>
              <CardHeader>
                <CardTitle>Crescimento Semanal</CardTitle>
                <CardDescription>Comparação com a semana anterior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Acessos</p>
                    <p className="text-2xl font-bold text-blue-600">
                      +{realTimeEngajamento.estatisticas_semanais?.crescimento?.acessos || '9.9'}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Downloads</p>
                    <p className="text-2xl font-bold text-green-600">
                      +{realTimeEngajamento.estatisticas_semanais?.crescimento?.downloads || '13.6'}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Vídeos</p>
                    <p className="text-2xl font-bold text-purple-600">
                      +{realTimeEngajamento.estatisticas_semanais?.crescimento?.videos_assistidos || '21.4'}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-gray-600">Novos Usuários</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      +{realTimeEngajamento.estatisticas_semanais?.crescimento?.novos_usuarios || '50.0'}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Secretaria de Educação</h3>
              <p className="text-gray-300">
                Prefeitura Municipal de Curral de Cima<br />
                Paraíba - Brasil
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <p className="text-gray-300">
                Rua Principal, Centro<br />
                Curral de Cima - PB<br />
                CEP: 58291-000
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Horário de Funcionamento</h3>
              <p className="text-gray-300">
                Segunda a Sexta: 7h às 17h<br />
                Sábado: 7h às 12h
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Secretaria de Educação de Curral de Cima. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

