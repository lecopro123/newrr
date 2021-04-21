import { TEMP_BASE_URI } from '../../api/base'
import fetchEndpoints from '../../api/fetchEndpoints'
import * as types from '../types'

export const getAllInstitutions = (cb) => (dispatch) =>
    fetchEndpoints(`/institutions`, {}, TEMP_BASE_URI).then((res) => {
        dispatch({
            type: types.GOT_ALL_INSTITUTES,
            data: res,
            error: 0
        })

        cb()
    })

export const instiLoginRequest = (
    cb,
    options = {
        institute_id: 0,
        student_unique_id: 0,
        student_user_id: 0,
        status: 'unknown',
        unique_id: 0
    }
) => (dispatch) =>
        fetchEndpoints(
            `/map-student?institute_id=${options.institute_id}&student_unique_id=${options.student_unique_id}&student_user_id=${options.student_user_id}`,
            { method: 'POST' },
            TEMP_BASE_URI
        ).then((res) => {
            if (res.status === 'approved') {
                dispatch({
                    type: types.INSTITUTE_LOGIN_SUCCESS,
                    student: {
                        ...options,
                        status: res.status,
                        unique_id: res.unique_id
                    }
                })
                localStorage.setItem(
                    'student_info',
                    JSON.stringify({
                        ...options,
                        status: res.status,
                        unique_id: res.unique_id
                    })
                )
                cb(true)
            } else {
                dispatch({ type: types.INSTITUTE_LOGIN_FAILURE })
                cb(false, 'Something Went Wrong, try again!')
            }
        })
