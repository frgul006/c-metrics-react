import React from "react";
import Header from "./common/Header";
import Home from "./home/Home";
import Metrics from "./metrics/Metrics";
import { Route } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends React.Component {
    render() {
        return (
            <div className="mdl-layout mdl-js-layout">
                <Header />
                <main className="mdl-layout__content">
                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--1-col" />
                        <div className="mdl-cell mdl-cell--10-col">
                            <Route exact path="/" component={Home} />
                            <Route path="/metrics" component={Metrics} />
                        </div>
                        <div className="mdl-cell mdl-cell--1-col" />

                    </div>

                </main>
            </div>
        );
    }
}

export default App;