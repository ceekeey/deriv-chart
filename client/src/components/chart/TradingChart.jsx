import { useEffect, useRef, useState } from 'react'
import { CandlestickSeries, ColorType, createChart } from 'lightweight-charts'
import derivSocket, { normalizeDerivCandle } from '../../services/derivSocket'
import useChartStore from '../../store/chartStore'

const CHART_HEIGHT = 460

function TradingChart() {
    const containerRef = useRef(null)
    const chartRef = useRef(null)
    const seriesRef = useRef(null)
    const resizeObserverRef = useRef(null)
    const requestSessionRef = useRef(null)

    const symbol = useChartStore((state) => state.symbol)
    const timeframe = useChartStore((state) => state.timeframe)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const container = containerRef.current

        if (!container) {
            return undefined
        }

        const chart = createChart(container, {
            width: container.clientWidth || 900,
            height: CHART_HEIGHT,
            layout: {
                background: { type: ColorType.Solid, color: '#111827' },
                textColor: '#94A3B8',
            },
            grid: {
                vertLines: { color: '#263248', style: 1 },
                horzLines: { color: '#263248', style: 1 },
            },
            crosshair: {
                mode: 0,
                vertLine: { color: '#60A5FA', width: 1 },
                horzLine: { color: '#60A5FA', width: 1 },
            },
            rightPriceScale: { borderColor: '#263248' },
            timeScale: {
                borderColor: '#263248',
                timeVisible: true,
                secondsVisible: false,
            },
            handleScale: {
                mouseWheel: true,
                pinch: true,
                axisDoubleClickReset: true,
            },
        })

        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#22C55E',
            downColor: '#EF4444',
            borderVisible: false,
            wickUpColor: '#22C55E',
            wickDownColor: '#EF4444',
        })

        chartRef.current = chart
        seriesRef.current = candlestickSeries

        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0]

            if (!entry) {
                return
            }

            const { width } = entry.contentRect
            chart.applyOptions({ width: Math.max(width, 320) })
        })

        resizeObserver.observe(container)
        resizeObserverRef.current = resizeObserver

        return () => {
            resizeObserver.disconnect()
            chart.remove()
            chartRef.current = null
            seriesRef.current = null
        }
    }, [])

    useEffect(() => {
        const series = seriesRef.current
        const chart = chartRef.current

        if (!series || !chart) {
            return undefined
        }

        setIsLoading(true)
        setError('')
        series.setData([])

        const sessionId = `chart-${Date.now()}-${Math.random().toString(16).slice(2)}`
        requestSessionRef.current = sessionId

        let isActive = true
        const liveRequestId = `${sessionId}-live`

        const handleChartError = (message) => {
            if (!isActive) {
                return
            }

            const errorMessage = message?.message || message?.error || 'Unable to load market data.'
            setError(errorMessage)
            setIsLoading(false)
        }

        const handleHistoricalData = (response) => {
            if (!isActive) {
                return
            }

            const candleList = Array.isArray(response?.candles)
                ? response.candles
                : Array.isArray(response?.history)
                    ? response.history
                    : Array.isArray(response?.data)
                        ? response.data
                        : []

            const normalizedCandles = candleList
                .map((candle) => normalizeDerivCandle(candle))
                .filter(Boolean)
                .sort((left, right) => Number(left.time) - Number(right.time))
                .filter((candle, index, array) => index === 0 || array[index - 1].time !== candle.time)

            if (!normalizedCandles.length) {
                setError('Unable to load market data.')
                setIsLoading(false)
                return
            }

            series.setData(normalizedCandles)
            chart.timeScale().fitContent()
            setIsLoading(false)

            derivSocket.subscribeToCandles({
                symbol,
                timeframe,
                reqId: liveRequestId,
                onSuccess: (liveResponse) => {
                    if (!isActive) {
                        return
                    }

                    const liveCandle = normalizeDerivCandle(
                        liveResponse?.ohlc ?? liveResponse?.tick ?? liveResponse?.data ?? liveResponse?.candles?.at(-1),
                    )

                    if (!liveCandle) {
                        return
                    }

                    series.update(liveCandle)
                },
                onError: handleChartError,
            })
        }

        derivSocket.connect()
        derivSocket.requestHistoricalCandles({
            symbol,
            timeframe,
            count: 200,
            onSuccess: handleHistoricalData,
            onError: handleChartError,
        })

        return () => {
            isActive = false
            derivSocket.unsubscribeFromCandles({ reqId: liveRequestId })
            if (series) {
                series.setData([])
            }
        }
    }, [symbol, timeframe])

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg shadow-slate-950/20">
            <div className="flex items-center justify-between border-b border-border bg-panel px-4 py-3 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-success" />
                    <span>{symbol}</span>
                </div>
                <span>{timeframe}</span>
            </div>

            {error ? (
                <div className="flex min-h-[460px] items-center justify-center bg-surface px-6 text-center">
                    <div className="max-w-md rounded-xl border border-danger/40 bg-panel p-6">
                        <p className="text-base font-semibold text-text-primary">Unable to load market data.</p>
                        <p className="mt-2 text-sm text-text-secondary">{error}</p>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    {isLoading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface/90">
                            <div className="flex items-center gap-3 rounded-lg border border-border bg-panel px-4 py-2 text-sm text-text-secondary">
                                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                <span>Loading market data...</span>
                            </div>
                        </div>
                    )}

                    <div ref={containerRef} className="h-[460px] w-full bg-surface" />
                </div>
            )}
        </div>
    )
}

export default TradingChart
