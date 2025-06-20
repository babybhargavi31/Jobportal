import API from "../../axiosConfig"; 

import { toast } from 'react-toastify';
import { JOB_TYPE_LOAD_FAIL, JOB_TYPE_LOAD_REQUEST, JOB_TYPE_LOAD_SUCCESS } from '../constants/jobTypeConstant';

import { CREATE_JOB_TYPE_FAIL, CREATE_JOB_TYPE_REQUEST, CREATE_JOB_TYPE_SUCCESS } from '../constants/jobTypeConstant';


export const jobTypeLoadAction = () => async (dispatch) => {
    dispatch({ type: JOB_TYPE_LOAD_REQUEST });
    try {
        const { data } = await API.get('/api/type/jobs');
        dispatch({
            type: JOB_TYPE_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        const message = error.response?.data?.error || error.message || "Something went wrong";
        dispatch({
            type: JOB_TYPE_LOAD_FAIL,
            payload: message
        });
        toast.error(message);
    }
}

// create jobs category
export const createJobTypeAction = (jobtype) => async (dispatch) => {
    dispatch({ type: CREATE_JOB_TYPE_REQUEST })

    try {
        const { data } = await API.post("/api/type/create", jobtype)
        dispatch({
            type: CREATE_JOB_TYPE_SUCCESS,
            payload: data
        });
        toast.success("Job type created successfully");

    } catch (error) {
        const message = error.response?.data?.error || error.message || "Something went wrong";
        dispatch({
            type: CREATE_JOB_TYPE_FAIL,
            payload: message
        });
        toast.error(message);
    }
}
