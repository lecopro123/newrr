import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import colors from '../assets/category-colors.json'

export default function Categories({ articles }) {
    const categories = useSelector((state) => state.categories)

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
