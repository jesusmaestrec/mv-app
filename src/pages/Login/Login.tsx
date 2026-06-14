import { useMemo, useState } from 'react'
import { useAuth, useNotification } from '@/hooks'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, Loader2 } from 'lucide-react'

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
        {/* HEADER (Apple style) */}
        <div className="text-center mb-10">
          {/* Logo minimal */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center shadow-sm">
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

        {/* FORM CARD */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="text-xs font-medium text-gray-600">Email</label>

              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className={`w-full pl-10 pr-3 py-3 rounded-xl border text-sm outline-none transition
                    ${
                      email && !isEmailValid
                        ? 'border-red-400'
                        : 'border-gray-200 focus:border-gray-400'
                    }
                  `}
                />
              </div>

              {email && !isEmailValid && (
                <p className="text-xs text-red-500 mt-1">
                  Introduce un email válido
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs font-medium text-gray-600">
                Contraseña
              </label>

              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-3 py-3 rounded-xl border text-sm outline-none transition
                    ${
                      password && !isPasswordValid
                        ? 'border-red-400'
                        : 'border-gray-200 focus:border-gray-400'
                    }
                  `}
                />
              </div>

              {password && !isPasswordValid && (
                <p className="text-xs text-red-500 mt-1">Mínimo 8 caracteres</p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full mt-6 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition
                bg-black text-white
                hover:bg-gray-900
                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Iniciando sesión
                </>
              ) : (
                'Continuar'
              )}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-xs text-gray-400 pt-6">
            © {new Date().getFullYear()} MV App. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}
