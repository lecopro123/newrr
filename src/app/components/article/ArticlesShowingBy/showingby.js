import { Divider } from '../../ui'
import './showingby.scss'

export default function ShowingBy({
    title = '',
    showingby = '',
    icon,
    desc = ''
}) {
    return (
        <>
            <Divider />
            <div className="by">
                <div className="by-icon">
                    <img src={icon} alt="source-logo" />
                </div>
                <div className="by-text">
                    <div className="by-text-description">
                        You're&nbsp;viewing&nbsp;{showingby}
                    </div>
                    <div className="by-text-name">
                        <h1>{title}</h1>
                    </div>
                </div>
            </div>
            <Divider />
        </>
    )
}
