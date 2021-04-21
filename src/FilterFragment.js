import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    text: {
        paddingLeft: '10px'
    },
    textEmail: {
        color: '#98999A',
        fontSize: "0.9rem"
    },
}));

const FilterFragment = (props) => {
    const classes = useStyles();
    const splitEmail = `@${props.option.email.split('@')[0]}`

    return (
        <React.Fragment>
            <Avatar alt="" src={props.option.thumbnailUrl} />
            <div className={classes.text}>
                <Typography > {props.option.name}</Typography>
                <Typography className={classes.textEmail}> {splitEmail}</Typography>
            </div>
        </React.Fragment>
    )
}



export default FilterFragment

