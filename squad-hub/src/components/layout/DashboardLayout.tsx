import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Megaphone, Medal, NotebookText, LogOut } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext'

function NavItem({ to, icon: Icon, label }: { to: string; icon: any; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
        }`
      }
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </NavLink>
  )
}

export default function DashboardLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr]">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-brand-600 text-white grid place-items-center font-bold">
              S
            </div>
            <div>
              <div className="font-semibold">Squad Hub</div>
              <div className="text-xs text-slate-500">Squads 69 & 70</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium">{user?.name ?? 'Student'}</div>
              <div className="text-xs text-slate-500">{user?.email}</div>
            </div>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 p-4 sm:grid-cols-[220px,1fr]">
        <aside className="rounded-lg border bg-white p-3 h-fit">
          <nav className="space-y-1">
            <NavItem to="/announcements" icon={Megaphone} label="Announcements" />
            <NavItem to="/achievements" icon={Medal} label="Achievements" />
            <NavItem to="/notes" icon={NotebookText} label="Notes" />
          </nav>
        </aside>
        <main className="min-h-[60vh] rounded-lg border bg-white p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

