import React from "react";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableCell from '@material-ui/core/TableCell';
import { getValue } from "./helperFunctions";
import DistrictData from "./DistrictData";
import IconButton from '@material-ui/core/IconButton';
import { STATE_NAMES } from "./StateConstants";
import TableRow from '@material-ui/core/TableRow';

export default function RowData(props) {
    const [open, setOpen] = React.useState(false);
    const { item, districtWiseData } = props;

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {STATE_NAMES[item.state]}
                </TableCell>
                <TableCell align="right">{getValue(item.stateTotal.total.confirmed)}</TableCell>
                <TableCell align="right">{getValue(item.stateTotal.total.confirmed - item.stateTotal.total.recovered)}</TableCell>
                <TableCell align="right">{getValue(item.stateTotal.total.recovered)}</TableCell>
                <TableCell align="right">{getValue(item.stateTotal.total.deceased)}</TableCell>
            </TableRow>

            <DistrictData districtWiseData={districtWiseData} open={open} />
        </React.Fragment>
    )
}