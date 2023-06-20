import {
    Avatar,
    Box,
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
import phoneLogo from '../assets/phoneLogo.svg'
import avatarImg from '../assets/avatarImg.png'

interface BookingWithMedium extends Booking {
    bookingMedium: 'offline' | 'online'
    date: string
}

// functio to convert time to human readable form.
// from 743102980 to format -> Oct 26, 2022
const millisecondsToFormattedDate = (milliseconds: number) => {
    const date = new Date(milliseconds)
    const month = date.toLocaleString('default', { month: 'short' })
    const day = date.toLocaleString('default', { day: 'numeric' })
    const year = date.toLocaleString('default', { year: 'numeric' })
    return `${month} ${day}, ${year}`
}

export const BookingsPagination = (props: { sx: SxProps }) => {
    const [isLoading, setIsLoading] = useState(true)

    const [bookings, setBookings] = useState<BookingWithMedium[]>([])

    const [itemsPerPage, setItemsPerPage] = useState(10)

    const [currPage, setCurrPage] = useState(0)

    const [currTab, setCurrTab] = useState<0 | 1 | 2>(0)

    const [currBookingFilter, setCurrBookingFilter] = useState<BookingStatus>('SUCCESS')

    const totalPages = Math.ceil(
        bookings.filter(booking => booking.bookingStatus === currBookingFilter).length / itemsPerPage
    )

    useEffect(() => {
        const URL = import.meta.env.VITE_API_URL
        if (URL === undefined) {
            console.log('API URL not set in environment variable.')
            return
        }

        console.log('run')
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
            <Typography variant='h5'>
                View Bookings
                <img src={phoneLogo} />
            </Typography>

            <TableContainer component={Paper} sx={{ width: 'fit-content' }}>
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
                    <TableBody sx={{ maxHeight: '200px', overflow: 'auto' }}>
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
                                  .slice(currPage * itemsPerPage, currPage * itemsPerPage + itemsPerPage)
                                  .map((value, i) => {
                                      return (
                                          <TableRow key={i}>
                                              <TableCell align='center'>
                                                  <Avatar src={avatarImg} sx={{height: 24, width: 24}} />
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
                                count={totalPages ?? 10}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    )
}
