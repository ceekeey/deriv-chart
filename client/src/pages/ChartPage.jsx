import ChartToolbar from '../components/chart/ChartToolbar'
import DrawingLayer from '../components/chart/DrawingLayer'
import IndicatorManager from '../components/chart/IndicatorManager'
import SymbolSelector from '../components/chart/SymbolSelector'
import TimeframeSelector from '../components/chart/TimeframeSelector'
import TradingChart from '../components/chart/TradingChart'

function ChartPage() { return <section><h1 className="text-2xl font-bold">Chart</h1><div className="mt-5 flex flex-wrap gap-4"><SymbolSelector /><TimeframeSelector /></div><div className="mt-5 grid gap-4"><ChartToolbar /><TradingChart /><DrawingLayer /><IndicatorManager /></div></section> }
export default ChartPage
