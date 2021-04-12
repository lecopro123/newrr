import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getSubjectContent } from '../../../../redux/actions/subjectActions'
import nodata from '../../../assets/nodata.svg'
import { ArticlePopup } from '../../../components/article'
import { ClassNotesShowingBy } from '../../../components/classnotes'
import { Layout } from '../../../components/common'
import { ChevronUp } from '../../../components/icons'
import './SubjectContent.scss'

const SubjectContent = ({ props }) => {
    let { subject, id } = useParams()
    const subjectdata = useSelector((state) => state.subjectcontent)
    const [isLoading, setIsLoading] = useState(true)
    let [contentHTML, setContentHTML] = useState('')
    const [contentVisible, setContentVisible] = useState(false)

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

    const dispatch = useDispatch()

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

    const handleChapterLoad = (i) => {
        index(subjectdata.data[i].content_data)
        // navChapterRef.current.style.display = 'none'
    }

    const [popupdata, setPopupData] = useState({
        type: '',
        title: '',
        comment: '',
        commentStatus: '',
        image: '',
        meaning: '',
        videoLinks: ''
    })
    const popRef = useRef(null)
    // const navChapterRef = useRef(null)

    const handlePopUp = ({ target }) => {
        let hasData = populatePopup(target)
        console.log(target)
        if (popRef.current.classList.contains('open')) {
            if (!hasData) {
                popRef.current.classList.toggle('open')
            }
        } else {
            if (hasData) {
                if (popRef.current.classList.contains('expanded')) {
                    popRef.current.classList.toggle('expanded')
                }
                popRef.current.classList.toggle('open')
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
                showingby="subject"
                title={subject}
            />
            {contentVisible && (
                <div className="subject-content-page">
                    <div
                        onClick={handlePopUp}
                        className="article-content chapter-content"
                        dangerouslySetInnerHTML={{
                            __html: decodeHTMLEntities(
                                contentHTML.innerHTML
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
                                            transform: 'rotate(90deg)'
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <img height="200px" src={nodata} alt="" />
                            <p style={{ padding: '12px 0' }}>
                                Nothing yet, Coming Soon
                            </p>
                        </div>
                    ))}
            </div>

            <ArticlePopup
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
