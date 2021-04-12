import { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import './searchoverlay.scss'

const SearchOverlay = ({ searchRef }) => {
    const [text, setText] = useState('')
    const searchInputRef = useRef(null)

    let history = useHistory()
    function submit() {
        if (!text) return
        history.push('/articles/search?q=' + text)
        searchRef.current.classList.toggle('is-open')
    }

    const esc = useCallback(
        (event) => {
            if (event.keyCode === 27) {
                searchRef.current.classList.toggle('is-open')
            }
        },
        [searchRef]
    )

    useEffect(() => {
        document.addEventListener('keydown', esc, false)

        return () => {
            document.removeEventListener('keydown', esc, false)
        }
    }, [esc])

    useEffect(() => {
        searchInputRef.current.focus()
    }, [])

    return (
        <div ref={searchRef} className="bg-search">
            <div
                className="close-search-ui"
                onClick={() =>
                    searchRef.current.classList.toggle('is-open')
                }
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.72 5.72a.75.75 0 011.06 0L12 10.94l5.22-5.22a.75.75 0 111.06 1.06L13.06 12l5.22 5.22a.75.75 0 11-1.06 1.06L12 13.06l-5.22 5.22a.75.75 0 01-1.06-1.06L10.94 12 5.72 6.78a.75.75 0 010-1.06z"
                    ></path>
                </svg>
            </div>
            <div className="center-group">
                <div className="search-title-text">
                    Press Esc to Close
                </div>
                <div className="search-input-wrapper">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            submit()
                        }}
                    >
                        <input
                            ref={searchInputRef}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type to start your search…"
                            className="search-bar"
                        />
                    </form>
                    <div
                        onClick={submit}
                        className="search-input-icon"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M14.53 15.59a8.25 8.25 0 111.06-1.06l5.69 5.69a.75.75 0 11-1.06 1.06l-5.69-5.69zM2.5 9.25a6.75 6.75 0 1111.74 4.547.746.746 0 00-.443.442A6.75 6.75 0 012.5 9.25z"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchOverlay
