import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'

export const trendIcons = {
    0: <TrendingFlatIcon />,
    1: <TrendingUpIcon sx={{ color: 'green' }} />,
    2: <TrendingDownIcon sx={{ color: 'red' }} />
}

export const currencyFormatter = new Intl.NumberFormat('de-DE',
    { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

export const nivoLightTheme = {}

export const nivoDarkTheme = {
    "textColor": "#ffffff",
    "tooltip": {
        "container": {
            "color": "#000000"
        }
    }
}

export const teams = {
    2: { name: "München", color: "#df2127" },
    3: { name: "Dortmund", color: "#ffe800" },
    4: { name: "Frankfurt", color: "#ce291f" },
    5: { name: "Freiburg", color: "#000000" },
    7: { name: "Leverkusen", color: "#E32221" },
    9: { name: "Stuttgart", color: "#ffffff" },
    10: { name: "Bremen", color: "#009556" },
    11: { name: "Wolfsburg", color: "#00a300" },
    13: { name: "Augsburg", color: "#BA3733" },
    14: { name: "Hoffenheim", color: "#1c63b7" },
    15: { name: "Gladbach", color: "#000000" },
    18: { name: "Mainz", color: "#e62100" },
    24: { name: "Bochum", color: "#005CA9" },
    28: { name: "Köln", color: "#eb2206" },
    40: { name: "Union Berlin", color: "#EB1923" },
    42: { name: "Darmstadt", color: "E2001A" },
    43: { name: "Leipzig", color: "#ffffff" },
    50: { name: "Heidenheim", color: "E2001A" }
}
