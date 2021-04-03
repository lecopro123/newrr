import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getArticleCategories } from '../../redux/actions/articleActions'
import colors from '../assets/category-colors.json'

export default function Categories() {
    const categories = useSelector((state) => state.categories)
    let dispatch = useDispatch()

    useEffect(() => {
        if (!categories.data.length) {
            dispatch(getArticleCategories())
        } else return
    }, [dispatch, categories.data.length])

    return (
        <div className="App-Categories">
            {categories.data.map((c, i) => {
                return (
                    <span key={i}>
                        <Link to={`/category/${c.sub_cat}/${c.id}/`}>
                            <span
                                style={{
                                    backgroundColor: colors[i].color
                                }}
                                className="link"
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
