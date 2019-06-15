import Apps from "@material-ui/icons/Apps";
import ContentPaste from "@material-ui/icons/ContentPaste";
import Wallpaper from "@material-ui/icons/Wallpaper";
import Work from "@material-ui/icons/Work";
import Loadable from 'react-loadable';
import Loading from './loading'
import AsyncComponent from './asyncComponent.jsx'
// import tablesTkArea from "views/Tables/tablesTkArea.jsx";
// import tablesTkClub from "views/Tables/tablesTkClub.jsx";
// import tablesTkRole from "views/Tables/tablesTkRole.jsx";
// import tablesTkAdmin from "views/Tables/tablesTkAdmin.jsx";
// import tablesTkCoach from "views/Tables/tablesTkCoach.jsx";
// import tablesTkUser from "views/Tables/tablesTkUser.jsx";
// import tablesTkVideo from "views/Tables/tablesTkVideo.jsx";
// import tablesTkNews from "views/Tables/tablesTkNews.jsx";
// import tablesTkTask from "views/Tables/tablesTkTask.jsx";
// import tablesTkRecipe from "views/Tables/tablesTkRecipe.jsx";
// import tablesTkPush from "views/Tables/tablesTkPush.jsx";
// import tablesTkVip from "views/Tables/tablesTkVip.jsx";
// import tablesTkApp from "views/Tables/tablesTkApp.jsx";
// import tablesTkBaseData from "views/Tables/tablesTkBaseData.jsx";
// import tablesTkVipData from "views/Tables/tablesTkVipData.jsx";
// import DashboardIcon from "@material-ui/icons/Dashboard";
// import Dashboard from "views/Dashboard/Dashboard.jsx";
// import LockOpen from "@material-ui/icons/LockOpen";
// import Forward from "@material-ui/icons/Forward";
import ViewColumn from "@material-ui/icons/ViewColumn";


const tablesTkBaseData = Loadable({
    loader: () => import(/* webpackChunkName: "tablesTkUser" */ "views/Tables/tablesTkBaseData.jsx"),
    loading: Loading
});
const tablesTkVipData = Loadable({
    loader: () => import(/* webpackChunkName: "tablesTkVideo" */ "views/Tables/tablesTkVipData.jsx"),
    loading: Loading
});
const tablesTkUser = Loadable({
    loader: () => import(/* webpackChunkName: "tablesTkUser" */ "views/Tables/tablesTkUser.jsx"),
    loading: Loading
});
const tablesTkVideo = Loadable({
    loader: () => import(/* webpackChunkName: "tablesTkVideo" */ "views/Tables/tablesTkVideo.jsx"),
    loading: Loading
});
const tablesTkNews = Loadable({
    loader: () => import(/* webpackChunkName: "tablesTkNews" */ "views/Tables/tablesTkNews.jsx"),
    loading: Loading
});
const tablesTkTask = Loadable({
    loader: () => import(/* webpackChunkName: "tablesTkTask" */ "views/Tables/tablesTkTask.jsx"),
    loading: Loading
});
const tablesTkRecipe = Loadable({
    loader: () => import(/* webpackChunkName: "tablesTkRecipe" */ "views/Tables/tablesTkRecipe.jsx"),
    loading: Loading
});

const dashRoutes2 = [
    
    {
        collapse: true,
        path: "/cms/home/tables",
        name: "健身新闻",
        state: "openTables2",
        icon: ContentPaste,
        views: [
            {
                path: "/cms/home/tables/TkNews",
                name: "新闻管理",
                mini: "RF",
                component: tablesTkNews
            }
        ]
    },
    {
        collapse: true,
        path: "/cms/home/tables",
        name: "健身任务",
        state: "openTables9",
        icon: ContentPaste,
        views: [
            {
                path: "/cms/home/tables/TkTask",
                name: "任务管理",
                mini: "RF",
                component: tablesTkTask
            }
        ]
    },
    {
        collapse: true,
        path: "/cms/home/tables",
        name: "账户管理",
        state: "openTables1",
        icon: Apps,
        views: [
            {
            path: "/cms/home/tables/TkUser",
            name: "学员管理",
            mini: "B",
            component: tablesTkUser
            },
            // {
            // path: "/cms/home/tables/TkCoach",
            // name: "教练管理",
            // mini: "B",
            // component: tablesTkCoach
            // },
            // {
            // path: "/cms/home/tables/TkAdmin",
            // name: "管理员管理",
            // mini: "B",
            // component: tablesTkAdmin
            // }
        ]
    },
    {
        collapse: true,
        path: "/cms/home/tables",
        name: "教学视频",
        state: "openTables6",
        icon: Wallpaper,
        views: [
            {
            path: "/cms/home/tables/TkVideo",
            name: "视频管理",
            mini: "B",
            component: tablesTkVideo
            }
        ]
    },
    {
        collapse: true,
        path: "/cms/home/tables",
        name: "健身食谱",
        state: "openTables7",
        icon: Work,
        views: [
            {
            path: "/cms/home/tables/TkRecipe",
            name: "食谱管理",
            mini: "B",
            component: tablesTkRecipe
            }
        ]
    },
    // {   collapse: true,
    //     path: "/cms/home/tables",
    //     name: "首页",
    //     state: "openTables0",
    //     icon: DashboardIcon,
    //     views: [
    //         {
    //             path: "/cms/home/tables/dashboard",
    //             name: "数据统计",
    //             mini: "GS",
    //             component: Dashboard
    //             },
    //     ]
    //   },
    // {
    //     collapse: true,
    //     path: "/cms/home/tables",
    //     name: "俱乐部管理",
    //     state: "openTables2",
    //     icon: ContentPaste,
    //     views: [
    //         {
    //             path: "/cms/home/tables/TkArea",
    //             name: "区域分类",
    //             mini: "RF",
    //             component: tablesTkArea
    //         },
    //         {
    //             path: "/cms/home/tables/TkClub",
    //             name: "俱乐部",
    //             mini: "EF",
    //             component: tablesTkClub
    //         }
    //     ]
    // },
    // {
    //     collapse: true,
    //     path: "/cms/home/tables",
    //     name: "角色信息",
    //     state: "openTables3",
    //     icon: LockOpen,
    //     views: [
    //         {
    //         path: "/cms/home/tables/TkRole",
    //         name: "所有角色",
    //         mini: "B",
    //         component: tablesTkRole
    //         }
    //     ]
    // },
    // {
    //     collapse: true,
    //     path: "/cms/home/tables",
    //     name: "资源管理",
    //     state: "openTables4",
    //     icon: Forward,
    //     views: [
    //         // {
    //         // path: "/cms/home/tables/TkVideo",
    //         // name: "视频管理",
    //         // mini: "B",
    //         // component: tablesTkVideo
    //         // },
    //         // {
    //         // path: "/cms/home/tables/TkNews",
    //         // name: "新闻管理",
    //         // mini: "B",
    //         // component: tablesTkNews
    //         // },
    //         // {
    //         // path: "/cms/home/tables/TkRecipe",
    //         // name: "食谱管理",
    //         // mini: "B",
    //         // component: tablesTkRecipe
    //         // },
    //         {
    //         path: "/cms/home/tables/TkPush",
    //         name: "推送管理",
    //         mini: "B",
    //         component: tablesTkPush
    //         }
    //     ]
    // },
    {
        collapse: true,
        path: "/cms/home/tables",
        name: "健身数据",
        state: "openTables5",
        icon: ViewColumn,
        views: [
            {
            path: "/cms/home/tables/TkBaseData",
            name: "基础数据",
            mini: "B",
            component: tablesTkBaseData
            },
            {
            path: "/cms/home/tables/TkVipData",
            name: "会员数据",
            mini: "B",
            component: tablesTkVipData
            }
        ]
    },
    // {
    //     collapse: true,
    //     path: "/cms/home/tables",
    //     name: "VIP信息",
    //     state: "openTables6",
    //     icon: Wallpaper,
    //     views: [
    //         {
    //         path: "/cms/home/tables/TkVip",
    //         name: "VIP分类",
    //         mini: "B",
    //         component: tablesTkVip
    //         }
    //     ]
    // },
   
    // {
    //     collapse: true,
    //     path: "/cms/home/tables",
    //     name: "APP版本信息",
    //     state: "openTables7",
    //     icon: Work,
    //     views: [
    //         {
    //         path: "/cms/home/tables/TkApp",
    //         name: "所有版本",
    //         mini: "B",
    //         component: tablesTkApp
    //         }
    //     ]
    // },
    {
        redirect: true,
        path: "/cms/home",
        pathTo: "/cms/home/tables/TkNews",
        name: "Register"
    },
];
export default dashRoutes2;
