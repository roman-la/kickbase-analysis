import { DataGrid } from '@mui/x-data-grid'

import { trendIcons, currencyFormatter } from './SharedConstants'

import data from '../data/taken_players.json'

function TakenPlayersTable() {
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
            field: 'buyPrice',
            headerName: 'Kaufpreis',
            type: 'number',
            flex: 2,
            valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
            headerAlign: 'center',
            cellClassName: 'font-tabular-nums'
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
            field: 'turnover',
            headerName: 'Gewinn/Verlust',
            type: 'number',
            flex: 2,
            valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
            headerAlign: 'center',
            cellClassName: 'font-tabular-nums'
        },
        {
            field: 'manager',
            headerName: 'Manager',
            headerAlign: 'center',
            align: 'center',
            flex: 2
        }
    ]

    const rows = data.map((row, i) => (
        {
            id: i,
            teamLogo: process.env.PUBLIC_URL + "/images/" + row.team_id + ".png",
            firstName: row.first_name,
            lastName: row.last_name,
            buyPrice: row.buy_price === 0 ? row.market_value : row.buy_price,
            marketValue: row.market_value,
            turnover: row.buy_price === 0 ? 0 : row.market_value - row.buy_price,
            manager: row.user,
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
            initialState={{ sorting: { sortModel: [{ field: 'turnover', sort: 'desc' }] } }}
        />
    )
}

export default TakenPlayersTable
