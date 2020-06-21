import React from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {getTotalValue }from "./helperFunctions";

export default function TotalCases(props) {
    const { stateLatestData } = props;
    return (
        <React.Fragment>
            {
                stateLatestData && <Grid container spacing={3} style={{marginLeft: "50px"}}>
                    <Grid item xs={3}>
                        <Typography variant="h6" noWrap>
                            Confirmed Cases
                        </Typography>
                        <Typography variant="h6" noWrap>
                            {getTotalValue(stateLatestData, "confirmed")}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" noWrap>
                            Active Cases
                        </Typography>
                        <Typography variant="h6" noWrap>
                            {getTotalValue(stateLatestData, "confirmed") - getTotalValue(stateLatestData, "recovered")}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" noWrap>
                            Recovered
                        </Typography>
                        <Typography variant="h6" noWrap>
                            {getTotalValue(stateLatestData, "recovered")}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" noWrap>
                            Deceased
                        </Typography>
                        <Typography variant="h6" noWrap>
                            {getTotalValue(stateLatestData, "deceased")}
                        </Typography>
                    </Grid>
                </Grid>
            }
        </React.Fragment>
    )
}