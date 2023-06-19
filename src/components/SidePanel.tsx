import { Box, SxProps, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useState } from 'react'

export const SidePanel = (props: { sx: SxProps }) => {
    const [selection, setSelection] = useState<string | null>('home')

    const handleSelectionChange = (event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
        setSelection(newSelection)
    }

    return (
        <Box sx={props.sx}>
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
    )
}
