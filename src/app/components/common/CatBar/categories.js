import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getArticleCategories } from '../../../../redux/actions/articleActions'
import colors from '../../../assets/category-colors.json'
import './categories.scss'

export default function Categories() {
    const categories = useSelector((state) => state.categories)
    let dispatch = useDispatch()

    useEffect(() => {
        if (!categories.data.length) {
            dispatch(getArticleCategories())
        } else return
    }, [dispatch, categories.data.length])

    return (
        <div className="categories">
            {categories.data.map((c, i) => {
                return (
                    <span key={i}>
                        <Link
                            to={`/articles/category/${c.sub_cat}/${c.id}/`}
                        >
                            <span
                                style={{
                                    backgroundColor: colors[i].color
                                }}
                                className="categories-link"
                            >
                                {c.sub_cat}
                            </span>
                        </Link>
                        {categories.data.length - 1 !== i && ' '}
                    </span>
                )
            })}
        </div>
    )
}

const CategoriesFromLocal = ({
    isCategoryView,
    toggleView,
    data = []
}) => (
    <div className="categories">
        <div
            onClick={toggleView}
            style={{
                backgroundColor: isCategoryView
                    ? '#d97e79'
                    : ' #4a3d3c'
            }}
            className="switch-mode-icon"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
            >
                <path d="M7.72 21.78a.75.75 0 001.06-1.06L5.56 17.5h14.69a.75.75 0 000-1.5H5.56l3.22-3.22a.75.75 0 10-1.06-1.06l-4.5 4.5a.75.75 0 000 1.06l4.5 4.5zm8.56-9.5a.75.75 0 11-1.06-1.06L18.44 8H3.75a.75.75 0 010-1.5h14.69l-3.22-3.22a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5z"></path>
            </svg>
        </div>
        <div className="category-link-container">
            {data.map((c, i) => {
                return isCategoryView ? (
                    <span key={i}>
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={`/articles/category/${c.sub_cat}/${c.id}/`}
                        >
                            <span
                                style={{
                                    backgroundColor: c.color,
                                    borderBottom:
                                        '3px solid ' + c.color
                                }}
                                className="categories-link"
                            >
                                {c.sub_cat}
                            </span>
                        </Link>
                        {data.length - 1 !== i && ' '}
                    </span>
                ) : (
                    <span key={i}>
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={`/articles/source/${c.art_source}/${c.id}/`}
                        >
                            <span
                                style={{
                                    backgroundColor: c.color,
                                    borderBottom:
                                        '3px solid ' + c.color
                                }}
                                className="categories-link"
                            >
                                {c.art_source}
                            </span>
                        </Link>
                        {data.length - 1 !== i && ' '}
                    </span>
                )
            })}
        </div>
    </div>
)

export { CategoriesFromLocal }
