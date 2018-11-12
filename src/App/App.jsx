import React, { Component } from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import Theme from './home/MuiTheme/theme';
import Menu from './menu/Menu';
import Routes from './routing/Routes';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={Theme}>
                <BrowserRouter>
                    <div>
                        <div className="container">
                            <Menu/>
                        </div>
                        <div>
                            <Routes />
                        </div>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

export default App;