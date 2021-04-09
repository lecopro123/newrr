import Loader from '../Loader/loader'
import './button.scss'

const Button = ({
    className,
    children,
    loading = false,
    disabled = false,
    style = {},
    Component = 'button',
    onClick,
    ...rest
}) => (
    <Component
        onClick={onClick}
        disabled={disabled}
        style={{ ...style }}
        className={className ? className : 'btn-primary'}
        {...rest}
    >
        {loading ? <Loader /> : children}
    </Component>
)

export default Button
