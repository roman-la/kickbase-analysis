import { ResponsiveHeatMap } from '@nivo/heatmap'

import data from '../data/points.json'

function PointsPerValueLineChart() {
    return (
        <div style={{ height: '30em' }}>
            <ResponsiveHeatMap
                margin={{ top: 20, right: 0, bottom: 30, left: 0 }}
                data={data}
                forceSquare={true}
                colors={{
                    type: 'sequential',
                    scheme: 'red_yellow_green'
                }}
                enableLabels={false}
                valueFormat={e => e * 1000000}
                tooltip={(e) => {
                    return (<div style={{ background: 'white', padding: '9px 12px', border: '1px solid #ccc' }}>
                        <div style={{ fontWeight: 'bold' }}>{e.cell.serieId}</div>
                        <div>{e.cell.data.x}. Spieltag</div>
                        <div>{e.cell.formattedValue}</div>
                    </div>)
                }}
            />
        </div>
    )
}

export default PointsPerValueLineChart
