import {
    Avatar,
    Box,
    Pagination,
    Paper,
    Skeleton,
    SxProps,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Tabs,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Booking, BookingStatus, OnlineOfflineBookings } from '../types/api/booking'

interface BookingWithMedium extends Booking {
    bookingMedium: 'offline' | 'online'
    date: string
}

const millisecondsToFormattedDate = (milliseconds: number) => {
    // functio to convert time to human readable form.
    // from 743102980 to format -> Oct 26, 2022

    const date = new Date(milliseconds)
    const month = date.toLocaleString('default', { month: 'short' })
    const day = date.toLocaleString('default', { day: 'numeric' })
    const year = date.toLocaleString('default', { year: 'numeric' })
    return `${month} ${day}, ${year}`
}

export const BookingsPagination = (props: { sx: SxProps }) => {
    const [isLoading, setIsLoading] = useState(true)

    const [totalPages, setTotalPages] = useState(10)

    const [currPage, setCurrPage] = useState(1)

    const [bookings, setBookings] = useState<BookingWithMedium[]>([])

    const [itemsPerPage, setItemsPerPage] = useState(10)

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
                setIsLoading(false)
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
        <Box sx={props.sx}>
            <Typography variant='h5'>View Bookings</Typography>
            <TableContainer component={Box} sx={{ width: 'fit-content' }}>
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
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'></TableCell>
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align='center'>Date</TableCell>
                            <TableCell align='center'>Package Details</TableCell>
                            <TableCell align='center'>Payment Mode</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading === true
                            ? Array(10)
                                  .fill('')
                                  .map((_, i) => {
                                      return (
                                          <TableRow key={i}>
                                              <TableCell align='center'>
                                                  <Skeleton />
                                              </TableCell>
                                              <TableCell align='center'>
                                                  <Skeleton />
                                              </TableCell>
                                              <TableCell align='center'>
                                                  <Skeleton />
                                              </TableCell>
                                              <TableCell align='center'>
                                                  <Skeleton />
                                              </TableCell>
                                              <TableCell align='center'>
                                                  <Skeleton />
                                              </TableCell>
                                          </TableRow>
                                      )
                                  })
                            : bookings
                                  .filter(booking => booking.bookingStatus === currBookingFilter)
                                  .slice((currPage - 1) * itemsPerPage, (currPage - 1) * itemsPerPage + itemsPerPage)
                                  .map((value, i) => {
                                      return (
                                          <TableRow key={i}>
                                              <TableCell align='center'>
                                                  <Avatar />
                                              </TableCell>
                                              <TableCell align='center'> {value.clientName} </TableCell>
                                              <TableCell align='center'>{value.date}</TableCell>
                                              <TableCell align='center'>{value.packageTitle}</TableCell>
                                              <TableCell align='center'>{value.bookingMedium}</TableCell>
                                          </TableRow>
                                      )
                                  })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                page={currPage}
                                onPageChange={(_, page) => setCurrPage(page)}
                                rowsPerPage={itemsPerPage}
                                onRowsPerPageChange={e => setItemsPerPage(parseInt(e.target.value, 10))}
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={4}
                                count={bookings.length}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    )
}
