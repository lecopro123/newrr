import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, Route, useHistory } from 'react-router-dom'
import { userLogOutRequest } from '../../redux/actions/userActions'
import RouterConfig from '../routerConfig'

export default function AuthExample() {
    return <RouterConfig />
}

export function AuthButton() {
    let history = useHistory()
    const auth = useSelector((state) => state.user)
    const dispatch = useDispatch()

    return auth.isLoggedIn ? (
        <div>
            Welcome Guest!{' '}
            <span
                style={{
                    textDecoration: 'underline',
                    color: 'darkblue',
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
        <div>
            You are not logged in. <Link to="/login">Sign In</Link>
        </div>
    )
}

export function PrivateRoute({ children, ...rest }) {
    const auth = useSelector((state) => state.user)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.isLoggedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}
