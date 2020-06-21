import React from "react";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableCell from '@material-ui/core/TableCell';
import { getValue, getDeltaValue } from "./helperFunctions";
import DistrictData from "./DistrictData";
import { green, red } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { STATE_NAMES } from "./StateConstants";
import TableRow from '@material-ui/core/TableRow';

export default function RowData(props) {
    const [open, setOpen] = React.useState(false);
    const { item, districtWiseData, state } = props;

    return (
        <React.Fragment>
            {
                state !== "TT" && <React.Fragment>
                    <TableRow>
                        <TableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {STATE_NAMES[state]}
                        </TableCell>
                        <TableCell>
                            {
                                getDeltaValue(item, 'confirmed') !== "" && <Typography color="error" noWrap>
                                    <ArrowUpwardIcon style={{ color: red[500], fontSize: 15 }} />
                                    {getDeltaValue(item, 'confirmed')}
                                </Typography>
                            }
                            <Typography noWrap>
                                {getValue(item, "confirmed")}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography noWrap>
                                {getValue(item, "confirmed") - getValue(item, "recovered")}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            {
                                getDeltaValue(item, 'recovered') !== "" && <Typography style={{ color: green[500] }} noWrap>
                                    <ArrowUpwardIcon style={{ color: green[500], fontSize: 15 }} />
                                    {getDeltaValue(item, 'recovered')}
                                </Typography>
                            }
                            <Typography noWrap>
                                {getValue(item, "recovered")}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            {
                                getDeltaValue(item, 'deceased') !== "" && <Typography noWrap>
                                    <ArrowUpwardIcon style={{ fontSize: 15 }} />
                                    {getDeltaValue(item, 'deceased')}
                                </Typography>
                            }

                            <Typography noWrap>
                                {getValue(item, "deceased")}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <DistrictData districtWiseData={districtWiseData || {}} open={open} />
                </React.Fragment>
            }
        </React.Fragment>
    )
}