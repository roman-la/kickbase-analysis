import { DataGrid } from '@mui/x-data-grid'

import { trendIcons, currencyFormatter } from './SharedConstants'

import data from '../data/market.json'

data = data.filter(entry => new Date(entry.expiration) - new Date() > 0)

function MarketTable() {
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
            field: 'price',
            headerName: 'Preis',
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
            field: 'date',
            headerName: 'Ablaufdatum',
            type: 'dateTime',
            flex: 2,
            headerAlign: 'center',
            align: 'right'
        },
    ]

    const rows = data.map((row, i) => (
        {
            id: i,
            teamLogo: process.env.PUBLIC_URL + "/images/" + row.team_id + ".png",
            position: row.position,
            firstName: row.first_name,
            lastName: row.last_name,
            price: row.price,
            trend: row.trend,
            date: new Date(row.expiration)
        }
    ))

    return (
        <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            initialState={{ sorting: { sortModel: [{ field: 'date', sort: 'asc' }] } }}
        />
    )
}

export default MarketTable
