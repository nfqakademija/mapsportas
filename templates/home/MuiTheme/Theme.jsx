import {createMuiTheme} from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import lightBlue from '@material-ui/core/colors/lightBlue';

export default createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: lightBlue,
        secondary: indigo,
        error: red
    },
    props: {
        MuiButtonBase: {
            disableRipple: true,
        }
    },
});