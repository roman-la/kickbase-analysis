import { DataGrid } from '@mui/x-data-grid'

import { trendIcons, currencyFormatter } from './SharedConstants'

import data from '../data/free_players.json'

function FreePlayersTable() {
    const columns = [
        {
            field: 'teamLogo',
            headerName: 'Team',
            width: 50,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => <img src={params.value} alt={params.value} width='40' />
        },
        {
            field: 'position',
            headerName: 'Position',
            headerAlign: 'center',
            align: 'center',
            flex: 1
        },
        {
            field: 'firstName',
            headerName: 'Vorname',
            headerAlign: 'center',
            align: 'center',
            flex: 2
        },
        {
            field: 'lastName',
            headerName: 'Nachname',
            headerAlign: 'center',
            align: 'center',
            flex: 2
        },
        {
            field: 'marketValue',
            headerName: 'Marktwert',
            type: 'number',
            flex: 2,
            valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
            headerAlign: 'center',
            cellClassName: 'font-tabular-nums'
        },
        {
            field: 'trend',
            headerName: 'Trend',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => trendIcons[params.value]
        },
        {
            field: 'points',
            headerName: 'Punkte',
            headerAlign: 'center',
            flex: 1
        }
    ]

    const rows = data.map((row, i) => (
        {
            id: i,
            teamLogo: process.env.PUBLIC_URL + "/images/" + row.team_id + ".png",
            firstName: row.first_name,
            lastName: row.last_name,
            marketValue: row.market_value,
            points: row.points,
            position: row.position,
            trend: row.trend
        }
    ))

    return (
        <DataGrid
            width={window.innerWidth}
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            initialState={{ sorting: { sortModel: [{ field: 'marketValue', sort: 'desc' }] } }}
        />
    )
}

export default FreePlayersTable
