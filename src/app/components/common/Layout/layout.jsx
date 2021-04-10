import { useRef } from 'react'
import { CatBar, Footer, NavBar } from '..'
import CATEGORIES from '../../../assets/category-detailed.json'
import { Loader } from '../../ui'
import { CategoriesFromLocal } from '../CatBar/categories'
import './layout.scss'

export default function Layout({
    children,
    navbar = true,
    loading = false,
    loadingText = 'loading...',
    categories = true,
    categorieslocal = true
}) {
    const topRef = useRef(null)

    return (
        <div>
            {navbar && <NavBar />}
            <div className="App">
                <div ref={topRef} />

                {categories &&
                    (categorieslocal ? (
                        <CategoriesFromLocal
                            categories={CATEGORIES}
                        />
                    ) : (
                        <CatBar />
                    ))}
                <div className="App-main">
                    {children}
                    {loading && (
                        <>
                            <Loader />
                            <p style={{ padding: '12px 0' }}>
                                {loadingText}
                            </p>
                        </>
                    )}
                </div>
                <Footer topRef={topRef} />
            </div>
        </div>
    )
}
