import {GET_SUCCESS_TkVip } from "actions/tablesTkVip";
import {CREATE_SUCCESS_TkVip } from "actions/tablesTkVip";
import {UPDATE_SUCCESS_TkVip } from "actions/tablesTkVip";
import {DELETE_SUCCESS_TkVip } from "actions/tablesTkVip";
import {GET_SUCCESS_TkVip_OTHER } from "actions/tablesTkVip";

const initState = {
    responseGetTkVip:'',
    responseCreateTkVip:'',
    responseUpdateTkVip:'',
    responseDeleteTkVip:'',
    responseOtherTkVip:'',
    tableDataTkVip:'',
    tableCountTkVip:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_TkVip_OTHER:
            const responseOtherTkVip = action.result.data.data;
            return {
                ...state,
                responseOtherTkVip:responseOtherTkVip,
            };
        case GET_SUCCESS_TkVip:
            const responseGetTkVip = action.result.data.data;
            // console.log('responseGetTkVip.rows')
            // console.log(action.result)
            return {
                ...state,
                tableDataTkVip:responseGetTkVip.rows,
                tableCountTkVip:responseGetTkVip.total,
                responseGetTkVip:responseGetTkVip
            };
        case CREATE_SUCCESS_TkVip:
            const responseCreateTkVip = action.result.data.data;
            return {
                ...state,
                responseCreateTkVip:responseCreateTkVip
            };
        case UPDATE_SUCCESS_TkVip:
            const responseUpdateTkVip = action.result.data.data;
            return {
                ...state,
                responseUpdateTkVip:responseUpdateTkVip
            };
        case DELETE_SUCCESS_TkVip:
            const responseDeleteTkVip = action.result.data.data;
            return {
                ...state,
                responseDeleteTkVip:responseDeleteTkVip
            };
        default:
            return state
    }
}
