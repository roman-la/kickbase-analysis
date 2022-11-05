import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import MarketTable from "./components/MarketTable"
import TurnoversTable from "./components/TurnoversTable"
import TakenPlayersTable from "./components/TakenPlayersTable"
import FreePlayersTable from "./components/FreePlayersTable"
import LineupChangesHeatmap from "./components/LineupChangesHeatmap"
import TransferRevenueLineChart from "./components/TransferRevenueLineChart"
import TeamValueLineChart from "./components/TeamValueLineChart"
import LineupPlanner from "./components/LineupPlanner"
import StandingsBumpChart from './components/StandingsBumpChart'

function App() {
  const [selectedTab, setSelectedTab] = useState("1")

  return (
    <div style={{ maxWidth: '1000px', minWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
      <Box>
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: '1000px', minWidth: '700px' }}>
            <TabList onChange={(e, v) => setSelectedTab(v)}>
              <Tab label="Transfererlöse" value="1" />
              <Tab label="Spieler" value="2" />
              <Tab label="Spieltage" value="3" />
              <Tab label="Transfers" value="4" />
            </TabList>
          </Box>
          <TabPanel sx={{ padding: 0 }} value="1">
            <Paper sx={{ marginTop: '25px' }} elevation={5}>
              <Typography variant="h4" sx={{ padding: '15px' }}>Summe der Transfererlöse</Typography>
              <TransferRevenueLineChart />
            </Paper>
            <Paper sx={{ marginTop: '25px' }} elevation={5}>
              <Typography variant="h4" sx={{ padding: '15px' }}>Transfererlöse</Typography>
              <TurnoversTable />
            </Paper>
          </TabPanel>
          <TabPanel sx={{ padding: 0 }} value="2">
            <Paper sx={{ marginTop: '25px' }} elevation={5}>
              <Typography variant="h4" sx={{ padding: '15px' }}>Gebundene Spieler</Typography>
              <TakenPlayersTable />
            </Paper>
            <Paper sx={{ marginTop: '25px' }} elevation={5}>
              <Typography variant="h4" sx={{ padding: '15px' }}>Freie Spieler</Typography>
              <FreePlayersTable />
            </Paper>
          </TabPanel>
          <TabPanel sx={{ padding: 0 }} value="3">
            <Paper sx={{ marginTop: '25px' }} elevation={5}>
              <Typography variant="h4" sx={{ padding: '15px' }}>Tabellenplatz nach Spieltag</Typography>
              <StandingsBumpChart />
            </Paper>
            <Paper sx={{ marginTop: '25px' }} elevation={5}>
              <Typography variant="h4" sx={{ padding: '15px' }}>Teamwert am Spieltag</Typography>
              <TeamValueLineChart />
            </Paper>
            <Paper sx={{ marginTop: '25px' }} elevation={5}>
              <Typography variant="h4" sx={{ padding: '15px' }}>Veränderungen in der Aufstellung</Typography>
              <LineupChangesHeatmap />
            </Paper>
          </TabPanel>
          <TabPanel sx={{ padding: 0 }} value="4">
            <Paper sx={{ marginTop: '25px' }} elevation={5}>
              <Typography variant="h4" sx={{ padding: '15px' }}>Aufstellungs Planer</Typography>
              <LineupPlanner />
            </Paper>
            <Paper sx={{ marginTop: '25px' }} elevation={5}>
              <Typography variant="h4" sx={{ padding: '15px' }}>Transfermarkt</Typography>
              <MarketTable />
            </Paper>
          </TabPanel>
        </TabContext>
      </Box>
      <Paper sx={{ margin: '25px 0px 0px' }} elevation={5}>
        <Typography variant="h6" sx={{ padding: '15px' }}>Disclaimer</Typography>
        <Typography sx={{ padding: '0px 15px 15px' }}>
          This site is for educational purposes only. All trademarks, logos and brand names are the property of their respective owners.
        </Typography>
      </Paper>
    </div>
  )
}

export default App
