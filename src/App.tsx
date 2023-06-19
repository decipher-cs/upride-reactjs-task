import { Box } from '@mui/material'
import { BookingsPagination } from './components/BookingsPagination'
import { SidePanel } from './components/SidePanel'
import { TitleBar } from './components/TitleBar'

const App = () => {
    return (
        <Box
            display='flex'
            sx={{
                border: 'solid red 2px',
            }}
        >
            <SidePanel sx={{ height: 'auto', border: 'solid green 3px' }} />
            <div>
                <TitleBar sx={{ height: 'auto', border: 'solid green 3px' }} />
                <BookingsPagination sx={{ height: 'auto', border: 'solid green 3px' }} />
            </div>
        </Box>
    )
}

export default App
