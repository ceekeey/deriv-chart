import { Navigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-app-bg text-text-primary">
      <div className="flex items-center gap-3 rounded border border-border bg-surface px-5 py-3 shadow-lg shadow-slate-950/20">
        <div className="h-4 w-4 animate-pulse rounded-full bg-primary" />
        <span className="text-sm text-text-secondary">Loading your workspace...</span>
      </div>
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useAuthStore()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

function GuestRoute({ children }) {
  const { isLoading, isAuthenticated } = useAuthStore()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export { GuestRoute }
export default ProtectedRoute
