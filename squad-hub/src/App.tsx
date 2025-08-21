import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import SignInPage from './pages/SignInPage'
import DashboardLayout from './components/layout/DashboardLayout'
import AnnouncementsPage from './pages/AnnouncementsPage'
import AchievementsPage from './pages/AchievementsPage'
import NotesPage from './pages/NotesPage'

function ProtectedRoute() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<SignInPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Navigate to="/announcements" replace />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/notes" element={<NotesPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/announcements" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
