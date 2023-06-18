import { Box, Container, List, ListItem, ListItemText, Pagination, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Booking, OnlineOfflineBookings } from '../types/api/booking'

interface BookingWithMedium extends Booking {
    bookingMedium: 'offline' | 'online'
}

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

export const BookingsPagination = () => {
    const [totalPages, setTotalPages] = useState(10)
    const [currPage, setCurrPage] = useState(2)
    const [bookings, setBookings] = useState<BookingWithMedium[]>([])
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currTab, setCurrTab] = useState<0 | 1 | 2>(0)

    useEffect(() => {
        const URL = import.meta.env.VITE_API_URL
        if (URL === undefined) {
            console.log('API URL not set in environment variable.')
            return
        }

        fetch(URL)
            .then(data => data.json())
            .then((data: OnlineOfflineBookings) => {
                const allBookings: BookingWithMedium[] = []

                for (const objName in data.offline_bookings) {
                    allBookings.push({ bookingMedium: 'offline', ...data.offline_bookings[objName] })
                }
                for (const objName in data.online_bookings) {
                    allBookings.push({ bookingMedium: 'online', ...data.online_bookings[objName] })
                }
                allBookings.sort((a, b) => a.bookingEpochTime - b.bookingEpochTime)
                // Add a functio to convert time to human readable form.
                setBookings(allBookings)
            })
            .catch(err => {
                console.log('Error while fetching data:', err)
            })
    }, [])

    return (
        <Container>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={currTab} onChange={(_, tab) => setCurrTab(tab)} aria-label='basic tabs example'>
                    <Tab label='Active' />
                    <Tab label='Completed' />
                    <Tab label='Cancelled' />
                </Tabs>
            </Box>
            <TabPanel value={currTab} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={currTab} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={currTab} index={2}>
                Item Three
            </TabPanel>
            <List>
                {bookings
                    .map((value, i) => {
                        return (
                            <ListItem key={i}>
                                <ListItemText>{value.clientName}</ListItemText>
                                <ListItemText>{value.bookingEpochTime}</ListItemText>
                                <ListItemText>{value.packageID}</ListItemText>
                                <ListItemText>{value.bookingMedium}</ListItemText>
                            </ListItem>
                        )
                    })
                    .slice((currPage - 1) * itemsPerPage, (currPage - 1) * itemsPerPage + itemsPerPage)}
            </List>
            <Pagination count={totalPages} page={currPage} onChange={(_, page) => setCurrPage(page)} />
        </Container>
    )
}
