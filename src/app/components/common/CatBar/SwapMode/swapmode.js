import { Swap } from '../../../icons'
import './swapmode.scss'

const SwapMode = ({ toggleView, isCategoryView }) => {
    return (
        <div className="btn">
            <span>{!isCategoryView ? 'Categories' : 'Sources'}</span>

            <i onClick={toggleView} className="ico btn-circle">
                <Swap />
            </i>
        </div>
    )
}
export default SwapMode
