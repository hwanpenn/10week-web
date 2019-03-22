import {GET_SUCCESS_TkUser } from "actions/tablesTkUser";
import {CREATE_SUCCESS_TkUser } from "actions/tablesTkUser";
import {UPDATE_SUCCESS_TkUser } from "actions/tablesTkUser";
import {DELETE_SUCCESS_TkUser } from "actions/tablesTkUser";
import {GET_SUCCESS_TkUser_OTHER } from "actions/tablesTkUser";

const initState = {
    responseGetTkUser:'',
    responseCreateTkUser:'',
    responseUpdateTkUser:'',
    responseDeleteTkUser:'',
    responseOtherTkUser:'',
    tableDataTkUser:'',
    tableCountTkUser:'',
    tablesTkUser:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_TkUser_OTHER:
            const responseOtherTkUser = action.result.data.data;
            console.log(responseOtherTkUser)
            return {
                ...state,
                responseOtherTkUser:responseOtherTkUser,
            };
        case GET_SUCCESS_TkUser:
            const responseGetTkUser = action.result.data.data;
            return {
                ...state,
                tableDataTkUser:responseGetTkUser.rows,
                tableCountTkUser:responseGetTkUser.total,
                responseGetTkUser:responseGetTkUser
            };
        case CREATE_SUCCESS_TkUser:
            const responseCreateTkUser = action.result.data.data;
            return {
                ...state,
                responseCreateTkUser:responseCreateTkUser
            };
        case UPDATE_SUCCESS_TkUser:
            const responseUpdateTkUser = action.result.data.data;
            return {
                ...state,
                responseUpdateTkUser:responseUpdateTkUser
            };
        case DELETE_SUCCESS_TkUser:
            const responseDeleteTkUser = action.result.data.data;
            return {
                ...state,
                responseDeleteTkUser:responseDeleteTkUser
            };
        default:
            return state
    }
}
