import { ResponsiveHeatMap } from '@nivo/heatmap'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'

import { nivoDarkTheme, nivoLightTheme } from './SharedConstants'

import data from '../data/lineup_changes.json'

function LineupChangesHeatmap(props) {
    var rows = []

    for (var user in data) {
        let row = []

        for (var matchDay in data[user])
            row.push({ x: matchDay, y: data[user][matchDay] })

        rows.push({ id: user, data: row })
    }

    return (
        <div style={{ height: '30em' }}>
            <ResponsiveHeatMap
                theme={props.darkModeEnabled ? nivoDarkTheme : nivoLightTheme}
                margin={{ top: 20, right: 0, bottom: 30, left: 0 }}
                data={rows}
                forceSquare={true}
                colors={{
                    type: 'sequential',
                    scheme: 'blues'
                }}
                tooltip={(e) => <Paper elevation={3} sx={{ padding: 1 }}>
                    <Typography style={{ fontWeight: 'bold' }}>{e.cell.serieId}</Typography>
                    <Typography>{e.cell.data.x}. Spieltag</Typography>
                    <Typography>{e.cell.data.y} Änderungen</Typography>
                </Paper>
                }
            />
        </div>
    )
}

export default LineupChangesHeatmap