import React from "react";
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TotalCases from "./TotalCases";
import RowData from "./RowData";
import { entries, getLastObject } from "./helperFunctions";
import TableRow from '@material-ui/core/TableRow';

export default function TableData() {

    const [stateLatestData, setStateLatestData] = React.useState({});
    const [districtWiseLatestData, setDistrictWiseLatestData] = React.useState({});

    const sortFunction = (a, b) => {
        if (a.stateTotal.total.confirmed < b.stateTotal.total.confirmed) {
            return 1;
        }
        if (a.stateTotal.total.confirmed > b.stateTotal.total.confirmed) {
            return -1;
        }
        return 0;
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

    return (
        <React.Fragment>
            <TotalCases stateLatestData={getLastObject(stateLatestData["TT"])} /> 
            <br />
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>State</TableCell>
                            <TableCell>Total Cases</TableCell>
                            <TableCell>Actice</TableCell>
                            <TableCell>Recovered</TableCell>
                            <TableCell>Deceased</TableCell>
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