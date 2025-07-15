import React, { useState } from 'react'
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

  const { disciplinas, loading: loadingDisciplinas } = useDisciplinas()
  const { idebData, loading: loadingIdeb } = useIdeb()
  const { engajamento, loading: loadingEngajamento } = useEngajamento()

  const realTimeEngajamento = useRealTimeData(engajamento, 10000)

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

  const handlePlayVideo = (videoId, disciplina, titulo) => {
    alert(`Reproduzindo: ${titulo}\n\nEm uma implementação real, aqui seria aberto o player de vídeo para ${videoId}`)
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
        <div className="container mx-auto px-2 sm:px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
        <div className="container mx-auto px-2 sm:px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-col sm:grid sm:grid-cols-5 w-full bg-transparent h-auto sm:h-16">
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
      <main className="container mx-auto px-2 sm:px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          
          {/* Apoio Escolar Remoto */}
          <TabsContent value="apoio-escolar" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Apoio Escolar Remoto</h2>
              <p className="text-lg text-gray-600">Vídeo-aulas para o Ensino Fundamental I</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
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
                      <div key={aula.id} className="flex flex-col md:flex-row items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4 mb-2 md:mb-0">
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
                          className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto mt-2 md:mt-0"
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

          {/* Repita para os outros TabsContent: IDEB, Conteúdos, Destaques, Gestor */}
          {/* ...mantenha as grids assim: grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 (ou md:grid-cols-2, md:grid-cols-3, conforme necessário) */}
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
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
