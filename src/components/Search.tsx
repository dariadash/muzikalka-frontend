import React from 'react'
import { createStyles, InputBase, makeStyles, Theme } from '@material-ui/core'
import { $searchInput, setSearchInput } from '../model/songlist'
import { useStore } from 'effector-react'

export const Search = () => {
    const classes = useStyles()
    const search = useStore($searchInput)
    return (
        <> 
            <InputBase
                value={search}
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setSearchInput(e.target.value)}
            />
        </>
    )
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
})
)