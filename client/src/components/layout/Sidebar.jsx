import { BarChart3, LayoutDashboard, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/chart', label: 'Chart', icon: BarChart3 },
  { to: '/profile', label: 'Profile', icon: User },
]

function Sidebar() {
  return (
    <aside className="w-full border-b border-border bg-surface p-3 text-text-primary md:min-h-full md:w-64 md:border-b-0 md:border-r">
      <nav className="flex gap-2 md:flex-col">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:bg-panel hover:text-text-primary'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
