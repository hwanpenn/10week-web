import {GET_SUCCESS_TkAdmin } from "actions/tablesTkAdmin";
import {CREATE_SUCCESS_TkAdmin } from "actions/tablesTkAdmin";
import {UPDATE_SUCCESS_TkAdmin } from "actions/tablesTkAdmin";
import {DELETE_SUCCESS_TkAdmin } from "actions/tablesTkAdmin";
import {GET_SUCCESS_TkAdmin_OTHER } from "actions/tablesTkAdmin";

const initState = {
    responseGetTkAdmin:'',
    responseCreateTkAdmin:'',
    responseUpdateTkAdmin:'',
    responseDeleteTkAdmin:'',
    responseOtherTkAdmin:'',
    tableDataTkAdmin:'',
    tableCountTkAdmin:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_TkAdmin_OTHER:
            const responseOtherTkAdmin = action.result.data.data;
            console.log(responseOtherTkAdmin)
            return {
                ...state,
                responseOtherTkAdmin:responseOtherTkAdmin,
            };
        case GET_SUCCESS_TkAdmin:
            const responseGetTkAdmin = action.result.data.data;
            return {
                ...state,
                tableDataTkAdmin:responseGetTkAdmin.rows,
                tableCountTkAdmin:responseGetTkAdmin.total,
                responseGetTkAdmin:responseGetTkAdmin
            };
        case CREATE_SUCCESS_TkAdmin:
            const responseCreateTkAdmin = action.result.data.data;
            return {
                ...state,
                responseCreateTkAdmin:responseCreateTkAdmin
            };
        case UPDATE_SUCCESS_TkAdmin:
            const responseUpdateTkAdmin = action.result.data.data;
            return {
                ...state,
                responseUpdateTkAdmin:responseUpdateTkAdmin
            };
        case DELETE_SUCCESS_TkAdmin:
            const responseDeleteTkAdmin = action.result.data.data;
            return {
                ...state,
                responseDeleteTkAdmin:responseDeleteTkAdmin
            };
        default:
            return state
    }
}
