import React from "react";
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import { entries, getValue } from "./helperFunctions";
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

export default function DistrictData(props) {
    const { districtWiseData, open } = props;

    return (
        <React.Fragment>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                State Data
                            </Typography>
                            <Table aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>District</TableCell>
                                        <TableCell>Total Cases</TableCell>
                                        <TableCell>Active</TableCell>
                                        <TableCell>Recovered</TableCell>
                                        <TableCell>Deceased</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        entries(districtWiseData.districts).map((item, index) => {
                                            return (
                                                <TableRow>
                                                    <TableCell>{getValue(item[0])}</TableCell>
                                                    <TableCell>{getValue(item[1].total.confirmed)}</TableCell>
                                                    <TableCell>{getValue(item[1].total.confirmed - item[1].total.recovered)}</TableCell>
                                                    <TableCell>{getValue(item[1].total.recovered)}</TableCell>
                                                    <TableCell>{getValue(item[1].total.deceased)}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}