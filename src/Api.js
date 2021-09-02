import axios from "axios";

const BaseURL = axios.create( {
    baseURL: process.env.REACT_APP_dashboard_api,
    headers: {
        "Content-Type": "application/json",
    },
} );

export { BaseURL };
