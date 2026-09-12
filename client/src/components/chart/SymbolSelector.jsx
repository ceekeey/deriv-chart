import useChartStore from '../../store/chartStore'

const SYMBOL_OPTIONS = ['R_100', '1HZ10V', '2HZ10V', 'R_50']

function SymbolSelector() {
    const symbol = useChartStore((state) => state.symbol)
    const setSymbol = useChartStore((state) => state.setSymbol)

    return (
        <label className="flex items-center gap-2 rounded-xl border border-border bg-panel px-3 py-2 text-sm text-text-secondary">
            <span className="font-medium text-text-primary">Symbol</span>
            <select
                value={symbol}
                onChange={(event) => setSymbol(event.target.value)}
                className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text-primary outline-none ring-0 transition focus:border-primary"
            >
                {SYMBOL_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    )
}

export default SymbolSelector
