import { Activity, BarChart3, LayoutDashboard, ShieldCheck, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const placeholderCards = [
    { title: 'Recent layouts', value: '3 saved', icon: LayoutDashboard },
    { title: 'Saved charts', value: '12 active', icon: BarChart3 },
    { title: 'Market overview', value: 'Live placeholder', icon: TrendingUp },
]

function Dashboard() {
    const user = useAuthStore((state) => state.user)

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-text-secondary">Dashboard</p>
                    <h1 className="mt-2 text-3xl font-semibold text-text-primary">Welcome back, {user?.username || 'Trader'}</h1>
                </div>
            </div>

            <div className="rounded-xl border border-border bg-panel p-5 sm:p-6">
                <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                        <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-text-primary">Authentication connected</p>
                        <p className="mt-1 text-sm text-text-secondary">
                            Your Chart workspace is ready. This dashboard confirms the authenticated session is active.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {placeholderCards.map(({ title, value, icon: Icon }) => (
                    <div key={title} className="rounded-xl border border-border bg-surface p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-text-secondary">{title}</p>
                            <div className="rounded-lg border border-border bg-panel p-2 text-primary">
                                <Icon className="h-4 w-4" />
                            </div>
                        </div>
                        <p className="mt-5 text-2xl font-semibold text-text-primary">{value}</p>
                    </div>
                ))}
            </div>

            <div className="rounded-xl border border-border bg-surface p-5">
                <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-success/10 p-2 text-success">
                        <Activity className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-text-primary">System status</p>
                        <p className="text-sm text-text-secondary">Session restored successfully and protected routes are active.</p>
                    </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                    <Link to="/chart" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover">
                        Open Chart
                    </Link>
                    <Link to="/profile" className="rounded-lg border border-border bg-panel px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-primary/60">
                        View Profile
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Dashboard
