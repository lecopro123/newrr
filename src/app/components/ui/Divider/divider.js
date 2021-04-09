import './divider.scss'
export const Divider = ({ style = {}, ...rest }) => (
    <div style={{ ...style }} className="divider" {...rest}></div>
)

export default Divider
