import React from "react";
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import TableCell from '@material-ui/core/TableCell';
import { green, red } from '@material-ui/core/colors';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import { entries, getValue, getDistrictDeltaValue } from "./helperFunctions";
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
                                                    <TableCell>{item[0] ? item[0] : ""}</TableCell>
                                                    <TableCell>
                                                        {
                                                            getDistrictDeltaValue(item[1], 'confirmed') !== "" && <Typography color="error" noWrap>
                                                                <ArrowUpwardIcon style={{ color: red[500], fontSize: 15 }} />
                                                                {getDistrictDeltaValue(item[1], 'confirmed')}
                                                            </Typography>
                                                        }
                                                        <Typography noWrap>
                                                            {getValue(item[1], "confirmed")}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography noWrap>
                                                            {getValue(item[1], "confirmed") - getValue(item[1], "recovered")}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            getDistrictDeltaValue(item[1], 'recovered') !== "" && <Typography style={{ color: green[500] }} noWrap>
                                                                <ArrowUpwardIcon style={{ color: green[500], fontSize: 15 }} />
                                                                {getDistrictDeltaValue(item[1], 'recovered')}
                                                            </Typography>
                                                        }
                                                        <Typography noWrap>
                                                            {getValue(item[1], "recovered")}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            getDistrictDeltaValue(item[1], 'deceased') !== "" && <Typography noWrap>
                                                                <ArrowUpwardIcon style={{ fontSize: 15 }} />
                                                                {getDistrictDeltaValue(item[1], 'deceased')}
                                                            </Typography>
                                                        }
                                                        <Typography noWrap>
                                                            {getValue(item[1], "deceased")}
                                                        </Typography>
                                                    </TableCell>
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