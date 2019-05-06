import {GET_SUCCESS_TkNews } from "actions/tablesTkNews";
import {CREATE_SUCCESS_TkNews } from "actions/tablesTkNews";
import {UPDATE_SUCCESS_TkNews } from "actions/tablesTkNews";
import {DELETE_SUCCESS_TkNews } from "actions/tablesTkNews";
import {GET_SUCCESS_TkNews_OTHER } from "actions/tablesTkNews";

const initState = {
    responseGetTkNews:'',
    responseCreateTkNews:'',
    responseUpdateTkNews:'',
    responseDeleteTkNews:'',
    responseOtherTkNews:'',
    tableDataTkNews:'',
    tableCountTkNews:'',
    tablesTkNews:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_TkNews_OTHER:
            const responseOtherTkNews = action.result.data.data;
            console.log(responseOtherTkNews)
            return {
                ...state,
                responseOtherTkNews:responseOtherTkNews,
            };
        case GET_SUCCESS_TkNews:
            const responseGetTkNews = action.result.data.data;
            return {
                ...state,
                tableDataTkNews:responseGetTkNews.rows,
                tableCountTkNews:responseGetTkNews.total,
                responseGetTkNews:responseGetTkNews
            };
        case CREATE_SUCCESS_TkNews:
            const responseCreateTkNews = action.result.data.data;
            return {
                ...state,
                responseCreateTkNews:responseCreateTkNews
            };
        case UPDATE_SUCCESS_TkNews:
            const responseUpdateTkNews = action.result.data.data;
            return {
                ...state,
                responseUpdateTkNews:responseUpdateTkNews
            };
        case DELETE_SUCCESS_TkNews:
            const responseDeleteTkNews = action.result.data.data;
            return {
                ...state,
                responseDeleteTkNews:responseDeleteTkNews
            };
        default:
            return state
    }
}
