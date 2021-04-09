import { useRef } from 'react'
import { CatBar, Footer, NavBar } from '..'
import './layout.scss'

export default function Layout({
    children,
    navbar = true,
    categories = true
}) {
    const topRef = useRef(null)

    return (
        <div>
            {navbar && <NavBar />}
            <div className="App">
                <div ref={topRef} />

                {categories && <CatBar />}
                <div className="App-main">{children}</div>
                <Footer topRef={topRef} />
            </div>
        </div>
    )
}
