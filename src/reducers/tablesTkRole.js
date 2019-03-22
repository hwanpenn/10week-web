import {GET_SUCCESS_TkRole } from "actions/tablesTkRole";
import {CREATE_SUCCESS_TkRole } from "actions/tablesTkRole";
import {UPDATE_SUCCESS_TkRole } from "actions/tablesTkRole";
import {DELETE_SUCCESS_TkRole } from "actions/tablesTkRole";
import {GET_SUCCESS_TkRole_OTHER } from "actions/tablesTkRole";

const initState = {
    responseGetTkRole:'',
    responseCreateTkRole:'',
    responseUpdateTkRole:'',
    responseDeleteTkRole:'',
    responseOtherTkRole:'',
    tableDataTkRole:'',
    tableCountTkRole:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_TkRole_OTHER:
            const responseOtherTkRole = action.result.data.data;
            // console.log(responseOtherTkRole)
            return {
                ...state,
                responseOtherTkRole:responseOtherTkRole,
            };
        case GET_SUCCESS_TkRole:
            const responseGetTkRole = action.result.data.data;
            // console.log(responseGetTkRole)
            return {
                ...state,
                tableDataTkRole:responseGetTkRole.rows,
                tableCountTkRole:responseGetTkRole.total,
                responseGetTkRole:responseGetTkRole
            };
        case CREATE_SUCCESS_TkRole:
            const responseCreateTkRole = action.result.data.data;
            return {
                ...state,
                responseCreateTkRole:responseCreateTkRole
            };
        case UPDATE_SUCCESS_TkRole:
            const responseUpdateTkRole = action.result.data.data;
            return {
                ...state,
                responseUpdateTkRole:responseUpdateTkRole
            };
        case DELETE_SUCCESS_TkRole:
            const responseDeleteTkRole = action.result.data.data;
            return {
                ...state,
                responseDeleteTkRole:responseDeleteTkRole
            };
        default:
            return state
    }
}
