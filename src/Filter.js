import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Paper } from '@material-ui/core';
import FilterInput from './FilterInput'

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
    },

    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        color: '#656667'
    },
}));

const Filter = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.search}>
            <Paper style={{ backgroundColor: "#F9F9F9" }}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <FilterInput />
            </Paper>
        </div>
    )
}

export default Filter

