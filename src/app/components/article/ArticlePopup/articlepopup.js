import chevron from '../../../assets/chevron-up.svg'
import x from '../../../assets/x.svg'
import './articlepopup.scss'

const ArticlePopup = ({ popRef, handlePopUp, popupdata }) => {
    const renderData = (uri) => {
        try {
            var a = decodeURIComponent(uri)
            return a
        } catch (e) {
            return uri.replace(/%[0-9|A-Z|a-z]{2}/gi, ' ')
        }
    }
    return (
        <div ref={popRef} className="popup">
            <div onClick={handlePopUp} className="close-btn">
                <img src={x} alt="x" />
            </div>
            <div
                onClick={() =>
                    popRef.current.classList.toggle('expanded')
                }
                className="expand-btn"
            >
                <img src={chevron} alt="^" />
            </div>
            <div className="wrapper">
                <div className="title">
                    <h2>
                        {popupdata.title}&nbsp;
                        <span style={{ fontSize: '16px' }}>
                            {popupdata.type}
                        </span>
                    </h2>
                </div>
                <div
                    onClick={() =>
                        popRef.current.classList.toggle('expanded')
                    }
                    className="meaning"
                >
                    {renderData(popupdata.meaning)}
                </div>
            </div>
        </div>
    )
}
export default ArticlePopup
