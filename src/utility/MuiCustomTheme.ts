import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

export const customTheme = createTheme({
    palette: {
        primary: {
            main: red[400],
        },
    },
    typography: {
        fontFamily: 'Open Sans',
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {},
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                    borderRadius: '100px',
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: { root: { fontSize: '1.1rem' } },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                    paddingInline: '0.3rem',
                    paddingBlock: '0.9rem',
                },
            },
        },
        MuiAvatar: {
            styleOverrides: { root: { height: 28, width: 28 } },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: red[50],
                        background: 'rgb(360, 360, 360, 0.3)',
                        ':hover': {
                            color: red[50],
                            background: 'rgb(360, 360, 360, 0.3)',
                        },
                    },
                    ':hover': {
                        color: red[50],
                        background: 'rgb(360, 360, 360, 0.3)',
                    },
                    color: red[50],
                },
            },
        },
    },
})
