import { Divider } from '../../ui'
import './classnotesshowingby.scss'

export default function ShowingBy({
    title = '',
    showingby = '',
    icon,
    desc = ''
}) {
    return (
        <>
            <Divider />
            <div className="classnotes-by-text">
                <div className="classnotes-by-text-description">
                    You're viewing {showingby}
                </div>
                <div className="classnotes-by-text-name">
                    <h1>{title}</h1>
                </div>
            </div>
            <Divider />
        </>
    )
}
