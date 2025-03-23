const { createTheme } = require("@mui/material");

export const darktheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            // main: '#e91e63',
            // main: '#5A20CB',
            main: '#0D0D0D',
        },
        secondary: {
            main: '#5A20CB',
        },
        black: {
            main: '#0D0D0D',
        },
        background:
        {
            main:"#000000",
            default: "#0D0D0D",
            paper: "#0D0D0D"
        },
        textColor: {
            main: '#111111',
            
        }
    }
})