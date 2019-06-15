import Loadable from 'react-loadable';
import Loading from './loading'
import LockOpen from "@material-ui/icons/LockOpen";
import AsyncComponent from './asyncComponent.jsx'
// import ChartPage from "views/Mobile/ChartPage.jsx";
// import PicturePage from "views/Mobile/PicturePage.jsx";
// import RankListPage from "views/Mobile/RankListPage.jsx";
// import BaseDataPage from "views/Mobile/BaseDataPage.jsx";
// import BaseVipListPage from "views/Mobile/BaseVipListPage.jsx";
// import BaseVipPage from "views/Mobile/BaseVipPage.jsx";
// import TaskShowPage from "views/Mobile/TaskShowPage.jsx";
// import TaskPage from "views/Mobile/TaskPage.jsx";
// import RecipePage from "views/Mobile/RecipePage.jsx";
// import NewsPage from "views/Mobile/NewsPage.jsx";
// import NewsListPage from "views/Mobile/NewsListPage.jsx";
// import VideoListPage from "views/Mobile/VideoListPage.jsx";
// import VideoPage from "views/Mobile/VideoPage.jsx";
// import Fingerprint from "@material-ui/icons/Fingerprint";
// import VipDataPage from "../views/Mobile/VipDataPage";
// import FaceIdPage from "views/LoginPages/FaceIdPage";


const ChartPage = Loadable({
    loader: () => import(/* webpackChunkName: "ChartPage" */ "views/Mobile/ChartPage.jsx"),
    loading: Loading
});
const PicturePage = Loadable({
    loader: () => import(/* webpackChunkName: "PicturePage" */ "views/Mobile/PicturePage.jsx"),
    loading: Loading
});
const RankListPage = Loadable({
    loader: () => import(/* webpackChunkName: "RankListPage" */ "views/Mobile/RankListPage.jsx"),
    loading: Loading
});
const BaseDataPage = Loadable({
    loader: () => import(/* webpackChunkName: "BaseDataPage" */ "views/Mobile/BaseDataPage.jsx"),
    loading: Loading
});
const BaseVipListPage = Loadable({
    loader: () => import(/* webpackChunkName: "BaseVipListPage" */ "views/Mobile/BaseVipListPage.jsx"),
    loading: Loading
});
const BaseVipPage = Loadable({
    loader: () => import(/* webpackChunkName: "BaseVipPage" */ "views/Mobile/BaseVipPage.jsx"),
    loading: Loading
});
const TaskShowPage = Loadable({
    loader: () => import(/* webpackChunkName: "TaskShowPage" */ "views/Mobile/TaskShowPage.jsx"),
    loading: Loading
});
const TaskPage = Loadable({
    loader: () => import(/* webpackChunkName: "TaskPage" */ "views/Mobile/TaskPage.jsx"),
    loading: Loading
});
const RecipePage = Loadable({
    loader: () => import(/* webpackChunkName: "RecipePage" */ "views/Mobile/RecipePage.jsx"),
    loading: Loading
});
const NewsPage = Loadable({
    loader: () => import(/* webpackChunkName: "NewsPage" */ "views/Mobile/NewsPage.jsx"),
    loading: Loading
});
const NewsListPage = Loadable({
    loader: () => import(/* webpackChunkName: "NewsListPage" */ "views/Mobile/NewsListPage.jsx"),
    loading: Loading
});
const VideoListPage = Loadable({
    loader: () => import(/* webpackChunkName: "VideoListPage" */ "views/Mobile/VideoListPage.jsx"),
    loading: Loading
});
// const ChartPage = AsyncComponent(() => import(/* webpackChunkName: "ChartPage" */ "views/Mobile/ChartPage.jsx"));
// const PicturePage = AsyncComponent(() => import(/* webpackChunkName: "PicturePage" */ "views/Mobile/PicturePage.jsx"));
// const RankListPage = AsyncComponent(() => import(/* webpackChunkName: "RankListPage" */ "views/Mobile/RankListPage.jsx"));
// const BaseDataPage = AsyncComponent(() => import(/* webpackChunkName: "BaseDataPage" */ "views/Mobile/BaseDataPage.jsx"));
// const BaseVipListPage = AsyncComponent(() => import(/* webpackChunkName: "BaseVipListPage" */ "views/Mobile/BaseVipListPage.jsx"));
// const BaseVipPage = AsyncComponent(() => import(/* webpackChunkName: "BaseVipPage" */ "views/Mobile/BaseVipPage.jsx"));
// const TaskShowPage = AsyncComponent(() => import(/* webpackChunkName: "TaskShowPage" */ "views/Mobile/TaskShowPage.jsx"));
// const TaskPage = AsyncComponent(() => import(/* webpackChunkName: "TaskPage" */ "views/Mobile/TaskPage.jsx"));
// const RecipePage = AsyncComponent(() => import(/* webpackChunkName: "RecipePage" */ "views/Mobile/RecipePage.jsx"));
// const NewsPage = AsyncComponent(() => import(/* webpackChunkName: "NewsPage" */ "views/Mobile/NewsPage.jsx"));
// const NewsListPage = AsyncComponent(() => import(/* webpackChunkName: "NewsListPage" */ "views/Mobile/NewsListPage.jsx"));
// const VideoListPage = AsyncComponent(() => import(/* webpackChunkName: "VideoListPage" */ "views/Mobile/VideoListPage.jsx"));



const pagesRoutes2 = [
    {
        path: "/mobile/ranklistpage",
        name: "News Page",
        short: "Mobile",
        mini: "LP",
        icon: LockOpen,
        component: RankListPage
    },
    {
        path: "/mobile/chartpage/:id",
        name: "News Page",
        short: "Mobile",
        mini: "LP",
        icon: LockOpen,
        component: ChartPage
    },
    {
        path: "/mobile/picturepage/:id",
        name: "News Page",
        short: "Mobile",
        mini: "LP",
        icon: LockOpen,
        component: PicturePage
    },
    {
        path: "/mobile/basedatapage/:id",
        name: "News Page",
        short: "Mobile",
        mini: "LP",
        icon: LockOpen,
        component: BaseDataPage
    },
    {
        path: "/mobile/vipdatalistpage/:id",
        name: "News Page",
        short: "Mobile",
        mini: "LP",
        icon: LockOpen,
        component: BaseVipListPage
    },
    {
        path: "/mobile/vipdatapage/:id",
        name: "News Page",
        short: "Mobile",
        mini: "LP",
        icon: LockOpen,
        component: BaseVipPage
    },
    {
        path: "/mobile/recipepage/:id",
        name: "News Page",
        short: "Mobile",
        mini: "LP",
        icon: LockOpen,
        component: RecipePage
    },
    {
        path: "/mobile/newspage/:id",
        name: "News Page",
        short: "Mobile",
        mini: "LP",
        icon: LockOpen,
        component: NewsPage
    },
    {
        path: "/mobile/newspagelist",
        name: "News List Page",
        short: "Mobile",
        mini: "NP",
        icon: LockOpen,
        component: NewsListPage
    },
    // {
    //     path: "/mobile/videopage/:id",
    //     name: "News Page",
    //     short: "Mobile",
    //     mini: "LP",
    //     icon: LockOpen,
    //     component: VideoPage
    // },
    {
        path: "/mobile/taskpage/:id",
        name: "News Page",
        short: "Mobile",
        mini: "LP",
        icon: LockOpen,
        component: TaskPage
    },
    {
        path: "/mobile/taskshowpage/:id",
        name: "News Page",
        short: "Mobile",
        mini: "LP",
        icon: LockOpen,
        component: TaskShowPage
    },
    {
        path: "/mobile/videopagelist",
        name: "News List Page",
        short: "Mobile",
        mini: "NP",
        icon: LockOpen,
        component: VideoListPage
    },
    // {
    //   path: "/cms/login/faceid",
    //   name: "Login Page",
    //   short: "FaceId",
    //   mini: "LP",
    //   icon: LockOpen,
    //   component: FaceIdPage
    // },
    {
        redirect: true,
        path: "/mobile",
        pathTo: "/mobile/NewsPage",
        name: "Register"
    },
];

export default pagesRoutes2;
