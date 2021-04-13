import { TEMP_BASE_URI } from '../../api/base'
import fetchEndpoints from '../../api/fetchEndpoints'
import subjects from '../../app/assets/subjects.json'
import * as types from '../types'

export const getAllSubjects = (cb, useLocal = false) => (
    dispatch
) => {
    if (useLocal) {
        dispatch({
            type: types.GOT_ALL_SUBJECTS,
            data: subjects,
            error: 0
        })
        cb()
    } else
        fetchEndpoints(`/subjects`, {}, TEMP_BASE_URI).then((res) => {
            dispatch({
                type: types.GOT_ALL_SUBJECTS,
                data: res,
                error: 0
            })

            cb()
        })
}

export const getSubjectContent = (
    cb,
    subject = { name: '', id: '' }
) => (dispatch) =>
    fetchEndpoints(
        `/contents?subject_id=${subject.id}`,
        {},
        TEMP_BASE_URI
    ).then((res) => {
        dispatch({
            type: types.GOT_SUBJECT_CONTENTS,
            subject: subject,
            data: res,
            error: 0
        })
        cb()
    })
