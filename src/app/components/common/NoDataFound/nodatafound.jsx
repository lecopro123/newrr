import nodata from '../../../assets/nodata.svg'
import './nodatafound.scss'

const NoDataFound = ({ props }) => {
    return (
        <div {...props} className="nodata-container">
            <img height="200px" src={nodata} alt="" />
            <p>Nothing yet, Coming Soon</p>
        </div>
    )
}
export default NoDataFound
