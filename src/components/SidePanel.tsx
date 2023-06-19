import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useState } from 'react'

export const SidePanel = () => {
    const [selection, setSelection] = useState('home')
    const handleSelectionChange = (event: React.MouseEvent<HTMLElement>, newSelection: string) => {
        setSelection(newSelection)
    }
    return (
        <>
            <Box>
                <Typography variant='h5'>Upride</Typography>
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
        </>
    )
}
