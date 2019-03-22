import {GET_SUCCESS_TkApp } from "actions/tablesTkApp";
import {CREATE_SUCCESS_TkApp } from "actions/tablesTkApp";
import {UPDATE_SUCCESS_TkApp } from "actions/tablesTkApp";
import {DELETE_SUCCESS_TkApp } from "actions/tablesTkApp";
import {GET_SUCCESS_TkApp_OTHER } from "actions/tablesTkApp";

const initState = {
    responseGetTkApp:'',
    responseCreateTkApp:'',
    responseUpdateTkApp:'',
    responseDeleteTkApp:'',
    responseOtherTkApp:'',
    tableDataTkApp:'',
    tableCountTkApp:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_TkApp_OTHER:
            const responseOtherTkApp = action.result.data.data;
            return {
                ...state,
                responseOtherTkApp:responseOtherTkApp,
            };
        case GET_SUCCESS_TkApp:
            const responseGetTkApp = action.result.data.data;
            // console.log('responseGetTkApp.rows')
            // console.log(action.result)
            return {
                ...state,
                tableDataTkApp:responseGetTkApp.rows,
                tableCountTkApp:responseGetTkApp.total,
                responseGetTkApp:responseGetTkApp
            };
        case CREATE_SUCCESS_TkApp:
            const responseCreateTkApp = action.result.data.data;
            return {
                ...state,
                responseCreateTkApp:responseCreateTkApp
            };
        case UPDATE_SUCCESS_TkApp:
            const responseUpdateTkApp = action.result.data.data;
            return {
                ...state,
                responseUpdateTkApp:responseUpdateTkApp
            };
        case DELETE_SUCCESS_TkApp:
            const responseDeleteTkApp = action.result.data.data;
            return {
                ...state,
                responseDeleteTkApp:responseDeleteTkApp
            };
        default:
            return state
    }
}
