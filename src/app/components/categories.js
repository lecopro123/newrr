import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getArticleCategories } from "../../redux/actions/articleActions";
import colors from "../assets/category-colors.json";

export default function Categories({ articles }) {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getArticleCategories());
    }, [dispatch]);
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
                        {categories.data.length - 1 !== i && " "}
                    </span>
                );
            })}
        </div>
    );
}
