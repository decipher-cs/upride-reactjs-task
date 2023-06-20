import { Box, ThemeOptions, ThemeProvider, createTheme } from '@mui/material'
import { BookingsPagination } from './components/BookingsPagination'
import { SidePanel } from './components/SidePanel'
import { TitleBar } from './components/TitleBar'
import { red } from '@mui/material/colors'

const theme = createTheme({
    palette: {
        primary: {
            main: red[400],
        },
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
    },
})

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box display='flex' sx={{ height: '100vh', overflow: 'hidden' }}>
                <SidePanel
                    sx={{
                        flexBasis: '23%',
                        background: 'linear-gradient(180deg, #EB6B9D 0%, rgba(255, 87, 87, 0.7) 138.64%)',
                    }}
                />

                <Box sx={{ flexBasis: '100%' }}>
                    <TitleBar sx={{}} />
                    <BookingsPagination sx={{ height: 'auto' }} />
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default App
