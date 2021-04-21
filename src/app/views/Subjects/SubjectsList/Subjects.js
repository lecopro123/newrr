import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllSubjects } from '../../../../redux/actions/subjectActions'
import { ClassNotesShowingBy } from '../../../components/classnotes'
import { Layout } from '../../../components/common'
import search from '../../../../app/assets/search.svg'
import Jump from 'react-reveal/Jump';
import './Subjects.scss';
//import './ser.scss'


const Subjects = ({ props }) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [Fil, setFil] = useState('')
    const [el, setel] = useState('')
    const subjects = useSelector((state) => state.subjects)

    const click = () => {
        setel(Fil)
    }

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
            <div className="ser">
                <input className="Sbar" placeholder="Serch Subjects" onChange={(e) => setFil(e.target.value)} />
                <img onClick={click} className="Sbut" src={search} alt="n" />
            </div>
            <div className="pad"></div>
            <div className="subjects-container">
                {!isLoading && subjects.data.filter((sub) => sub.subject_name.toLowerCase() === el.toLowerCase()).length !== 0 ?
                    (subjects.data.filter((sub) => sub.subject_name.toLowerCase() === el.toLowerCase()).map((subject) => (

                        <Link
                            style={{
                                textDecoration: 'none',
                                color: 'inherit'
                            }}
                            to={`/classnotes/${subject.subject_name}/${subject.id}/`}
                            key={subject.id}
                            className="subjectcard"
                        >
                            <Jump>
                                <div className="subjectcard-cover">
                                    <img
                                        src={subject.subject_image}
                                        alt={subject.subject_name}
                                    />
                                </div>
                                <div className="subjectcard-text">
                                    <p>{subject.subject_name}</p>
                                </div>
                            </Jump>
                        </Link>

                    )))
                    :
                    (subjects.data.map((subject) => (
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
                    )))
                }
            </div>
            <div className="pad"></div>
        </Layout>
    )
}
export default Subjects
