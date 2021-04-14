import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getArticleCategories } from '../../../../redux/actions/articleActions'
import colors from '../../../assets/category-colors.json'
import { Swap } from '../../icons'
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
            <Swap style={{ fill: isCategoryView ? '' : '#fff' }} />
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
