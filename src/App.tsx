import { Box, ThemeOptions, ThemeProvider, createTheme } from '@mui/material'
import { BookingsPagination } from './components/BookingsPagination'
import { SidePanel } from './components/SidePanel'
import { TitleBar } from './components/TitleBar'
import { red } from '@mui/material/colors'

const theme = createTheme({
    palette: {
        primary: {
            main: red[500],
        },
    },
})

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box display='flex' sx={{minHeight: '100vh'}}>
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
