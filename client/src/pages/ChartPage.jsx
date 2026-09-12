import ChartToolbar from '../components/chart/ChartToolbar'
import DrawingLayer from '../components/chart/DrawingLayer'
import IndicatorManager from '../components/chart/IndicatorManager'
import SymbolSelector from '../components/chart/SymbolSelector'
import TimeframeSelector from '../components/chart/TimeframeSelector'
import TradingChart from '../components/chart/TradingChart'

function ChartPage() {
    return (
        <section className="space-y-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary">Trading chart</p>
                    <h1 className="mt-1 text-2xl font-bold text-text-primary">Market overview</h1>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <SymbolSelector />
                <TimeframeSelector />
            </div>

            <div className="space-y-4">
                <ChartToolbar />
                <TradingChart />
                <DrawingLayer />
                <IndicatorManager />
            </div>
        </section>
    )
}

export default ChartPage
