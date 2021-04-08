export default function ShowingBy({ title = '', icon, desc = '' }) {
    return (
        <>
            <div className="divider"></div>

            <div className="bysource">
                <div className="bysource-icon">
                    <img src={icon} alt="source-logo" />
                </div>
                <div className="bysource-text">
                    <div className="author-text-description">
                        Lorem ipsum dolor sit amet consectetur
                        adipisicing elit.
                    </div>
                    <div className="bysource-text-name">
                        <h1>{title}</h1>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
        </>
    )
}
