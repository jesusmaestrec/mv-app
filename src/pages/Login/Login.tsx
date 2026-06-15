import { useMemo, useState } from 'react'
import { useAuth, useNotification } from '@/hooks'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { Button, Input } from '@/components'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const isEmailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    [email]
  )

  const isPasswordValid = password.length >= 8
  const isFormValid = isEmailValid && isPasswordValid

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid || isLoading) return

    setIsLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (error) {
      showNotification(
        'error',
        error instanceof Error ? error.message : 'Error al iniciar sesión'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm">
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center shadow-sm">
              <span className="text-white font-semibold text-lg tracking-tight">
                MV
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            Bienvenido de nuevo
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Inicia sesión para continuar en MV App
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}
          <Input
            label="Email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="h-4 w-4" />}
          />

          {/* PASSWORD */}
          <Input
            type="password"
            label="Contraseña"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="h-4 w-4" />}
          />

          {/* BUTTON */}
          <Button
            type="submit"
            className="mt-4"
            disabled={!isFormValid || isLoading}
          >
            Continuar
          </Button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-400 pt-6">
          © {new Date().getFullYear()} MV App. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}
