import {GET_SUCCESS_TkCoach } from "actions/tablesTkCoach";
import {CREATE_SUCCESS_TkCoach } from "actions/tablesTkCoach";
import {UPDATE_SUCCESS_TkCoach } from "actions/tablesTkCoach";
import {DELETE_SUCCESS_TkCoach } from "actions/tablesTkCoach";
import {GET_SUCCESS_TkCoach_OTHER } from "actions/tablesTkCoach";

const initState = {
    responseGetTkCoach:'',
    responseCreateTkCoach:'',
    responseUpdateTkCoach:'',
    responseDeleteTkCoach:'',
    responseOtherTkCoach:'',
    tableDataTkCoach:'',
    tableCountTkCoach:'',
    tablesTkCoach:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_TkCoach_OTHER:
            const responseOtherTkCoach = action.result.data.data;
            console.log(responseOtherTkCoach)
            return {
                ...state,
                responseOtherTkCoach:responseOtherTkCoach,
            };
        case GET_SUCCESS_TkCoach:
            const responseGetTkCoach = action.result.data.data;
            return {
                ...state,
                tableDataTkCoach:responseGetTkCoach.rows,
                tableCountTkCoach:responseGetTkCoach.total,
                responseGetTkCoach:responseGetTkCoach
            };
        case CREATE_SUCCESS_TkCoach:
            const responseCreateTkCoach = action.result.data.data;
            return {
                ...state,
                responseCreateTkCoach:responseCreateTkCoach
            };
        case UPDATE_SUCCESS_TkCoach:
            const responseUpdateTkCoach = action.result.data.data;
            return {
                ...state,
                responseUpdateTkCoach:responseUpdateTkCoach
            };
        case DELETE_SUCCESS_TkCoach:
            const responseDeleteTkCoach = action.result.data.data;
            return {
                ...state,
                responseDeleteTkCoach:responseDeleteTkCoach
            };
        default:
            return state
    }
}
