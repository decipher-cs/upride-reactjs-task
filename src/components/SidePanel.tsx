import {
    Box,
    Card,
    CardActions,
    CardContent,
    FormControlLabel,
    Radio,
    RadioGroup,
    SxProps,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import uprideLogo from '../assets/uprideLogo.svg'

export const SidePanel = (props: { sx: SxProps }) => {
    const [selection, setSelection] = useState<string | null>('home')

    const handleSelectionChange = (event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
        setSelection(newSelection)
    }

    return (
        <Box sx={{ ...props.sx }}>
            <Box
                sx={{
                    display: 'grid',
                    alignItems: 'flex-start',
                    justifyItems: 'center',
                    gap: 3,
                    mt: 2,
                }}
            >
                <img src={uprideLogo} />
                <Card raised sx={{ borderRadius: '23px' }}>
                    <CardContent>
                        <Typography variant='body2'>Rajarajeswari Nagar</Typography>
                    </CardContent>
                    <CardActions>
                        <RadioGroup value='0'>
                            <FormControlLabel value='0' control={<Radio />} label='Branch 2' labelPlacement='start' />
                            <FormControlLabel value='1' control={<Radio />} label='Branch 3' labelPlacement='start' />
                        </RadioGroup>
                    </CardActions>
                </Card>
            </Box>
            <ToggleButtonGroup
                sx={{ mt: 10 }}
                orientation='vertical'
                value={selection}
                fullWidth
                exclusive
                onChange={handleSelectionChange}
            >
                <ToggleButton value='home'>Home</ToggleButton>
                <ToggleButton value='earnings'>My Earnings</ToggleButton>
                <ToggleButton value='services'>My Services</ToggleButton>
                <ToggleButton value='assets'>My Assets</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    )
}
