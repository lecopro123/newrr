import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import {
    getAllInstitutions,
    instiLoginRequest
} from '../../../../redux/actions/instiActions'
import { Layout } from '../../../components/common'
import { Button, InputField } from '../../../components/ui'
import './InstiLogin.scss'

const InstiLogin = ({ props }) => {
    let dispatch = useDispatch()
    let history = useHistory()
    let location = useLocation()
    let { from } = location.state || { from: { pathname: '/' } }
    const [formData, setFormData] = useState({
        institute_id: 0,
        student_unique_id: 0
    })
    let instis = useSelector((state) => state.institutions)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        function cb() {
            console.log('INSTI_SUCCESS')
        }
        if (instis.data.length) return
        dispatch(getAllInstitutions(cb))
    }, [dispatch, instis.data.length])

    function cbInsti(success, msg) {
        if (success) {
            console.log('done')
            setTimeout(() => {
                history.replace(from)
            }, 100)
        } else {
            console.log(msg)
        }

        setIsLoading(false)
    }

    function submitForm(e) {
        e.preventDefault()
        setIsLoading(true)
        console.log(formData)
        dispatch(
            instiLoginRequest(cbInsti, {
                ...formData,
                student_user_id: 1
            })
        )
    }
    return (
        <Layout loading={isLoading}>
            {!isLoading && (
                <form
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                    onSubmit={submitForm}
                >
                    <h2
                        style={{
                            color: 'var(--color-text-heading)',
                            margin: '0 0 0.25em'
                        }}
                    >
                        Enter the details to view classnotes
                    </h2>
                    <div className="select">
                        <select
                            defaultValue={0}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    institute_id: e.target.value
                                })
                            }
                            name="slct"
                            id="slct"
                        >
                            <option value={0} disabled>
                                Select Institution:
                            </option>
                            {instis.data.map((insti) => (
                                <option
                                    key={insti.id}
                                    value={insti.id}
                                >
                                    {insti.institute_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <InputField
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                student_unique_id: e.target.value
                            })
                        }
                        placeholder="Enter Student Unique Id"
                        style={{
                            width: '700px',
                            maxWidth: '95vw',
                            borderRadius: '0.25em',
                            background: 'var(--root-bg)'
                        }}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            )}
        </Layout>
    )
}
export default InstiLogin
