import { ResponsivePie } from '@nivo/pie'
import { useState } from 'react'
import data from '../data/players_on_match_day.json'
import { nivoDarkTheme, nivoLightTheme, teams } from './SharedConstants'

const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    let total = 0
    dataWithArc.forEach(datum => {
        total += datum.value
    })

    return (
        <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="central"
            fill='white'
            style={{
                fontSize: '24px',
            }}
        >
            {`${Number(total).toLocaleString('de-DE', { minimumFractionDigits: 0 })} €`}
        </text>
    )
}

function TeamValuePieChart(props) {
    const [manager, setManager] = useState(Object.keys(data)[0])
    const [matchDays, setMatchDays] = useState(Object.keys(data[manager]))
    const [matchDay, setMatchDay] = useState(matchDays[0])

    let summedData = Object.values(data[manager][matchDay].reduce((acc, obj) => {
        const { team_id, market_value } = obj
        if (!acc[team_id]) {
            acc[team_id] = { id: teams[team_id].name, value: 0, color: teams[team_id].color }
        }
        acc[team_id].value += market_value
        return acc
    }, {}))

    return (
        <div style={{ height: '30em' }}>
            <ResponsivePie
                theme={props.darkModeEnabled ? nivoDarkTheme : nivoLightTheme}
                data={summedData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                colors={{ datum: 'data.color' }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                arcLinkLabelsTextColor={{ theme: 'textColor' }}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={20}
                arcLabelsTextColor={{ theme: 'textColor' }}
                valueFormat={value => `${Number(value).toLocaleString('de-DE', {
                    minimumFractionDigits: 0,
                })} €`}
                layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
            />
        </div>
    )
}

export default TeamValuePieChart
