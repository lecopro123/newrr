import { Link } from 'react-router-dom'
import { Layout } from '..'
import notfound from '../../../assets/notfound.png'

export default function NotFound(props) {
    return (
        <Layout categories={false}>
            <div className="App-main">
                <br />
                <br />
                <img src={notfound} height="200px" alt="" />
                <h1>404</h1>
                <p>
                    Oops! We could not find the page you are looking
                    for.
                </p>
                <br />
                <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to="/"
                >
                    <button className="btn">Back To Home</button>
                </Link>
                <br />
                <br />
            </div>
        </Layout>
    )
}
