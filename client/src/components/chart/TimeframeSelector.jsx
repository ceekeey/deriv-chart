import useChartStore from '../../store/chartStore'

const TIMEFRAME_OPTIONS = ['1m', '5m', '15m', '30m', '1H', '4H', '1D']

function TimeframeSelector() {
    const timeframe = useChartStore((state) => state.timeframe)
    const setTimeframe = useChartStore((state) => state.setTimeframe)

    return (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-panel p-1.5">
            {TIMEFRAME_OPTIONS.map((option) => {
                const isActive = option === timeframe

                return (
                    <button
                        key={option}
                        type="button"
                        onClick={() => setTimeframe(option)}
                        className={[
                            'rounded-lg px-2.5 py-1.5 text-xs font-semibold transition md:text-sm',
                            isActive
                                ? 'bg-primary text-white shadow-sm shadow-primary/30'
                                : 'text-text-secondary hover:bg-surface hover:text-text-primary',
                        ].join(' ')}
                    >
                        {option}
                    </button>
                )
            })}
        </div>
    )
}

export default TimeframeSelector
