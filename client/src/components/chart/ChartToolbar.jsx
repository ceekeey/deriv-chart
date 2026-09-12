import { Activity, Crosshair, MoveHorizontal, TrendingUp } from 'lucide-react'

const actions = [
    { label: 'Crosshair', icon: Crosshair },
    { label: 'Trend', icon: TrendingUp },
    { label: 'Move', icon: MoveHorizontal },
]

function ChartToolbar() {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-panel px-4 py-3 text-sm">
            <div className="flex items-center gap-2 text-text-secondary">
                <Activity className="h-4 w-4 text-success" />
                <span>Market data</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                {actions.map(({ label, icon: Icon }) => (
                    <button
                        key={label}
                        type="button"
                        className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary transition hover:border-primary hover:text-text-primary"
                    >
                        <span className="flex items-center gap-2">
                            <Icon className="h-3.5 w-3.5" />
                            {label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ChartToolbar
