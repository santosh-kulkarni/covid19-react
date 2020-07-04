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
import { entries, getLastObject, keys } from "./helperFunctions";
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
        if (arrowStatus.column === column) {
            const temp = entries(stateLatestData).map(element => {
                return {
                    state: element[0],
                    stateData: element[1]
                }
            });
            const sortOrderChangeData = temp.sort((a, b) => {
                if (getLastObject(a.stateData).total[column] < getLastObject(b.stateData).total[column]) {
                    return arrowStatus.direction === 'up' ?  1 : -1;
                }
                else if (getLastObject(a.stateData).total[column] > getLastObject(b.stateData).total[column]) {
                    return arrowStatus.direction === 'up' ?  -1 : 1;
                } else {
                    return 0;
                }
            });
            const tempLatestData = {};
            sortOrderChangeData.forEach(ele => {
                tempLatestData[ele.state] = ele.stateData
            });
            setStateLatestData(tempLatestData);
            setArrowStatus({ ...arrowStatus, direction: arrowStatus.direction === "down" ? "up" : "down" })
        }
        else {
            const temp = entries(stateLatestData).map(element => {
                return {
                    state: element[0],
                    stateData: element[1]
                }
            });
            const sortOrderChangeData = temp.sort((a, b) => {
                if (getLastObject(a.stateData).total[column] < getLastObject(b.stateData).total[column]) {
                    return 1;
                }
                else if (getLastObject(a.stateData).total[column] > getLastObject(b.stateData).total[column]) {
                    return -1;
                } else {
                    return 0;
                }
            });
            const tempLatestData = {};
            sortOrderChangeData.forEach(ele => {
                tempLatestData[ele.state] = ele.stateData
            });
            setStateLatestData(tempLatestData);
            setArrowStatus({
                column: column,
                direction: "down"
            });
        }
    }

    React.useEffect(() => {
        axios.get("https://api.covid19india.org/v3/min/timeseries.min.json")
            .then((response) => {
                entries(response.data).forEach(ele => {
                    const temp = getLastObject(ele[1])
                    temp.total.deceased = temp.total.deceased ? temp.total.deceased : 0;
                    temp.total.active = temp.total.confirmed - temp.total.recovered;
                });
                setStateLatestData(response.data);
            })
            .catch((error) => {

            });

        axios.get("https://api.covid19india.org/v3/min/data.min.json")
            .then((response) => {
                // entries(response.data).forEach(ele => {
                //     entries(ele[1].districts).forEach(ele1 => {
                //         ele1[1].total.deceased = ele1[1].total.deceased ? ele1[1].total.deceased : 0;
                //         ele1[1].total.active = ele1[1].total.confirmed - ele1[1].total.recovered;
                //     })                    
                // });
                setDistrictWiseLatestData(response.data);
            })
            .catch((error) => {

            });
    }, []);

    const handleStateSort = () => {

        if(arrowStatus.column !== 'state') {
            const tempKeys =  keys(stateLatestData).sort((a,b) => {
                if( a < b ) {
                    return 1;
                } else if( a > b ) {
                    return -1;
                } else {
                    return 0;
                }
            });
            const tempLatestData = {};
            tempKeys.forEach(ele => {
                tempLatestData[ele] = stateLatestData[ele];
            });
            setStateLatestData(tempLatestData);
            setArrowStatus({column: "state", direction: "down" })
        }
        else {
            const tempKeys =  keys(stateLatestData).sort((a,b) => {
                if( a < b ) {
                    return arrowStatus.direction === 'down' ? -1 : 1;
                } else if( a > b ) {
                    return arrowStatus.direction === 'down' ? 1 : -1;
                } else {
                    return 0;
                }
            });
            const tempLatestData = {};
            tempKeys.forEach(ele => {
                tempLatestData[ele] = stateLatestData[ele];
            });
            setStateLatestData(tempLatestData);
            setArrowStatus({column: "state", direction: arrowStatus.direction === "down" ? "up" : "down" })
        }
        
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
                            <TableCell style={{ cursor: "pointer" }} onClick={() => handleStateSort()}>
                                <Typography variant="h5" noWrap>
                                    State
                                    {
                                        arrowStatus.column === "state" && (arrowStatus.direction === "down" ? <ArrowDownwardIcon style={{ fontSize: 25 }} /> : <ArrowUpwardIcon style={{ fontSize: 25 }} />)
                                    }
                                </Typography>
                            </TableCell>
                            <TableCell style={{ cursor: "pointer" }} onClick={() => handleRowSort("confirmed")}>
                                <Typography variant="h5" noWrap>
                                    Total Cases
                                    {
                                        arrowStatus.column === "confirmed" && (arrowStatus.direction === "down" ? <ArrowDownwardIcon style={{ fontSize: 25 }} /> : <ArrowUpwardIcon style={{ fontSize: 25 }} />)
                                    }
                                </Typography>
                            </TableCell>
                            <TableCell style={{ cursor: "pointer" }} onClick={() => handleRowSort("active")}>
                                <Typography variant="h5" noWrap>
                                    Active
                                    {
                                        arrowStatus.column === "active" && (arrowStatus.direction === "down" ? <ArrowDownwardIcon style={{ fontSize: 25 }} /> : <ArrowUpwardIcon style={{ fontSize: 25 }} />)
                                    }
                                </Typography>
                            </TableCell>
                            <TableCell style={{ cursor: "pointer" }} onClick={() => handleRowSort("recovered")}>
                                <Typography variant="h5" noWrap>
                                    Recovered
                                    {
                                        arrowStatus.column === "recovered" && (arrowStatus.direction === "down" ? <ArrowDownwardIcon style={{ fontSize: 25 }} /> : <ArrowUpwardIcon style={{ fontSize: 25 }} />)
                                    }
                                </Typography>
                            </TableCell>
                            <TableCell style={{ cursor: "pointer" }} onClick={() => handleRowSort("deceased")}>
                                <Typography variant="h5" noWrap>
                                    Deceased
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