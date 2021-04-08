import { useRef } from 'react'
import { CatBar, Footer, NavBar } from '..'

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

                {categories && <CatBar />}
                {children}

                <Footer topRef={topRef} />
            </div>
        </>
    )
}
