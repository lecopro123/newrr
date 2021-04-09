import { Divider } from '../../ui'
import './author.scss'

export default function Author({ author }) {
    return (
        <>
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
                            __html: author.author_desc || '__'
                        }}
                        className="author-text-description"
                    ></div>
                </div>
            </div>
            <Divider />
        </>
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
