export default function Author({ hasAuthor = false, author = {} }) {
    return hasAuthor ? (
        <div className="author">
            <div className="author-avatar">
                <div>
                    <h1
                        style={{
                            color: '#fff'
                        }}
                    >
                        {getInitials(author.author_name)}
                    </h1>
                </div>
            </div>

            <div className="author-text">
                <div className="author-text-name">
                    <h1>{author.author_name}</h1>
                </div>
                <div
                    dangerouslySetInnerHTML={{
                        __html: author.author_desc
                    }}
                    className="author-text-description"
                ></div>
            </div>
        </div>
    ) : (
        <div className="author">
            <div className="author-avatar">
                <div>
                    <h1
                        style={{
                            color: '#fff'
                        }}
                    >
                        {getInitials('Lorem, ipsum.')}
                    </h1>
                </div>
            </div>

            <div className="author-text">
                <div className="author-text-name">
                    <h1>Lorem, ipsum.</h1>
                </div>
                <div className="author-text-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Itaque tenetur non, nam perferendis neque
                    repellendus.
                </div>
            </div>
        </div>
    )
}

const getInitials = (string) =>
    string
        .split(' ')
        .map(([firstLetter]) => firstLetter)
        .filter(
            (_, index, array) =>
                index === 0 || index === array.length - 1
        )
        .join('')
        .toUpperCase()
