import React, { useEffect, useState } from 'react'
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
import timestamp from './data/timestamp.json'
import TransferRevenueLineChart from './components/TransferRevenueLineChart'
import LineupPlanner from "./components/LineupPlanner"
import MarketValueChangesTable from './components/MarketValueChangesTable'
import TeamValueLineChart from './components/TeamValueLineChart'

const darkTheme = createTheme({ palette: { mode: 'dark' } })
const lightTheme = createTheme({ palette: { mode: 'light' } })

function App() {
  const [selectedTab, setSelectedTab] = useState("1")
  const [darkModeEnabled, setDarkModeEnabled] = useState(JSON.parse(localStorage.getItem("darkModeEnabled")))

  if (darkModeEnabled === null) {
    let systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkModeEnabled(systemTheme)
    localStorage.setItem("darkModeEnabled", systemTheme)
  }

  const handleThemeToggle = (status) => {
    setDarkModeEnabled(status)
    localStorage.setItem("darkModeEnabled", status)
  }

  return (
    <ThemeProvider theme={darkModeEnabled ? darkTheme : lightTheme}>
      <CssBaseline />
      <div style={{ width: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Box sx={{ marginBottom: 2 }}>
          <TabContext value={selectedTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: '1000px', minWidth: '700px' }}>
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item>
                  <TabList onChange={(e, v) => setSelectedTab(v)}>
                    <Tab label="Transfers" value="1" />
                    <Tab label="Transfererlöse" value="2" />
                    <Tab label="Spieler" value="3" />
                  </TabList>
                </Grid>
                <Grid item><Typography variant="button" style={{ opacity: '0.7' }}>Stand: {new Date(timestamp.time).toLocaleString('de-DE')}</Typography></Grid>
                <Grid item>
                  <FormControlLabel control={<Switch checked={darkModeEnabled} onChange={(e) => handleThemeToggle(e.target.checked)} />} label={<Typography variant="button" style={{ opacity: '0.7' }}>Dark Mode</Typography>} />
                </Grid>
              </Grid>
            </Box>
            <TabPanel sx={{ padding: 0 }} value="1">
              <Paper sx={{ marginTop: 2 }} elevation={5}>
                <Typography variant="h4" sx={{ padding: 1 }}>Transfermarkt</Typography>
                <MarketTable />
              </Paper>
              <Paper sx={{ marginTop: 2 }} elevation={5}>
                <Typography variant="h4" sx={{ padding: 1 }}>Marktwertveränderungen</Typography>
                <MarketValueChangesTable />
              </Paper>
              <Paper sx={{ marginTop: 2 }} elevation={5}>
                <Typography variant="h4" sx={{ padding: 1 }}>Aufstellungs Planer</Typography>
                <LineupPlanner />
              </Paper>
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="2">
              <Paper sx={{ marginTop: 2 }} elevation={5}>
                <Typography variant="h4" sx={{ padding: 1 }}>Transfererlöse</Typography>
                <TurnoversTable />
              </Paper>
              <Paper sx={{ marginTop: 2 }} elevation={5}>
                <Typography variant="h4" sx={{ padding: 1 }}>Summe der Transfererlöse</Typography>
                <TransferRevenueLineChart darkModeEnabled={darkModeEnabled} />
              </Paper>
              <Paper sx={{ marginTop: 2 }} elevation={5}>
                <Typography variant="h4" sx={{ padding: 1 }}>Teamwert</Typography>
                <TeamValueLineChart darkModeEnabled={darkModeEnabled} />
              </Paper>
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="3">
              <Paper sx={{ marginTop: 2 }} elevation={5}>
                <Typography variant="h4" sx={{ padding: 1 }}>Gebundene Spieler</Typography>
                <TakenPlayersTable />
              </Paper>
              <Paper sx={{ marginTop: 2 }} elevation={5}>
                <Typography variant="h4" sx={{ padding: 1 }}>Freie Spieler</Typography>
                <FreePlayersTable />
              </Paper>
            </TabPanel>
          </TabContext>
        </Box>
        <Paper sx={{ width: '1000px' }} elevation={5}>
          <Typography variant="h6" sx={{ paddingLeft: 1, paddingTop: 1 }}>Disclaimer</Typography>
          <Typography sx={{ padding: 1 }}>
            This site is for educational and non-profit purposes only.<br />
            All trademarks, logos and brand names are the property of their respective owners.
          </Typography>
        </Paper>
      </div>
    </ThemeProvider>
  )
}

export default App
