import { Box, Button, Chip, IconButton, InputAdornment, SxProps, TextField } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'

export const TitleBar = (props: { sx: SxProps }) => {
    return (
        <Box sx={props.sx}>
            <TextField
                placeholder='Search Bookings'
                InputProps={{
                    endAdornment: (
                        <InputAdornment variant='filled' position='end'>
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button startIcon={<AddIcon />} variant='contained'>
                New Booking
            </Button>
            <Chip label='Hello Foobar! 👋' icon={<FaceIcon />} />
        </Box>
    )
}
