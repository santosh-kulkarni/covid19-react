import React from "react";
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TotalCases from "./TotalCases";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Notification from "./Notification";
import RowData from "./RowData";
import Typography from '@material-ui/core/Typography';
import { entries, getLastObject } from "./helperFunctions";
import TableRow from '@material-ui/core/TableRow';

export default function TableData(props) {

    const { logStatus } = props;
    const [stateLatestData, setStateLatestData] = React.useState({});
    const [districtWiseLatestData, setDistrictWiseLatestData] = React.useState({});
    const [arrowStatus, setArrowStatus] = React.useState({
        column: "state",
        direction: "up",
    })

    const handleRowSort = (column) => {
        if(arrowStatus.column === column) {
            setArrowStatus({...arrowStatus, direction: arrowStatus.direction === "down" ? "up" : "down"})
        }
        else {
            setArrowStatus({
                column: column,
                direction: "down"
            })
        }
    }

    React.useEffect(() => {
        axios.get("https://api.covid19india.org/v3/min/timeseries.min.json")
            .then((response) => {
                setStateLatestData(response.data);
            })
            .catch((error) => {

            });

        axios.get("https://api.covid19india.org/v3/min/data.min.json")
            .then((response) => {
                setDistrictWiseLatestData(response.data);
            })
            .catch((error) => {

            });
    }, []);

    switch(arrowStatus.state) {
        case "total_cases" :
            
            break;
        default: 
            break;
    }

    return (
        <React.Fragment>
            <TotalCases stateLatestData={getLastObject(stateLatestData["TT"])} />
            <br />
            <Notification logStatus={logStatus} />
            <br />
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell style={{cursor: "pointer"}} onClick={() => handleRowSort("state")}>
                                <Typography variant="h5" noWrap>
                                    State 
                                    {
                                        arrowStatus.column === "state" && (arrowStatus.direction === "down" ? <ArrowDownwardIcon style={{ fontSize: 25 }} /> : <ArrowUpwardIcon style={{ fontSize: 25 }} />)
                                    }
                                </Typography>
                            </TableCell>
                            <TableCell style={{cursor: "pointer"}} onClick={() => handleRowSort("total_cases")}>
                                <Typography variant="h5" noWrap>
                                    Total Cases 
                                    {
                                        arrowStatus.column === "total_cases" && (arrowStatus.direction === "down" ? <ArrowDownwardIcon style={{ fontSize: 25 }} /> : <ArrowUpwardIcon style={{ fontSize: 25 }} />)
                                    }
                                </Typography>
                            </TableCell>
                            <TableCell style={{cursor: "pointer"}} onClick={() => handleRowSort("active")}>
                                <Typography variant="h5" noWrap>
                                    Active 
                                    {
                                        arrowStatus.column === "active" && (arrowStatus.direction === "down" ? <ArrowDownwardIcon style={{ fontSize: 25 }} /> : <ArrowUpwardIcon style={{ fontSize: 25 }} />)
                                    }
                                </Typography>
                            </TableCell>
                            <TableCell style={{cursor: "pointer"}} onClick={() => handleRowSort("recovered")}>
                                <Typography variant="h5" noWrap>
                                    Recovered 
                                    {
                                        arrowStatus.column === "recovered" && (arrowStatus.direction === "down" ? <ArrowDownwardIcon style={{ fontSize: 25 }} /> : <ArrowUpwardIcon style={{ fontSize: 25 }} />)
                                    }
                                </Typography>
                            </TableCell>
                            <TableCell style={{cursor: "pointer"}} onClick={() => handleRowSort("deceased")}>
                                <Typography variant="h5" noWrap>
                                    deceased
                                    {
                                        arrowStatus.column === "deceased" && (arrowStatus.direction === "down" ? <ArrowDownwardIcon style={{ fontSize: 25 }} /> : <ArrowUpwardIcon style={{ fontSize: 25 }} />)
                                    }
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            entries(stateLatestData).map((item, index) => {
                                return (
                                    <RowData key={index} item={getLastObject(item[1])} state={item[0]} districtWiseData={districtWiseLatestData[item[0]]} />
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}