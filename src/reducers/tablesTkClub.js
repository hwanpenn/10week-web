import {GET_SUCCESS_TkClub } from "actions/tablesTkClub";
import {CREATE_SUCCESS_TkClub } from "actions/tablesTkClub";
import {UPDATE_SUCCESS_TkClub } from "actions/tablesTkClub";
import {DELETE_SUCCESS_TkClub } from "actions/tablesTkClub";
import {GET_SUCCESS_TkClub_OTHER } from "actions/tablesTkClub";

const initState = {
    responseGetTkClub:'',
    responseCreateTkClub:'',
    responseUpdateTkClub:'',
    responseDeleteTkClub:'',
    responseOtherTkClub:'',
    tableDataTkClub:'',
    tableCountTkClub:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_TkClub_OTHER:
            const responseOtherTkClub = action.result.data.data;
            console.log(responseOtherTkClub)
            return {
                ...state,
                responseOtherTkClub:responseOtherTkClub,
            };
        case GET_SUCCESS_TkClub:
            const responseGetTkClub = action.result.data.data;
            return {
                ...state,
                tableDataTkClub:responseGetTkClub.rows,
                tableCountTkClub:responseGetTkClub.total,
                responseGetTkClub:responseGetTkClub
            };
        case CREATE_SUCCESS_TkClub:
            const responseCreateTkClub = action.result.data.data;
            return {
                ...state,
                responseCreateTkClub:responseCreateTkClub
            };
        case UPDATE_SUCCESS_TkClub:
            const responseUpdateTkClub = action.result.data.data;
            return {
                ...state,
                responseUpdateTkClub:responseUpdateTkClub
            };
        case DELETE_SUCCESS_TkClub:
            const responseDeleteTkClub = action.result.data.data;
            return {
                ...state,
                responseDeleteTkClub:responseDeleteTkClub
            };
        default:
            return state
    }
}
