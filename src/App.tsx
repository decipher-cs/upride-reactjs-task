import { Box } from '@mui/material'
import { BookingsPagination } from './components/BookingsPagination'
import { SidePanel } from './components/SidePanel'
import { TitleBar } from './components/TitleBar'

const App = () => {
    return (
        <Box
            display='flex'
            sx={{
                border: 'solid red 7px',
                alignItems: 'stretch',
            }}
        >
            <SidePanel sx={{ border: 'solid green 3px', flexBasis: '23%' }} />
            <Box sx={{ flexBasis: '100%' }}>
                <TitleBar sx={{}}/>
                <BookingsPagination sx={{ height: 'auto' }} />
            </Box>
        </Box>
    )
}

export default App
