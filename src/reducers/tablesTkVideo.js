import {GET_SUCCESS_TkVideo } from "actions/tablesTkVideo";
import {CREATE_SUCCESS_TkVideo } from "actions/tablesTkVideo";
import {UPDATE_SUCCESS_TkVideo } from "actions/tablesTkVideo";
import {DELETE_SUCCESS_TkVideo } from "actions/tablesTkVideo";
import {GET_SUCCESS_TkVideo_OTHER } from "actions/tablesTkVideo";

const initState = {
    responseGetTkVideo:'',
    responseCreateTkVideo:'',
    responseUpdateTkVideo:'',
    responseDeleteTkVideo:'',
    responseOtherTkVideo:'',
    tableDataTkVideo:'',
    tableCountTkVideo:'',
    tablesTkVideo:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_TkVideo_OTHER:
            const responseOtherTkVideo = action.result.data.data;
            console.log(responseOtherTkVideo)
            return {
                ...state,
                responseOtherTkVideo:responseOtherTkVideo,
            };
        case GET_SUCCESS_TkVideo:
            const responseGetTkVideo = action.result.data.data;
            return {
                ...state,
                tableDataTkVideo:responseGetTkVideo.rows,
                tableCountTkVideo:responseGetTkVideo.total,
                responseGetTkVideo:responseGetTkVideo
            };
        case CREATE_SUCCESS_TkVideo:
            const responseCreateTkVideo = action.result.data.data;
            return {
                ...state,
                responseCreateTkVideo:responseCreateTkVideo
            };
        case UPDATE_SUCCESS_TkVideo:
            const responseUpdateTkVideo = action.result.data.data;
            return {
                ...state,
                responseUpdateTkVideo:responseUpdateTkVideo
            };
        case DELETE_SUCCESS_TkVideo:
            const responseDeleteTkVideo = action.result.data.data;
            return {
                ...state,
                responseDeleteTkVideo:responseDeleteTkVideo
            };
        default:
            return state
    }
}
