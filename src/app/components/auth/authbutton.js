import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { userLogOutRequest } from '../../../redux/actions/userActions'

export default function AuthButton() {
    let history = useHistory()
    const auth = useSelector((state) => state.user)
    const dispatch = useDispatch()

    return auth.isLoggedIn ? (
        <div style={{ marginTop: '6px' }}>
            Welcome User!{' '}
            <span
                style={{
                    textDecoration: 'underline',
                    color: '#d97e79',
                    cursor: 'pointer'
                }}
                onClick={() => {
                    dispatch(
                        userLogOutRequest(() => history.push('/'))
                    )
                }}
            >
                Sign out
            </span>
        </div>
    ) : (
        <div style={{ marginTop: '6px' }}>
            You are not logged in.{' '}
            <Link style={{ color: '#d97e79' }} to="/login">
                Click to Sign In
            </Link>
        </div>
    )
}
