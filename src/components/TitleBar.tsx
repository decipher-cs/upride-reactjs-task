import { Avatar, Box, Button, Chip, Container, IconButton, InputAdornment, SxProps, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import avatarImg from '../assets/avatarImg.png'

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
                px: 4,
                py: 2,
            }}
        >
            <Box display='flex' alignItems='center' gap={3}>
                <TextField
                    size='small'
                    placeholder='Search Bookings'
                    variant='outlined'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment variant='filled' position='end'>
                                <IconButton
                                    sx={{
                                        background:
                                            'linear-gradient(180deg, #EB6B9D 0%, rgba(255, 87, 87, 0.7) 138.64%)',
                                    }}
                                    size='small'
                                >
                                    <SearchIcon
                                        sx={{
                                            fill: 'white',
                                        }}
                                    />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    size='small'
                    startIcon={<AddIcon />}
                    variant='contained'
                    sx={{
                        background: 'linear-gradient(180deg, #EB6B9D 0%, rgba(255, 87, 87, 0.7) 138.64%)',
                        borderRadius: 44,
                    }}
                >
                    New Booking
                </Button>
            </Box>
            <Chip
                avatar={<Avatar src={avatarImg} />}
                onClick={() => console.log('clicked the chip')}
                label='Hello [name]! 👋'
            />
        </Box>
    )
}
