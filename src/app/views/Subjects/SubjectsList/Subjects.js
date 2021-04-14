import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllSubjects } from '../../../../redux/actions/subjectActions'
import { ClassNotesShowingBy } from '../../../components/classnotes'
import { Layout } from '../../../components/common'
import './Subjects.scss'

const Subjects = ({ props }) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const subjects = useSelector((state) => state.subjects)

    useEffect(() => {
        function initCallback() {
            console.log('SUBJECTS_LOAD')
            setIsLoading(false)
        }
        if (subjects.data.length) return setIsLoading(false)
        dispatch(getAllSubjects(initCallback, false))
    }, [dispatch, setIsLoading, subjects.data.length])

    return (
        <Layout loading={isLoading}>
            <ClassNotesShowingBy title="Subjects" />

            <div className="subjects-container">
                {!isLoading &&
                    subjects.data.map((subject) => (
                        <Link
                            style={{
                                textDecoration: 'none',
                                color: 'inherit'
                            }}
                            to={`/classnotes/${subject.subject_name}/${subject.id}/`}
                            key={subject.id}
                            className="subjectcard"
                        >
                            <div className="subjectcard-cover">
                                <img
                                    src={subject.subject_image}
                                    alt={subject.subject_name}
                                />
                            </div>
                            <div className="subjectcard-text">
                                <p>{subject.subject_name}</p>
                            </div>
                        </Link>
                    ))}
            </div>
        </Layout>
    )
}
export default Subjects
