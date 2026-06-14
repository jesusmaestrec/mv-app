import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const BackButton = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-1 text-sm text-gray-400 active:scale-95 transition"
    >
      <ArrowLeft className="h-4 w-4" />
      Atrás
    </button>
  )
}
