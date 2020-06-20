import React from "react";
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import RowData from "./RowData";
import { entries, getLastObject } from "./helperFunctions";
import TableRow from '@material-ui/core/TableRow';

export default function TableData() {

    const [stateLatestData, setStateLatestData] = React.useState([]);
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
                const stateWiseData = response.data;
                let tempStateLatestData1 = [];
                entries(stateWiseData).forEach(item => {
                    if(item[0] !== "TT") {
                        tempStateLatestData1.push({
                            state: item[0],
                            stateTotal: getLastObject(item[1])
                        });
                    }
                });
                // tempStateLatestData1 = tempStateLatestData1.sort(sortFunction);
                setStateLatestData(tempStateLatestData1);
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
                   stateLatestData.length > 0 && districtWiseLatestData["KA"] && stateLatestData.map((item, index) => {
                       return (
                           <RowData key={index} item = {item} districtWiseData={districtWiseLatestData[item.state]} />
                       )
                   })
               }
            </TableBody>
        </Table>
    </TableContainer>
    )
}