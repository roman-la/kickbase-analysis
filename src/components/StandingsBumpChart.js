import { ResponsiveBump } from '@nivo/bump'

import data from '../data/standings.json'

function StandingsBumpChart() {
    return (<div style={{height: '500px'}}>
        <ResponsiveBump 
        data={data} 
        margin={{ top: 10, right: 100, bottom: 50, left: 60 }}
        xOuterPadding={0.15}
        yOuterPadding={0.25}
        colors={{ scheme: 'category10' }}
        lineWidth={3}
        pointSize={7}
        axisTop={null}
        />
    </div>)
}

export default StandingsBumpChart
