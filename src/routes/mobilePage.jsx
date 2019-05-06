import ChartPage from "views/Mobile/ChartPage.jsx";
import PicturePage from "views/Mobile/PicturePage.jsx";
import RankListPage from "views/Mobile/RankListPage.jsx";
import BaseDataPage from "views/Mobile/BaseDataPage.jsx";
import BaseVipListPage from "views/Mobile/BaseVipListPage.jsx";
import BaseVipPage from "views/Mobile/BaseVipPage.jsx";
import TaskShowPage from "views/Mobile/TaskShowPage.jsx";
import TaskPage from "views/Mobile/TaskPage.jsx";
import RecipePage from "views/Mobile/RecipePage.jsx";
import NewsPage from "views/Mobile/NewsPage.jsx";
import NewsListPage from "views/Mobile/NewsListPage.jsx";
// import VideoPage from "views/Mobile/VideoPage.jsx";
import VideoListPage from "views/Mobile/VideoListPage.jsx";
// import Fingerprint from "@material-ui/icons/Fingerprint";
import LockOpen from "@material-ui/icons/LockOpen";
// import VipDataPage from "../views/Mobile/VipDataPage";
// import FaceIdPage from "views/LoginPages/FaceIdPage";

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
