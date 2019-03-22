import {GET_SUCCESS_TkArea } from "actions/tablesTkArea";
import {CREATE_SUCCESS_TkArea } from "actions/tablesTkArea";
import {UPDATE_SUCCESS_TkArea } from "actions/tablesTkArea";
import {DELETE_SUCCESS_TkArea } from "actions/tablesTkArea";
import {GET_SUCCESS_TkArea_OTHER } from "actions/tablesTkArea";

const initState = {
    responseGetTkArea:'',
    responseCreateTkArea:'',
    responseUpdateTkArea:'',
    responseDeleteTkArea:'',
    responseOtherTkArea:'',
    tableDataTkArea:'',
    tableCountTkArea:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_TkArea_OTHER:
            const responseOtherTkArea = action.result.data.data;
            return {
                ...state,
                responseOtherTkArea:responseOtherTkArea,
            };
        case GET_SUCCESS_TkArea:
            const responseGetTkArea = action.result.data.data;
            // console.log('responseGetTkArea.rows')
            // console.log(action.result)
            return {
                ...state,
                tableDataTkArea:responseGetTkArea.rows,
                tableCountTkArea:responseGetTkArea.total,
                responseGetTkArea:responseGetTkArea
            };
        case CREATE_SUCCESS_TkArea:
            const responseCreateTkArea = action.result.data.data;
            return {
                ...state,
                responseCreateTkArea:responseCreateTkArea
            };
        case UPDATE_SUCCESS_TkArea:
            const responseUpdateTkArea = action.result.data.data;
            return {
                ...state,
                responseUpdateTkArea:responseUpdateTkArea
            };
        case DELETE_SUCCESS_TkArea:
            const responseDeleteTkArea = action.result.data.data;
            return {
                ...state,
                responseDeleteTkArea:responseDeleteTkArea
            };
        default:
            return state
    }
}
