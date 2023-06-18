import { Container, Pagination, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { Booking, OnlineOfflineBookings } from '../types/api/booking'

interface BookingWithMedium extends Booking {
    bookingMedium: 'offline' | 'online'
}

export const BookingsPagination = () => {
    const [totalPages, setTotalPages] = useState(10)
    const [currPage, setCurrPage] = useState(2)
    const [bookings, setBookings] = useState<BookingWithMedium[]>([])
    const [itemsPerPage, setItemsPerPage] = useState(10)

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
                setBookings(allBookings)
            })
            .catch(err => {
                console.log('Error while fetching data:', err)
            })
    }, [])

    return (
        <Container>
            <Stack>
                {bookings
                    .map((value, i) => {
                        return <div key={i}>{i}</div>
                    })
                    .slice((currPage - 1) * itemsPerPage, (currPage - 1) * itemsPerPage + itemsPerPage)}
            </Stack>
            <Pagination count={totalPages} page={currPage} onChange={(_, page) => setCurrPage(page)} />
        </Container>
    )
}
