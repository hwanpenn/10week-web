import {GET_SUCCESS_TkPush } from "actions/tablesTkPush";
import {CREATE_SUCCESS_TkPush } from "actions/tablesTkPush";
import {UPDATE_SUCCESS_TkPush } from "actions/tablesTkPush";
import {DELETE_SUCCESS_TkPush } from "actions/tablesTkPush";
import {GET_SUCCESS_TkPush_OTHER } from "actions/tablesTkPush";

const initState = {
    responseGetTkPush:'',
    responseCreateTkPush:'',
    responseUpdateTkPush:'',
    responseDeleteTkPush:'',
    responseOtherTkPush:'',
    tableDataTkPush:'',
    tableCountTkPush:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_TkPush_OTHER:
            const responseOtherTkPush = action.result.data.data;
            return {
                ...state,
                responseOtherTkPush:responseOtherTkPush,
            };
        case GET_SUCCESS_TkPush:
            const responseGetTkPush = action.result.data.data;
            // console.log('responseGetTkPush.rows')
            // console.log(action.result)
            return {
                ...state,
                tableDataTkPush:responseGetTkPush.rows,
                tableCountTkPush:responseGetTkPush.total,
                responseGetTkPush:responseGetTkPush
            };
        case CREATE_SUCCESS_TkPush:
            const responseCreateTkPush = action.result.data.data;
            return {
                ...state,
                responseCreateTkPush:responseCreateTkPush
            };
        case UPDATE_SUCCESS_TkPush:
            const responseUpdateTkPush = action.result.data.data;
            return {
                ...state,
                responseUpdateTkPush:responseUpdateTkPush
            };
        case DELETE_SUCCESS_TkPush:
            const responseDeleteTkPush = action.result.data.data;
            return {
                ...state,
                responseDeleteTkPush:responseDeleteTkPush
            };
        default:
            return state
    }
}
