import React, {Component}from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import AuthenticationPage from './home/user/AuthenticationPage';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Theme from './home/MuiTheme/theme';
import Menu from './partials/Menu/Menu';
import Grid from '@material-ui/core/Grid';

class App extends Component {
    render() {
        return <MuiThemeProvider theme={Theme}>
            <BrowserRouter>
                <div>
                    <Grid container direction="row" justify="flex-start" >
                        <Menu/>
                    </Grid>
                    <Grid container justify="center">
                        <div>
                            <Switch>
                                    <Route path="/" component={AuthenticationPage}/>
                            </Switch>
                        </div>
                    </Grid>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>

    }
}

export default App;