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
import AttractionsIcon from '@mui/icons-material/Attractions'
import uprideLogo from '../assets/uprideLogo.svg'

export const SidePanel = (props: { sx: SxProps }) => {
    const [selection, setSelection] = useState<string | null>('home')

    const handleSelectionChange = (event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
        setSelection(newSelection)
    }

    return (
        <Box sx={{ ...props.sx, gap: 5, display: 'grid', alignItems: 'center', justifyItems: 'center' }}>
            <img src={uprideLogo} />
            <Card raised>
                <CardContent>
                    <Typography>Rajarajeswari Nagar</Typography>
                </CardContent>
                <CardActions>
                    <RadioGroup value='0'>
                        <FormControlLabel value='0' control={<Radio />} label='Branch 2' labelPlacement='start' />
                        <FormControlLabel value='1' control={<Radio />} label='Branch 3' labelPlacement='start' />
                    </RadioGroup>
                </CardActions>
            </Card>
            <ToggleButtonGroup
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
