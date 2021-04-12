import { TEMP_BASE_URI } from '../../api/base'
import * as endpoint from '../../api/endpoints'
import fetchEndpoints from '../../api/fetchEndpoints'
import subjects from '../../app/assets/subjects.json'
import * as types from '../types'

export const getAllSubjects = (local = false) => (dispatch) =>
    !local
        ? fetchEndpoints(
              `${endpoint.ARTICLE_CATEGORIES}?format=json`,
              {},
              TEMP_BASE_URI
          ).then((res) => {
              dispatch({
                  type: types.GOT_ALL_SUBJECTS,
                  data: res,
                  error: 0
              })
          })
        : dispatch({
              type: types.GOT_ALL_SUBJECTS,
              data: subjects,
              error: 0
          })

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
