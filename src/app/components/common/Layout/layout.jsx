import { useRef, useState } from 'react'
import { CatBar, Footer, NavBar, SearchOverlay } from '..'
import CATEGORIES from '../../../assets/category-detailed.json'
import SOURCES from '../../../assets/sources-detailed.json'
import { Loader } from '../../ui'
import FloatingButton from '../../ui/FloatingButton'
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
    const searchRef = useRef(null)

    const [isCategoryView, setIsCategoryView] = useState(true)

    const openSearch = () => {
        searchRef.current.classList.toggle('is-open')
    }

    const toggleView = () => setIsCategoryView(!isCategoryView)

    return (
        <div className="App">
            {navbar && <NavBar opensearch={openSearch} />}
            <div ref={topRef} />

            {categories &&
                (categorieslocal ? (
                    <CategoriesFromLocal
                        isCategoryView={isCategoryView}
                        toggleView={toggleView}
                        data={isCategoryView ? CATEGORIES : SOURCES}
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
            <SearchOverlay searchRef={searchRef} />
            <FloatingButton />
        </div>
    )
}
