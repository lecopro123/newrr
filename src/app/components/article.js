export default function Article({ article }) {
    return (
        <div className="article">
            <div className="cover-container">
                <img
                    className="article-cover"
                    src={
                        'https://www.readingright.in/' +
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
                    📰 {article.source.name} |{' '}
                    {Math.round(
                        (new Date() - new Date(article.art_pub_dt)) /
                            (1000 * 60 * 60 * 24 * 7)
                    )}{' '}
                    Weeks
                </div>
                <div className="article-reduced">
                    <div>
                        {article.art_data
                            .replace(/(<([^>]+)>)/gi, '')
                            .replace(/&nbsp;|&rsquo;|❓|💡|🔗/gi, '')}
                    </div>
                </div>
                <div className="article-tag">
                    <span>🔖 {article.category}</span>
                </div>
            </div>
        </div>
    )
}
