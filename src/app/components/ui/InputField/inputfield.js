import './inputfield.scss'

const InputField = ({
    type = 'text',
    placeholder = '',
    className,
    disabled = false,
    ...rest
}) => (
    <input
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        className={className ? className : 'input'}
        {...rest}
    />
)

export default InputField
