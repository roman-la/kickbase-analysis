import { ResponsiveHeatMap } from '@nivo/heatmap'

import data from '../data/lineup_changes.json'

function LineupChangesHeatmap() {
    var rows = []

    for (var user in data) {
        let row = []

        for (var matchDay in data[user]) {
            row.push({ x: matchDay, y: data[user][matchDay] })
        }

        rows.push({ id: user, data: row })
    }

    return (
        <div style={{ height: '30em' }}>
            <ResponsiveHeatMap
                margin={{ top: 30, right: 0, bottom: 60, left: 0 }}
                data={rows}
                forceSquare={true}
                colors={{
                    type: 'sequential',
                    scheme: 'blues'
                }}
                legends={[
                    {
                        anchor: 'bottom',
                        translateX: 0,
                        translateY: 40,
                        length: 200,
                        thickness: 10,
                        direction: 'row',
                        tickPosition: 'after',
                        tickSize: 5,
                        tickSpacing: 4,
                        tickOverlap: true,
                        title: 'Anzahl der Änderungen zum letzten Spieltag',
                        titleAlign: 'middle',
                        titleOffset: 6
                    }
                ]}
            />
        </div>
    )
}

export default LineupChangesHeatmap