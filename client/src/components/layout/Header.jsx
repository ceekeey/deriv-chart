import { LogOut, UserCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

function Header() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="border-b border-border bg-surface/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            C
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-text-secondary">Chart</p>
            <p className="text-base font-semibold text-text-primary">Deriv Chart</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-border bg-panel px-3 py-2 text-sm text-text-secondary sm:flex">
            <UserCircle2 className="h-4 w-4 text-primary" />
            {user?.username || 'Trader'}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-border bg-panel px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-primary/60 hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
