import {GET_SUCCESS_TkVipData } from "actions/tablesTkVipData";
import {CREATE_SUCCESS_TkVipData } from "actions/tablesTkVipData";
import {UPDATE_SUCCESS_TkVipData } from "actions/tablesTkVipData";
import {DELETE_SUCCESS_TkVipData } from "actions/tablesTkVipData";
import {GET_SUCCESS_TkVipData_OTHER } from "actions/tablesTkVipData";

const initState = {
    responseGetTkVipData:'',
    responseCreateTkVipData:'',
    responseUpdateTkVipData:'',
    responseDeleteTkVipData:'',
    responseOtherTkVipData:'',
    tableDataTkVipData:'',
    tableCountTkVipData:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_TkVipData_OTHER:
            const responseOtherTkVipData = action.result.data.data;
            return {
                ...state,
                responseOtherTkVipData:responseOtherTkVipData,
            };
        case GET_SUCCESS_TkVipData:
            const responseGetTkVipData = action.result.data.data;
            // console.log(responseGetTkVipData.data)
            // console.log(action.result)
            return {
                ...state,
                tableDataTkVipData:responseGetTkVipData.rows,
                tableCountTkVipData:responseGetTkVipData.total,
                responseGetTkVipData:responseGetTkVipData
            };
        case CREATE_SUCCESS_TkVipData:
            const responseCreateTkVipData = action.result.data.data;
            return {
                ...state,
                responseCreateTkVipData:responseCreateTkVipData
            };
        case UPDATE_SUCCESS_TkVipData:
            const responseUpdateTkVipData = action.result.data.data;
            return {
                ...state,
                responseUpdateTkVipData:responseUpdateTkVipData
            };
        case DELETE_SUCCESS_TkVipData:
            const responseDeleteTkVipData = action.result.data.data;
            return {
                ...state,
                responseDeleteTkVipData:responseDeleteTkVipData
            };
        default:
            return state
    }
}
