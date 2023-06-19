import { Box, Container, List, ListItem, ListItemText, Pagination, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Booking, BookingStatus, OnlineOfflineBookings } from '../types/api/booking'

interface BookingWithMedium extends Booking {
    bookingMedium: 'offline' | 'online'
    date: string
}

const millisecondsToFormattedDate = (milliseconds: number) => {
    // functio to convert time to human readable form.
    // from 743102980 to format -> Oct 26, 2022
    //
    const date = new Date(milliseconds)
    const month = date.toLocaleString('default', { month: 'short' })
    const day = date.toLocaleString('default', { day: 'numeric' })
    const year = date.toLocaleString('default', { year: 'numeric' })
    return `${month} ${day}, ${year}`
}

export const BookingsPagination = () => {
    const [totalPages, setTotalPages] = useState(10)

    const [currPage, setCurrPage] = useState(1)

    const [bookings, setBookings] = useState<BookingWithMedium[]>([])

    const [itemsPerPage] = useState(10)

    const [currTab, setCurrTab] = useState<0 | 1 | 2>(0)

    const [currBookingFilter, setCurrBookingFilter] = useState<BookingStatus>('SUCCESS')

    useEffect(() => {
        const URL = import.meta.env.VITE_API_URL
        if (URL === undefined) {
            console.log('API URL not set in environment variable.')
            return
        }

        fetch(URL)
            .then(data => data.json())
            .then((data: OnlineOfflineBookings) => {
                console.log(data)
                const allBookings: BookingWithMedium[] = []

                for (const objName in data.offline_bookings) {
                    const date = millisecondsToFormattedDate(data.offline_bookings[objName].bookingEpochTime)
                    allBookings.push({ bookingMedium: 'offline', ...data.offline_bookings[objName], date })
                }
                for (const objName in data.online_bookings) {
                    const date = millisecondsToFormattedDate(data.online_bookings[objName].bookingEpochTime)
                    allBookings.push({ bookingMedium: 'online', ...data.online_bookings[objName], date })
                }
                allBookings.sort((a, b) => a.bookingEpochTime - b.bookingEpochTime)

                setBookings(allBookings)
                setTotalPages(Math.ceil(allBookings.length / 10))
            })
            .catch(err => {
                console.log('Error while fetching data:', err)
            })
    }, [])

    const handleBookingFilter = (selectedTab: 0 | 1 | 2) => {
        if (selectedTab === 0) setCurrBookingFilter('SUCCESS')
        else if (selectedTab === 1) setCurrBookingFilter('COMPLETED')
        else if (selectedTab === 2) setCurrBookingFilter('CANCELLED')
        setCurrTab(selectedTab)
    }

    return (
        <Container>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={currTab}
                    onChange={(_, tab) => {
                        handleBookingFilter(tab)
                    }}
                    aria-label='Booking filter type'
                >
                    <Tab label='Active' />
                    <Tab label='Completed' />
                    <Tab label='Cancelled' />
                </Tabs>
            </Box>
            <Box>
                <List>
                    {bookings
                        .filter(booking => booking.bookingStatus === currBookingFilter)
                        .slice((currPage - 1) * itemsPerPage, (currPage - 1) * itemsPerPage + itemsPerPage)
                        .map((value, i) => {
                            return (
                                <ListItem key={i}>
                                    <ListItemText>{value.clientName}</ListItemText>
                                    <ListItemText>{value.date}</ListItemText>
                                    <ListItemText>{value.packageID}</ListItemText>
                                    <ListItemText>{value.bookingMedium}</ListItemText>
                                </ListItem>
                            )
                        })}
                </List>
                <Pagination count={totalPages} page={currPage} onChange={(_, page) => setCurrPage(page)} />
            </Box>
        </Container>
    )
}
