import React from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { green, red } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { getTotalValue, getDeltaValue } from "./helperFunctions";

export default function TotalCases(props) {
    const { stateLatestData } = props;
    return (
        <React.Fragment>
            {
                stateLatestData && <Grid container spacing={3} style={{ marginLeft: "50px" }}>
                    <Grid item xs={3}>
                        <Typography variant="h6" noWrap>
                            Confirmed Cases
                        </Typography>
                        {
                            getDeltaValue(stateLatestData, 'confirmed') !== "" && <Typography style={{ color: red[500] }} noWrap>
                                <ArrowUpwardIcon style={{ color: red[500], fontSize: 15 }} />
                                {getDeltaValue(stateLatestData, 'confirmed')}
                            </Typography>
                        }
                        <Typography variant="h6" noWrap>
                            {getTotalValue(stateLatestData, "confirmed")}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" noWrap>
                            Active Cases
                        </Typography>
                        {
                            getDeltaValue(stateLatestData, 'confirmed') - getDeltaValue(stateLatestData, "recovered")  !== "" && <Typography style={{ color: red[500] }} noWrap>
                                <ArrowUpwardIcon style={{ color: red[500], fontSize: 15 }} />
                                {getDeltaValue(stateLatestData, "confirmed") - getDeltaValue(stateLatestData, "recovered")}
                            </Typography>
                        }
                        <Typography variant="h6" noWrap>
                            {getTotalValue(stateLatestData, "confirmed") - getTotalValue(stateLatestData, "recovered")}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" noWrap>
                            Recovered
                        </Typography>
                        {
                            getDeltaValue(stateLatestData, 'recovered') !== "" && <Typography style={{ color: green[500] }} noWrap>
                                <ArrowUpwardIcon style={{ color: green[500], fontSize: 15 }} />
                                {getDeltaValue(stateLatestData, 'recovered')}
                            </Typography>
                        }
                        <Typography variant="h6" noWrap>
                            {getTotalValue(stateLatestData, "recovered")}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="h6" noWrap>
                            Deceased
                        </Typography>
                        {
                            getDeltaValue(stateLatestData, 'deceased') !== "" && <Typography  noWrap>
                                <ArrowUpwardIcon style={{ fontSize: 15 }} />
                                {getDeltaValue(stateLatestData, 'deceased')}
                            </Typography>
                        }
                        <Typography variant="h6" noWrap>
                            {getTotalValue(stateLatestData, "deceased")}
                        </Typography>
                    </Grid>
                </Grid>
            }
        </React.Fragment>
    )
}