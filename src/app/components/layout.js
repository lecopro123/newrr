import { useRef } from 'react'
import Categories from './categories'
import Footer from './footer'
import NavBar from './navbar'

export default function Layout({
    children,
    navbar = true,
    categories = true
}) {
    const topRef = useRef(null)

    return (
        <>
            {navbar && <NavBar />}
            <div className="App">
                <div ref={topRef} />

                {categories && <Categories />}
                {children}

                <Footer topRef={topRef} />
            </div>
        </>
    )
}
