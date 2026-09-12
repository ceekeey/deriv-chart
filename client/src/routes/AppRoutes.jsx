import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute, { GuestRoute } from '../components/auth/ProtectedRoute'
import AppLayout from '../components/layout/AppLayout'
import ChartPage from '../pages/ChartPage'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import useAuthStore from '../store/authStore'

function RootRedirect() {
    const { isLoading, isAuthenticated } = useAuthStore()

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-app-bg text-text-primary">
                <div className="flex items-center gap-3 rounded border border-border bg-surface px-5 py-3 shadow-lg shadow-slate-950/20">
                    <div className="h-4 w-4 animate-pulse rounded-full bg-primary" />
                    <span className="text-sm text-text-secondary">Loading your workspace...</span>
                </div>
            </div>
        )
    }

    return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />
}

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chart" element={<ChartPage />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes
