import { BookingsPagination } from './components/BookingsPagination'
import { SidePanel } from './components/SidePanel'
import { TitleBar } from './components/TitleBar'

const App = () => {
    return (
        <>
            <SidePanel />
            <TitleBar />
            <BookingsPagination />
        </>
    )
}

export default App
