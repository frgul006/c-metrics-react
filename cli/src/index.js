import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from 'react-router-dom';
import App from "./components/App";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import "../node_modules/material-design-lite/material.min.css";
import "../node_modules/material-design-lite/material.min.js";
// import * as courseActions from "./actions/courseActions";

// This is where I would rehydrate the store if I had something server-side...
// We leave the function call without initialState and let the reducers set initial values themselves
const store = configureStore();
// store.dispatch(courseActions.loadCourses());

render(
    <AppContainer>
        <Provider store={store}>
            <BrowserRouter>
                <MuiThemeProvider>
                    <App />
                </MuiThemeProvider>
            </BrowserRouter>
        </Provider>
    </AppContainer>
    ,
    document.getElementById("app")
);