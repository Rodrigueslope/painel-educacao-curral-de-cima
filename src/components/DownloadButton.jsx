import React from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Download } from 'lucide-react'

const DownloadButton = ({ fileName, displayName, className = "" }) => {
  const handleDownload = () => {
    // Criar URL para o arquivo
    const fileUrl = `/materiais/${fileName}`
    
    // Criar elemento de link temporário para download
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName
    link.target = '_blank'
    
    // Adicionar ao DOM, clicar e remover
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Log para analytics (pode ser integrado com sistema de tracking)
    console.log(`Download iniciado: ${fileName}`)
    
    // Aqui poderia ser feita uma chamada para API para registrar o download
    // fetch('/api/track-download', { method: 'POST', body: JSON.stringify({ file: fileName }) })
  }

  return (
    <Button 
      onClick={handleDownload}
      className={className}
      variant="outline"
    >
      <Download className="w-4 h-4 mr-2" />
      {displayName || 'Baixar'}
    </Button>
  )
}

export default DownloadButton

