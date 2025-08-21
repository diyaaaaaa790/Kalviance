import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type AuthUser = {
  id: string
  email: string
  name: string
}

type AuthContextValue = {
  user: AuthUser | null
  signInWithEmail: (email: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = 'squad-hub:user'
const ALLOWED_DOMAIN = 'kalvium.community'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as AuthUser
        setUser(parsed)
      } catch {}
    }
  }, [])

  const signInWithEmail = async (email: string) => {
    const domain = email.split('@')[1]?.toLowerCase()
    if (domain !== ALLOWED_DOMAIN) {
      throw new Error(`Please use your @${ALLOWED_DOMAIN} email`)
    }
    const name = email.split('@')[0].replace(/\./g, ' ')
    const fakeUser: AuthUser = {
      id: crypto.randomUUID(),
      email,
      name: name
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' '),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser))
    setUser(fakeUser)
  }

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, signInWithEmail, signOut }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

