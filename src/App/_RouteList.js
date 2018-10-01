import React from "react";
import Loadable from "react-loadable";
import { Spin, Icon } from "antd";

const components = {
    Home: () => import("Components/Home/Home"),
    Index:() => import("Components/Index/Index")
};

const textCenter = { textAlign: "center" };
const LoadingComponent = (props) => {
    if (props.error) {
        return <div style={textCenter}>Error occured while trying to load page.</div>;
    } else if (props.pastDelay) {
        return (
            <div style={textCenter}>
                <Spin indicator={<Icon type="loading" spin />} />
            </div>
        );
    } else {
        return null;
    }
};

const lazyLoad = compName => Loadable({ loader: components[compName], loading: LoadingComponent });

export default [
    {
        id: 1,
        component: lazyLoad("Home"),
        path: "/Home"
    },
    {
        id: 2,
        component: lazyLoad("Index"),
        path: "/Index"   
    }
];
