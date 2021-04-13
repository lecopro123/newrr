import { Link } from 'react-router-dom'
import { getInitials } from '../../../utils/getInitials'
import { Button, Divider } from '../../ui'
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
                            __html: author.author_desc
                        }}
                        className="author-text-description"
                    ></div>

                    <Button
                        Component={Link}
                        to={`/articles/author/${author.author_name}/${author.author_id}/`}
                        className="author-text-articles btn-primary"
                    >
                        View all articles
                    </Button>
                </div>
            </div>
            <Divider />
        </>
    )
}
