import { useState, useEffect } from 'react'

export const useData = (dataFile) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/data/${dataFile}`)
        
        if (!response.ok) {
          throw new Error(`Erro ao carregar ${dataFile}: ${response.status}`)
        }
        
        const jsonData = await response.json()
        setData(jsonData)
        setError(null)
      } catch (err) {
        console.error(`Erro ao carregar dados de ${dataFile}:`, err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (dataFile) {
      loadData()
    }
  }, [dataFile])

  return { data, loading, error }
}

// Hook específico para disciplinas
export const useDisciplinas = () => {
  const { data, loading, error } = useData('disciplinas.json')
  return { 
    disciplinas: data?.disciplinas || [], 
    loading, 
    error 
  }
}

// Hook específico para IDEB
export const useIdeb = () => {
  const { data, loading, error } = useData('ideb.json')
  return { 
    idebData: data || {}, 
    loading, 
    error 
  }
}

// Hook específico para engajamento
export const useEngajamento = () => {
  const { data, loading, error } = useData('engajamento.json')
  return { 
    engajamento: data || {}, 
    loading, 
    error 
  }
}

// Hook para simular dados em tempo real (para demonstração)
export const useRealTimeData = (initialData, updateInterval = 30000) => {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    if (!initialData) return

    const interval = setInterval(() => {
      // Simular pequenas variações nos dados para demonstrar tempo real
      setData(prevData => {
        if (prevData.resumo) {
          return {
            ...prevData,
            resumo: {
              ...prevData.resumo,
              total_acessos: prevData.resumo.total_acessos + Math.floor(Math.random() * 3),
              videos_assistidos: prevData.resumo.videos_assistidos + Math.floor(Math.random() * 2),
              ultima_atualizacao: new Date().toISOString()
            }
          }
        }
        return prevData
      })
    }, updateInterval)

    return () => clearInterval(interval)
  }, [initialData, updateInterval])

  return data
}

