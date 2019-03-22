import {GET_SUCCESS_TkBaseData } from "actions/tablesTkBaseData";
import {CREATE_SUCCESS_TkBaseData } from "actions/tablesTkBaseData";
import {UPDATE_SUCCESS_TkBaseData } from "actions/tablesTkBaseData";
import {DELETE_SUCCESS_TkBaseData } from "actions/tablesTkBaseData";
import {GET_SUCCESS_TkBaseData_OTHER } from "actions/tablesTkBaseData";

const initState = {
    responseGetTkBaseData:'',
    responseCreateTkBaseData:'',
    responseUpdateTkBaseData:'',
    responseDeleteTkBaseData:'',
    responseOtherTkBaseData:'',
    tableDataTkBaseData:'',
    tableCountTkBaseData:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_TkBaseData_OTHER:
            const responseOtherTkBaseData = action.result.data.data;
            return {
                ...state,
                responseOtherTkBaseData:responseOtherTkBaseData,
            };
        case GET_SUCCESS_TkBaseData:
            const responseGetTkBaseData = action.result.data.data;
            // console.log(responseGetTkBaseData.data)
            // console.log(action.result)
            return {
                ...state,
                tableDataTkBaseData:responseGetTkBaseData.rows,
                tableCountTkBaseData:responseGetTkBaseData.total,
                responseGetTkBaseData:responseGetTkBaseData
            };
        case CREATE_SUCCESS_TkBaseData:
            const responseCreateTkBaseData = action.result.data.data;
            return {
                ...state,
                responseCreateTkBaseData:responseCreateTkBaseData
            };
        case UPDATE_SUCCESS_TkBaseData:
            const responseUpdateTkBaseData = action.result.data.data;
            return {
                ...state,
                responseUpdateTkBaseData:responseUpdateTkBaseData
            };
        case DELETE_SUCCESS_TkBaseData:
            const responseDeleteTkBaseData = action.result.data.data;
            return {
                ...state,
                responseDeleteTkBaseData:responseDeleteTkBaseData
            };
        default:
            return state
    }
}
