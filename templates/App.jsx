import React, {Component}from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {BrowserRouter} from 'react-router-dom';
import Theme from './home/MuiTheme/theme';
import Menu from './menu/Menu';
import Grid from '@material-ui/core/Grid';
import Routes from './routing/Routes';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={Theme}>
                <BrowserRouter>
                    <div>
                        <Grid container direction="row" justify="flex-start">
                            <Menu/>
                        </Grid>
                        <Grid container justify="center">
                            <div>
                                <Routes />
                            </div>
                        </Grid>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        )
    }
}

export default App;