import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import TableData from "./TableData";
import { makeStyles } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: "left"
    },
    title: {
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}));

export default function HomePage() {

    const [logStatus, setLogStatus] = React.useState(false);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        CoronaVirus Dashboard
                    </Typography>
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge badgeContent={5} color="secondary">
                            <NotificationsIcon onClick={() => setLogStatus(!logStatus)} />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <br />
            <Grid container spacing={3}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={10}>
                   <TableData logStatus={logStatus} />
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    )
}