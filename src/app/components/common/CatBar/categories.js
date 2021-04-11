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

const CategoriesFromLocal = ({ categories = [] }) => (
    <div className="categories">
        {categories.map((c, i) => {
            return (
                <span key={i}>
                    <Link
                        to={`/articles/category/${c.sub_cat}/${c.id}/`}
                    >
                        <span
                            style={{
                                backgroundColor: c.color
                            }}
                            className="categories-link"
                        >
                            {c.sub_cat}
                        </span>
                    </Link>
                    {categories.length - 1 !== i && ' '}
                </span>
            )
        })}
    </div>
)

export { CategoriesFromLocal }