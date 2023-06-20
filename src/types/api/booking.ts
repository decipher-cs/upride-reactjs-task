export interface OnlineOfflineBookings {
    offline_bookings: { [key: string]: Booking }
    online_bookings: { [key: string]: Booking }
}

export interface Booking {
    bookingAmount: number
    bookingEpochTime: number
    bookingID: string
    bookingStatus: BookingStatus
    bookingSuccessful: boolean
    clientID: string
    clientName: string
    clientPhone: string
    numSessions: number
    offlineBooking: boolean
    packageID: string
    packageTitle: string
    paymentID: string
    paymentMode: string
    paymentSuccessful: boolean
    refundStatus: RefundStatus
    userEmail: string
    userGender: UserGender
    userID: string
    userName: string
    userPhone: string
    withDL?: boolean
    workshopID: string
    workshopImage: string
    workshopTitle: string
    staffID?: string
}

export type BookingStatus = 'SUCCESS' | 'CANCELLED' | 'COMPLETED'

export type RefundStatus = 'REFUND_NOT_APPLICABLE'

export type UserGender = 'Male' | 'Female' | 'M' | 'NA' | 'f'

export interface BookingWithMedium extends Booking {
    bookingMedium: 'offline' | 'online'
    date: string
}
