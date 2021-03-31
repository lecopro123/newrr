import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getArticleCategories,
    getReadArticles
} from "../../../redux/actions/articleActions";
import chevronUp from "../../assets/up-chevron.svg";
import "./Root.scss";

export default function Root(props) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [moreLoading, setmoreLoading] = useState(false);
    const topRef = useRef(null);
    const articles = useSelector((state) => state.articles);

    function callback() {
        setmoreLoading(false);
        console.log("VIEW_MORE_SUCCESS");
    }

    const handleViewMore = () => {
        setmoreLoading(true);
        dispatch(
            getReadArticles(callback, { page: articles.page + 1 })
        );
    };

    useEffect(() => {
        function initCallback() {
            console.log("INITIAL_LOAD");
            setIsLoading(false);
        }
        dispatch(getArticleCategories());
        dispatch(getReadArticles(initCallback));
    }, [dispatch, setIsLoading]);

    return (
        <div className="App">
            <div ref={topRef} />
            <div className="App-Categories">
                {articles.categories.data.map((c, i) => {
                    return (
                        <span key={i}>
                            <span className="link">{c.sub_cat}</span>
                            {articles.categories.data.length - 1 !==
                                i && " | "}
                        </span>
                    );
                })}
            </div>
            <div className="App-main">
                {isLoading ? (
                    <div className="loader"></div>
                ) : (
                    articles.data.map((article) => {
                        return (
                            <div className="article" key={article.id}>
                                <div className="cover-container">
                                    <img
                                        className="article-cover"
                                        src={
                                            "https://www.readingright.in/" +
                                            article.art_image
                                        }
                                        alt={article.id}
                                    />
                                    <div className="article-likes">
                                        👑 {article.art_status}
                                    </div>
                                    <div className="article-covertext">
                                        {article.art_head}
                                    </div>
                                </div>
                                <div className="article-meta">
                                    <div className="article-source">
                                        📰 {article.source.name} |{" "}
                                        {Math.round(
                                            (new Date() -
                                                new Date(
                                                    article.art_pub_dt
                                                )) /
                                                (1000 *
                                                    60 *
                                                    60 *
                                                    24 *
                                                    7)
                                        )}{" "}
                                        Weeks
                                    </div>
                                    <div className="article-reduced">
                                        <div>
                                            {article.art_data
                                                .replace(
                                                    /(<([^>]+)>)/gi,
                                                    ""
                                                )
                                                .replace(
                                                    /&nbsp;|&rsquo;|❓|💡|🔗/gi,
                                                    ""
                                                )}
                                        </div>
                                    </div>
                                    <div className="article-tag">
                                        <span>
                                            {article.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {!isLoading && articles.page + 1 <= articles.page_total && (
                <div
                    onClick={handleViewMore}
                    className="btn-container"
                >
                    <div className="more-btn">
                        {moreLoading ? (
                            <div className="loader-small"></div>
                        ) : (
                            "View More"
                        )}
                    </div>
                </div>
            )}
            <div className="App-footer">
                <div
                    className="top-btn"
                    onClick={() =>
                        topRef.current.scrollIntoView({
                            behavior: "smooth",
                            block: "end",
                            inline: "nearest"
                        })
                    }
                >
                    <img src={chevronUp} alt="^"></img>
                </div>
                <p>
                    Ⓒ 2020 - 2021 Reading Right. All rights reserved.
                </p>
            </div>
        </div>
    );
}
