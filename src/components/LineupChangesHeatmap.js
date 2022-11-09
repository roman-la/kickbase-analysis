import { ResponsiveHeatMap } from '@nivo/heatmap'

import data from '../data/lineup_changes.json'

function LineupChangesHeatmap() {
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
                margin={{ top: 20, right: 0, bottom: 30, left: 0 }}
                data={rows}
                forceSquare={true}
                colors={{
                    type: 'sequential',
                    scheme: 'blues'
                }}
            />
        </div>
    )
}

export default LineupChangesHeatmap