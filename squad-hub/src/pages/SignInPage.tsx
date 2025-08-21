import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const DOMAIN = 'kalvium.community'

export default function SignInPage() {
  const { signInWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signInWithEmail(email.trim())
      navigate('/announcements', { replace: true })
    } catch (err: any) {
      setError(err?.message ?? 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-brand-50 to-white">
      <div className="w-full max-w-md rounded-2xl border bg-white/80 p-6 shadow-xl backdrop-blur">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-brand-600 text-white grid place-items-center font-bold">S</div>
          <div>
            <div className="text-lg font-semibold">Squad Hub</div>
            <div className="text-xs text-slate-500">Squads 69 & 70</div>
          </div>
        </div>
        <h1 className="page-title">Sign in</h1>
        <p className="muted mb-6">Use your @{DOMAIN} email to continue.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder={`your.name@${DOMAIN}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </div>
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}

