import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Routes from './routing/Routes';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Helmet>
                        <title>Sporto Draugas</title>
                    </Helmet>
                    <Routes/>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;