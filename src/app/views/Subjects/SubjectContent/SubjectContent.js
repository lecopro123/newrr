import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getSubjectContent } from '../../../../redux/actions/subjectActions'
import { ClassNotesShowingBy } from '../../../components/classnotes'
import {
    DataPopup,
    Layout,
    NoDataFound
} from '../../../components/common'
import { ChevronUp } from '../../../components/icons'
import './SubjectContent.scss'

const SubjectContent = ({ props }) => {
    let { subject, id } = useParams()
    const dispatch = useDispatch()
    const subjectdata = useSelector((state) => state.subjectcontent)

    let popupTint = useRef(null)
    const popRef = useRef(null)
    const [isLoading, setIsLoading] = useState(true)
    const [contentHTML, setContentHTML] = useState('')
    const [contentVisible, setContentVisible] = useState(false)
    const [chapterTitle, setChapterTitle] = useState('')
    const [popupdata, setPopupData] = useState({
        type: '',
        title: '',
        comment: '',
        commentStatus: '',
        image: '',
        meaning: '',
        videoLinks: ''
    })

    useEffect(() => {
        setIsLoading(true)
        function initCallback() {
            console.log('FETCHED_Subject')
            setIsLoading(false)
        }
        dispatch(
            getSubjectContent(initCallback, { name: subject, id })
        )
    }, [dispatch, setIsLoading, id, subject])

    function index(str) {
        let x = document.createElement('div')
        x.innerHTML = str
        let btns = x.getElementsByTagName('button')
        let bcount = 0
        let qcount = 0

        for (let i = 0; i < btns.length; i++) {
            if (btns[i].dataset.title === 'Extra Facts') {
                bcount++
                btns[i].append(`<sup>${bcount}</sup>`)
            } else if (btns[i].dataset.title === 'Explanation') {
                qcount++
                btns[i].append(`<sup>${qcount}</sup>`)
            }
        }
        setContentHTML(x)
        setContentVisible(true)
    }

    const handleChapterLoad = (i) => {
        index(subjectdata.data[i].content_data)
        setChapterTitle(subjectdata.data[i].content_title)
    }

    const handlePopUp = ({ target }) => {
        let hasData = populatePopup(target)
        if (popRef.current.classList.contains('open')) {
            if (!hasData) {
                popRef.current.classList.toggle('open')
                popupTint.current.classList.toggle('visible')
            }
        } else {
            if (hasData) {
                if (popRef.current.classList.contains('expanded')) {
                    popRef.current.classList.toggle('expanded')
                }
                popRef.current.classList.toggle('open')
                popupTint.current.classList.toggle('visible')
            }
        }
    }

    const populatePopup = (target) => {
        if (!target.dataset.meaning) return false
        setPopupData({
            type: target.dataset.title
                ? `${target.dataset.title}`
                : '',
            title:
                target.type === 'button'
                    ? (target.dataset.line &&
                          unescape(target.dataset.line)) ||
                      target.dataset.title + target.innerHTML ||
                      `${target.textContent} Explanation`
                    : target.textContent,
            meaning: target.dataset.meaning || '',
            comment: target.dataset.comment || '',
            commentStatus: target.dataset.commentStatus || '',
            image: target.dataset.image || '',
            videoLinks: target.dataset.videoLinks || ''
        })

        return true
    }

    return (
        <Layout loading={isLoading}>
            <ClassNotesShowingBy
                showingby={contentVisible ? subject : 'subject'}
                title={contentVisible ? chapterTitle : subject}
            />
            {contentVisible && (
                <div className="subject-content-page">
                    <div
                        onClick={handlePopUp}
                        className="article-content chapter-content"
                        dangerouslySetInnerHTML={{
                            __html: decodeHTMLEntities(
                                contentHTML.innerHTML
                                    .replaceAll(
                                        'color: red;',
                                        'color: #D97E79;'
                                    )
                                    .replaceAll(
                                        'color: blue;',
                                        'color: #3195f2;'
                                    )
                            )
                        }}
                    ></div>
                </div>
            )}
            <div
                // ref={navChapterRef}
                className="chapter-list-container"
            >
                {!isLoading &&
                    (subjectdata.data.length ? (
                        subjectdata.data.map((s, i) => (
                            <div
                                onClick={() => handleChapterLoad(i)}
                                key={s.id}
                                className="chapter-list-item"
                            >
                                <div className="chapter-list-item-title">
                                    {s.content_title}
                                </div>
                                <div style={{ flexGrow: 1 }}></div>
                                <div className="chapter-list-item-icon">
                                    <ChevronUp
                                        style={{
                                            fill:
                                                'var(--primary-icon)',
                                            transform: 'rotate(90deg)'
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <NoDataFound />
                    ))}
            </div>

            <DataPopup
                popupTint={popupTint}
                popRef={popRef}
                handlePopUp={handlePopUp}
                popupdata={popupdata}
            />
        </Layout>
    )
}
export default SubjectContent

function decodeHTMLEntities(text) {
    var textArea = document.createElement('textarea')
    textArea.innerHTML = text
    return textArea.value
}
