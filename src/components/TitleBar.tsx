import { Avatar, Box, Button, Chip, Container, IconButton, InputAdornment, SxProps, TextField } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'

export const TitleBar = (props: { sx: SxProps }) => {
    return (
        <Box
            sx={{
                ...props.sx,
                display: 'flex',
                flexWrap: 'nowrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0px 3px 0px 1px hsla(0, 0%, 0%, 0.1)',
                px: 3,
                py: 1,
            }}
        >
            <Box display='flex' alignItems='center' gap={3}>
                <TextField
                    size='small'
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
                <Button size='small' startIcon={<AddIcon />} variant='contained'>
                    New Booking
                </Button>
            </Box>
            <Chip avatar={<Avatar />} onClick={() => console.log('clicked the chip')} label='Hello [name]! 👋' />
        </Box>
    )
}
