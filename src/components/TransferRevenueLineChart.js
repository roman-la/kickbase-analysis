import { ResponsiveLine } from '@nivo/line'

import data from '../data/revenue_sum.json'

function TransferRevenueLineChart() {
    var processedData = []

    for (var user in data) {
        processedData.push({ id: user, data: data[user].map((e) => ({ x: e[0], y: e[1] })) })
    }

    return (
        <div style={{ height: '30em' }}>
            <ResponsiveLine
                data={processedData}
                margin={{ top: 10, right: 230, bottom: 30, left: 100 }}
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
                    min: -40000000,
                    max: 90000000
                }}
                yFormat={value => `${Number(value).toLocaleString('de-DE', {
                    minimumFractionDigits: 0,
                })} €`}
                colors={{ scheme: 'category10' }}
                axisBottom={null}
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
                        itemDirection: 'left-to-right',
                        itemTextColor: '#777',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                tooltip={(datum) => <div style={{
                    background: 'white',
                    padding: '9px 12px',
                    border: '1px solid #ccc',
                }}>
                    <div style={{ color: datum.point.color, fontWeight: 'bold' }}>{datum.point.serieId}</div>
                    <div>{datum.point.data.xFormatted}</div>
                    <div>{datum.point.data.yFormatted}</div>
                </div>
                }
            />
        </div>
    )
}

export default TransferRevenueLineChart
