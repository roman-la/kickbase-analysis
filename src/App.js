import MarketTable from "./components/MarketTable"
import TurnoversTable from "./components/TurnoversTable"
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TakenPlayersTable from "./components/TakenPlayersTable"
import FreePlayersTable from "./components/FreePlayersTable"

function App() {
  return (
    <div style={{ maxWidth: '1000px', minWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
      <Typography variant="h3" sx={{ margin: '25px' }}>Liga-Analyse</Typography>
      <Paper sx={{ margin: '25px' }} elevation={5}>
        <Typography variant="h4" sx={{ padding: '15px' }}>Transfermarkt</Typography>
        <MarketTable />
      </Paper>
      <Paper sx={{ margin: '25px' }} elevation={5}>
        <Typography variant="h4" sx={{ padding: '15px' }}>Transfererlöse</Typography>
        <TurnoversTable />
      </Paper>
      <Paper sx={{ margin: '25px' }} elevation={5}>
        <Typography variant="h4" sx={{ padding: '15px' }}>Gebundene Spieler</Typography>
        <TakenPlayersTable />
      </Paper>
      <Paper sx={{ margin: '25px' }} elevation={5}>
        <Typography variant="h4" sx={{ padding: '15px' }}>Freie Spieler</Typography>
        <FreePlayersTable />
      </Paper>
      <Paper sx={{ margin: '25px 25px 0px' }} elevation={5}>
        <Typography variant="h6" sx={{ padding: '15px' }}>Disclaimer</Typography>
        <Typography sx={{ padding: '0px 15px 15px' }}>
          This site is for educational purposes only. All trademarks, logos and brand names are the property of their respective owners.
        </Typography>
      </Paper>
    </div>
  )
}

export default App
