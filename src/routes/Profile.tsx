import React from 'react'
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles'
import SearchAppBar from '../components/Menu'
import { uploadSongsFx } from '../model/profile'
import { Dragger } from '../components/Dragger'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            border: '1px solid #e2e2e1',
            overflow: 'hidden',
            borderRadius: 4,
            backgroundColor: '#fcfcfb',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:hover': {
                backgroundColor: '#fff',
            },
            '&$focused': {
                backgroundColor: '#fff',
                boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
                borderColor: theme.palette.primary.main,
            },
        },
        focused: {},
        
        input: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:'15px',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            width: '100%',
            height: '100%',
            color: 'inherit',
            padding: theme.spacing(1, 1, 1, 1),
        },

        upload: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:'5px',
            padding: theme.spacing(1, 1, 1, 1),
            cursor: 'pointer'
        }
    })
)
export const Profile = () => {
    const classes = useStyles();

    const upload = (files:any) => {
        uploadSongsFx(files)
    }   

    return <div className={classes.root}>
        <SearchAppBar />
        <div className={classes.upload}>
        <Dragger onFiles={upload}/>
        </div>
    </div>
}
