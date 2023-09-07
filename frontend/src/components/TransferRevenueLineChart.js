import { ResponsiveLine } from '@nivo/line'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

import { nivoDarkTheme, nivoLightTheme } from './SharedConstants'

import data from '../data/revenue_sum.json'

function TransferRevenueLineChart(props) {
    var processedData = []
    var minValue = Number.MAX_SAFE_INTEGER
    var maxValue = 0

    for (var user in data) {
        console.log(data[user])
        processedData.push({ id: user, data: data[user].map((e) => ({ x: e[0], y: e[1] })) })

        let max = Math.max(...data[user].map(e => e[1]))
        if (max > maxValue)
            maxValue = max

        let min = Math.min(...data[user].map(e => e[1]))
        if (min < minValue)
            minValue = min
    }

    return (
        <div style={{ height: '30em' }}>
            <ResponsiveLine
                theme={props.darkModeEnabled ? nivoDarkTheme : nivoLightTheme}
                data={processedData}
                margin={{ top: 10, right: 180, bottom: 30, left: 100 }}
                xScale={{
                    type: 'time',
                    format: '%Y-%m-%d',
                    useUTC: false,
                    precision: 'day',
                }}
                xFormat="time:%Y-%m-%d"
                yScale={{
                    type: 'linear',
                    stacked: false,
                    min: minValue,
                    max: maxValue
                }}
                yFormat={value => `${new Intl.NumberFormat('de-DE', {
                    maximumFractionDigits: 0
                }).format(value)} €`}
                colors={{ scheme: 'category10' }}
                axisLeft={{
                    legend: 'Transfererlöse',
                    legendOffset: 0,
                    format: value => `${new Intl.NumberFormat('de-DE', {
                        maximumFractionDigits: 0,
                        notation: "compact",
                        compactDisplay: "short"
                    }).format(value)} €`
                }}
                axisBottom={{
                    legend: 'Datum',
                    format: value => ``,
                    tickSize: 0
                }}
                curve={'catmullRom'}
                useMesh={true}
                enableSlices={false}
                legends={[
                    {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 150,
                        translateY: 0,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemsSpacing: 4,
                        symbolSize: 20,
                        symbolShape: 'circle',
                        itemDirection: 'left-to-right'
                    }
                ]}
                crosshairType="cross"
                tooltip={(datum) => <Paper elevation={3} sx={{ padding: 1 }}>
                    <Typography style={{ color: datum.point.color, fontWeight: 'bold' }}>{datum.point.serieId}</Typography>
                    <Typography>{datum.point.data.xFormatted}</Typography>
                    <Typography>{datum.point.data.yFormatted}</Typography>
                </Paper>
                }
            />
        </div>
    )
}

export default TransferRevenueLineChart
