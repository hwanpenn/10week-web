import {GET_SUCCESS_TkTask } from "actions/tablesTkTask";
import {CREATE_SUCCESS_TkTask } from "actions/tablesTkTask";
import {UPDATE_SUCCESS_TkTask } from "actions/tablesTkTask";
import {DELETE_SUCCESS_TkTask } from "actions/tablesTkTask";
import {GET_SUCCESS_TkTask_OTHER } from "actions/tablesTkTask";

const initState = {
    responseGetTkTask:'',
    responseCreateTkTask:'',
    responseUpdateTkTask:'',
    responseDeleteTkTask:'',
    responseOtherTkTask:'',
    tableDataTkTask:'',
    tableCountTkTask:'',
    tablesTkTask:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_TkTask_OTHER:
            const responseOtherTkTask = action.result.data.data;
            console.log(responseOtherTkTask)
            return {
                ...state,
                responseOtherTkTask:responseOtherTkTask,
            };
        case GET_SUCCESS_TkTask:
            const responseGetTkTask = action.result.data.data;
            return {
                ...state,
                tableDataTkTask:responseGetTkTask.rows,
                tableCountTkTask:responseGetTkTask.total,
                responseGetTkTask:responseGetTkTask
            };
        case CREATE_SUCCESS_TkTask:
            const responseCreateTkTask = action.result.data.data;
            return {
                ...state,
                responseCreateTkTask:responseCreateTkTask
            };
        case UPDATE_SUCCESS_TkTask:
            const responseUpdateTkTask = action.result.data.data;
            return {
                ...state,
                responseUpdateTkTask:responseUpdateTkTask
            };
        case DELETE_SUCCESS_TkTask:
            const responseDeleteTkTask = action.result.data.data;
            return {
                ...state,
                responseDeleteTkTask:responseDeleteTkTask
            };
        default:
            return state
    }
}
