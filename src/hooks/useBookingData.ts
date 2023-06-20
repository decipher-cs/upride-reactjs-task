import { useEffect, useState } from 'react'
import { BookingWithMedium, OnlineOfflineBookings } from '../types/api/booking'
import { millisecondsToFormattedDate } from '../utility/utilityFunctions'

export const useBookingData = () => {
    const [bookings, setBookings] = useState<BookingWithMedium[]>([])

    const [isLoading, setIsLoading] = useState(true)

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
            })
            .catch(err => {
                console.log('Error while fetching data:', err)
            })
    })
    return { bookings, setBookings, isLoading, setIsLoading }
}
