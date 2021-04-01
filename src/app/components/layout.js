import { useRef } from 'react'
import Categories from './categories'
import Footer from './footer'
import NavBar from './navBar'

export default function Layout({ children }) {
    const topRef = useRef(null)

    return (
        <>
            <NavBar />
            <div className="App">
                <div ref={topRef} />

                <Categories />
                {children}

                <Footer topRef={topRef} />
            </div>
        </>
    )
}
