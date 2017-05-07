import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Comments</h1>
                <p>This solution uses React, Redux, Material Design (by way of mdl and material ui) and Google Charts</p>
                <RaisedButton href="metrics" label="See a list of metrics" primary/>
            </div>
        );
    }
}

export default Home;