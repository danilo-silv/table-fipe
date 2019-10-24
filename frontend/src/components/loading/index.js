import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

const LoadingIndicator = () => {
    const { promiseInProgress } = usePromiseTracker();
    return promiseInProgress &&
        <div
            style={{
                width: "100%",
                height: "50",
                display: "flex",
                justifyContent: "center",
                alignItems: "center", 
                padding: "20px 70px",
            }}
        >
            <Loader type="ThreeDots" color="#29df93" height={70} width={100} />
        </div>
}


export default LoadingIndicator; 