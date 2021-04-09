import './loader.scss'

const Loader = ({ size = 'normal', style = {}, ...rest }) => (
    <div style={{ ...style }} className="loader" {...rest}></div>
)
export default Loader
