import { useRef, useState } from 'react'
import { CatBar, Footer, NavBar, SearchOverlay } from '..'
import CATEGORIES from '../../../assets/category-detailed.json'
import SOURCES from '../../../assets/sources-detailed.json'
import { Loader } from '../../ui'
import { CategoriesFromLocal } from '../CatBar/categories'
import FloatingMenuButton from '../FloatingMenuButton'
import './layout.scss'

export default function Layout({
    children,
    navbar = true,
    loading = false,
    loadingText = 'loading...',
    categories = true,
    categorieslocal = true,
    tintVisible = false
}) {
    const topRef = useRef(null)
    const searchRef = useRef(null)
    const rootRef = useRef(null)
    const tintRef = useRef(null)

    const viewModeIsCategoryView = () => {
        const m = localStorage.getItem('isCategoryView')
        if (m === null) return true
        return JSON.parse(localStorage.getItem('isCategoryView'))
    }

    const [isCategoryView, setIsCategoryView] = useState(
        viewModeIsCategoryView()
    )

    const openSearch = () => {
        searchRef.current.classList.toggle('is-open')
    }

    const toggleTint = () => {
        tintRef.current.classList.toggle('visible')
    }

    const toggleView = () => {
        localStorage.setItem('isCategoryView', !isCategoryView)
        setIsCategoryView(!isCategoryView)
    }

    return (
        <div ref={rootRef} className="App">
            {navbar && (
                <NavBar rootRef={rootRef} opensearch={openSearch} />
            )}
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
                        <p className="page-loading-text">
                            {loadingText}
                        </p>
                    </>
                )}
            </div>
            <Footer topRef={topRef} />
            <SearchOverlay searchRef={searchRef} />
            <FloatingMenuButton />
            {tintVisible && (
                <div
                    ref={tintRef}
                    onClick={toggleTint}
                    className="popup-bg-tint"
                ></div>
            )}
        </div>
    )
}
