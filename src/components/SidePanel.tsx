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
                    <CardContent sx={{ px: 2, py: 1 }}>
                        <Typography fontSize={14}>Rajarajeswari Nagar</Typography>
                    </CardContent>
                    <CardActions sx={{ p: 0, justifyContent: 'center' }}>
                        <RadioGroup value='0'>
                            <FormControlLabel
                                value='0'
                                control={<Radio />}
                                label={<Typography fontSize={12}>Branch 2</Typography>}
                                labelPlacement='start'
                            />
                            <FormControlLabel
                                value='1'
                                control={<Radio />}
                                label={<Typography fontSize={12}>Branch 3</Typography>}
                                labelPlacement='start'
                            />
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
