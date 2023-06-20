// functio to convert time to human readable form.
// from 743102980 to format -> Oct 26, 2022
export const millisecondsToFormattedDate = (milliseconds: number) => {
    const date = new Date(milliseconds)
    const month = date.toLocaleString('default', { month: 'short' })
    const day = date.toLocaleString('default', { day: 'numeric' })
    const year = date.toLocaleString('default', { year: 'numeric' })
    return `${month} ${day}, ${year}`
}
