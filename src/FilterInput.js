import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { Autocomplete } from '@material-ui/lab';
import FilterFragment from './FilterFragment';
import { CircularProgress } from '@material-ui/core';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}


const useStyles = makeStyles((theme) => ({
    inputInput: {
        padding: theme.spacing(2.1, 2.1, 2.1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(5)}px)`,
        transition: theme.transitions.create('width'),
        minWidth: '280px'
    },
    circular: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
    },
    div: {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center'
    }
}));

const FilterInput = (props) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            //  await sleep(3e3); // For demo purposes.
            const responseUsers = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await responseUsers.json();
            const responsePhotos = await fetch('https://jsonplaceholder.typicode.com/photos');
            const photos = await responsePhotos.json();
            const merge = users.map(t1 => ({ ...t1, ...photos.find(t2 => t2.id === t1.id) }))

            if (active) {
                setOptions(merge);
            }
        })();

        return () => {
            active = false;
        };

    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            options={options}
            loading={loading}
            getOptionLabel={(option) => option.name}
            renderOption={(option, { selected }) => (
                <FilterFragment option={option} selected={selected} />
            )}
            renderInput={(params) => (
                <div ref={params.InputProps.ref} className={classes.div}>
                    <InputBase
                        {...params.inputProps}
                        placeholder="Search…"
                        classes={{
                            input: classes.inputInput,
                        }}
                        inputProps={{
                            'aria-label': 'search'
                        }}
                    />
                    {loading &&
                        <div className={classes.circular}>
                            <CircularProgress color="inherit" size={25} />
                        </div>
                    }
                </div>
            )}
        />
    )
}

export default FilterInput

