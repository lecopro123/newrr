import { Link } from 'react-router-dom'
import { Layout } from '..'
import notfound from '../../../assets/notfound.png'
import { Button } from '../../ui'

export default function NotFound(props) {
    return (
        <Layout categories={false}>
            <img src={notfound} height="200px" alt="" />
            <h1>404</h1>
            <p style={{ padding: '12px 0' }}>
                Oops! We could not find the page you are looking for.
            </p>

            <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to="/"
            >
                <Button>Back To Home</Button>
            </Link>
        </Layout>
    )
}
