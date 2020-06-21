import React from "react";
import axios from "axios";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Notification(props) {

    const {logStatus} = props;
    const [log, setLog] = React.useState([]);
    React.useEffect(() => {
        axios.get("https://api.covid19india.org/updatelog/log.json")
        .then((response) => {
            setLog(response.data)
        })
        .catch((error) => {

        });

    },[])
    return (
        <React.Fragment>
            {
                logStatus && log.reverse().map((item, index) => {
                    return (
                        index < 5 && <React.Fragment> 
                            <Alert severity="info">{item.update}</Alert> <br />
                        </React.Fragment>
                    )
                })
            }
        </React.Fragment>
        
    )
}