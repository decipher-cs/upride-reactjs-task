import { Box, ThemeProvider } from '@mui/material'
import { BookingsPagination } from './components/BookingsPagination'
import { SidePanel } from './components/SidePanel'
import { TitleBar } from './components/TitleBar'
import { customTheme } from './utility/MuiCustomTheme'

const App = () => {
    return (
        <ThemeProvider theme={customTheme}>
            <Box display='flex' sx={{ height: '100vh', overflow: 'hidden' }}>
                <SidePanel
                    sx={{
                        flexBasis: '23%',
                        background: 'linear-gradient(180deg, #EB6B9D 0%, rgba(255, 87, 87, 0.7) 138.64%)',
                    }}
                />

                <Box sx={{ flexBasis: '100%', display: 'grid', alignContent: 'flex-start' }}>
                    <TitleBar sx={{ height: 'fit-content' }} />
                    <BookingsPagination sx={{ height: 'auto' }} />
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default App
