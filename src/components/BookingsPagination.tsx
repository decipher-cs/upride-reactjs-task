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
import { useState } from 'react'
import { BookingStatus } from '../types/api/booking'
import phoneLogo from '../assets/phoneLogo.svg'
import avatarImg from '../assets/avatarImg.png'
import { useBookingData } from '../hooks/useBookingData'

const LoadingSkeleton = () => {
    return (
        <TableRow>
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
}

export const BookingsPagination = (props: { sx: SxProps }) => {
    const { bookings, isLoading } = useBookingData()

    const [itemsPerPage, setItemsPerPage] = useState(10)

    const [currPage, setCurrPage] = useState(0)

    const [currTab, setCurrTab] = useState<0 | 1 | 2>(0)

    const [currBookingFilter, setCurrBookingFilter] = useState<BookingStatus>('SUCCESS')

    const totalPages = Math.ceil(
        bookings.filter(booking => booking.bookingStatus === currBookingFilter).length / itemsPerPage
    )

    const handleBookingFilter = (selectedTab: 0 | 1 | 2) => {
        if (selectedTab === 0) setCurrBookingFilter('SUCCESS')
        else if (selectedTab === 1) setCurrBookingFilter('COMPLETED')
        else if (selectedTab === 2) setCurrBookingFilter('CANCELLED')
        setCurrTab(selectedTab)
    }

    return (
        <Box
            sx={{
                ...props.sx,
                p: 4,
                display: 'grid',
                overflow: 'hidden',
                maxWidth: '70%',
                gap: 2
            }}
        >
            <Typography variant='h5' pl={1.5} fontWeight='800' sx={{ display: 'flex', gap: 2 }}>
                View Bookings
                <img src={phoneLogo} />
            </Typography>
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

            <TableContainer component={Paper} sx={{ overflowY: 'scroll', borderRadius: '23px' }}>
                <Table size='small'>
                    <TableHead
                        component={Box}
                        sx={{
                            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                            borderRadius: '22px 22px 0px 0px',
                            backgroundColor: '#F1F1F1',
                        }}
                    >
                        <TableRow>
                            <TableCell align='center'></TableCell>
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align='center'>Date</TableCell>
                            <TableCell align='center'>Package Details</TableCell>
                            <TableCell align='center'>Payment Mode</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody component={Box} sx={{ maxHeight: '20px', overflow: 'hiddne' }}>
                        {isLoading === true
                            ? Array(itemsPerPage)
                                  .fill('')
                                  .map((_, i) => <LoadingSkeleton key={i} />)
                            : bookings
                                  .filter(booking => booking.bookingStatus === currBookingFilter)
                                  .slice(currPage * itemsPerPage, currPage * itemsPerPage + itemsPerPage)
                                  .map((value, i) => {
                                      return (
                                          <TableRow key={i}>
                                              <TableCell align='center' sx={{ py: 2.4 }}>
                                                  <Avatar src={avatarImg} />
                                              </TableCell>
                                              <TableCell component='th' scope='row' align='center'>
                                                  {value.clientName}
                                              </TableCell>
                                              <TableCell align='center'>{value.date}</TableCell>
                                              <TableCell align='center'>{value.packageTitle}</TableCell>
                                              <TableCell align='center'>
                                                  <Paper
                                                      elevation={0}
                                                      sx={{
                                                          backgroundColor:
                                                              value.bookingMedium === 'online' ? '#35DBA2' : '#FFCA28',

                                                          borderRadius: 17,
                                                          color: 'white',
                                                      }}
                                                  >
                                                      {value.bookingMedium}
                                                  </Paper>
                                              </TableCell>
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
                                count={totalPages}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    )
}
