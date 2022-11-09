import { ResponsiveHeatMap } from '@nivo/heatmap'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

import { nivoDarkTheme, nivoLightTheme } from './SharedConstants'

import data from '../data/points.json'

function PointsPerValueLineChart(props) {
    return (
        <div style={{ height: '30em' }}>
            <ResponsiveHeatMap
                theme={props.darkModeEnabled ? nivoDarkTheme : nivoLightTheme}
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
                    return (<Paper elevation={3} sx={{ padding: 1 }}>
                        <Typography style={{ fontWeight: 'bold' }}>{e.cell.serieId}</Typography>
                        <Typography>{e.cell.data.x}. Spieltag</Typography>
                        <Typography>{e.cell.formattedValue}</Typography>
                    </Paper>)
                }}
            />
        </div>
    )
}

export default PointsPerValueLineChart
