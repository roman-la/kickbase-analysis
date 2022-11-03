import { ResponsiveLine } from '@nivo/line'

import data from '../data/team_values.json'

function TeamValueLineChart() {
    var processedData = []

    for (var user in data) {
        var d = []
        for (var matchDay in data[user]) {
            d.push({x: matchDay, y: data[user][matchDay]})
        }
        processedData.push({id: user, data: d})
    }

    return (
        <div style={{ height: '30em' }}>
            <ResponsiveLine
                data={processedData}
                margin={{ top: 10, right: 230, bottom: 40, left: 100 }}
                yScale={{
                    type: 'linear',
                    stacked: false,
                    min: 100000000
                }}
                yFormat={value => `${Number(value).toLocaleString('de-DE', {
                    minimumFractionDigits: 0,
                })} €`}
                axisLeft={{legend: 'Teamwert'}}
                axisBottom={{legend: 'Spieltag'}}
                colors={{ scheme: 'category10' }}
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
                crosshairType="cross"
                tooltip={(datum) => <div style={{
                    background: 'white',
                    padding: '9px 12px',
                    border: '1px solid #ccc',
                }}>
                    <div style={{ color: datum.point.color, fontWeight: 'bold' }}>{datum.point.serieId}</div>
                    <div>{datum.point.data.xFormatted}. Spieltag</div>
                    <div>{datum.point.data.yFormatted}</div>
                </div>
                }
            />
        </div>
    )
}

export default TeamValueLineChart
