import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'

import MarketTable from "./components/MarketTable"
import TurnoversTable from "./components/TurnoversTable"
import TakenPlayersTable from "./components/TakenPlayersTable"
import FreePlayersTable from "./components/FreePlayersTable"
import LineupChangesHeatmap from "./components/LineupChangesHeatmap"
import TransferRevenueLineChart from "./components/TransferRevenueLineChart"
import TeamValueLineChart from "./components/TeamValueLineChart"
import LineupPlanner from "./components/LineupPlanner"
import StandingsBumpChart from './components/StandingsBumpChart'
import PointsPerValue from './components/PointsPerValueLineChart'
import HelpIcon from './components/HelpIcon'

import timestamp from './data/timestamp.json'

const darkTheme = createTheme({ palette: { mode: 'dark' } })
const lightTheme = createTheme({ palette: { mode: 'light' } })

function App() {
  const [selectedTab, setSelectedTab] = useState("1")
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)

  return (
    <ThemeProvider theme={darkModeEnabled ? darkTheme : lightTheme}>
      <CssBaseline />
      <div style={{ maxWidth: '1000px', minWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Box>
          <TabContext value={selectedTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: '1000px', minWidth: '700px' }}>
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                  <TabList onChange={(e, v) => setSelectedTab(v)}>
                    <Tab label="Transfers" value="1" />
                    <Tab label="Transfererlöse" value="2" />
                    <Tab label="Spieler" value="3" />
                    <Tab label="Spieltage" value="4" />
                  </TabList>
                </Grid>
                <Grid item><Typography variant="button" style={{ opacity: '0.7' }}>Stand: {new Date(timestamp.time).toLocaleString('de-DE')}</Typography></Grid>
                <Grid item>
                  <FormControlLabel control={<Switch checked={darkModeEnabled} onChange={(e) => setDarkModeEnabled(e.target.checked)} />} label={<Typography variant="button" style={{ opacity: '0.7' }}>Dark Mode</Typography>} />
                </Grid>
              </Grid>
            </Box>
            <TabPanel sx={{ padding: 0 }} value="1">
              <Paper sx={{ marginTop: '25px' }} elevation={5}>
                <Typography variant="h4" sx={{ padding: '15px' }}>Transfermarkt</Typography>
                <MarketTable />
              </Paper>
              <Paper sx={{ marginTop: '25px' }} elevation={5}>
                <Typography variant="h4" sx={{ padding: '15px' }}>Aufstellungs Planer <HelpIcon text="Der aktuelle Kontostand kann eingegeben und Spieler in der letzten Spalte zum Verkaufen markiert werden. Der neue Kontostand wird dynamisch ausgerechnet. Mögliche Formationen werden über der Tabelle angezeigt: Spieler im Kader (blau), mögliche Formation (grün), nicht mögliche Formation (rot)" /></Typography>
                <LineupPlanner />
              </Paper>
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="2">
              <Paper sx={{ marginTop: '25px' }} elevation={5}>
                <Typography variant="h4" sx={{ padding: '15px' }}>Summe der Transfererlöse</Typography>
                <TransferRevenueLineChart darkModeEnabled={darkModeEnabled} />
              </Paper>
              <Paper sx={{ marginTop: '25px' }} elevation={5}>
                <Typography variant="h4" sx={{ padding: '15px' }}>Transfererlöse</Typography>
                <TurnoversTable />
              </Paper>
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="3">
              <Paper sx={{ marginTop: '25px' }} elevation={5}>
                <Typography variant="h4" sx={{ padding: '15px' }}>Gebundene Spieler</Typography>
                <TakenPlayersTable />
              </Paper>
              <Paper sx={{ marginTop: '25px' }} elevation={5}>
                <Typography variant="h4" sx={{ padding: '15px' }}>Freie Spieler</Typography>
                <FreePlayersTable />
              </Paper>
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="4">
              <Paper sx={{ marginTop: '25px' }} elevation={5}>
                <Typography variant="h4" sx={{ padding: '15px' }}>Tabellenplatz</Typography>
                <StandingsBumpChart darkModeEnabled={darkModeEnabled} />
              </Paper>
              <Paper sx={{ marginTop: '25px' }} elevation={5}>
                <Typography variant="h4" sx={{ padding: '15px' }}>Teamwert</Typography>
                <TeamValueLineChart darkModeEnabled={darkModeEnabled} />
              </Paper>
              <Paper sx={{ marginTop: '25px' }} elevation={5}>
                <Typography variant="h4" sx={{ padding: '15px' }}>Veränderungen in der Aufstellung</Typography>
                <LineupChangesHeatmap darkModeEnabled={darkModeEnabled} />
              </Paper>
              <Paper sx={{ marginTop: '25px' }} elevation={5}>
                <Typography variant="h4" sx={{ padding: '15px' }}>Punkte pro Teamwert <HelpIcon text="Berechnungsformel: Spieltags-Punkte / Spieltags-Teamwert * 1.000.000" /></Typography>
                <PointsPerValue darkModeEnabled={darkModeEnabled} />
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
    </ThemeProvider>
  )
}

export default App
