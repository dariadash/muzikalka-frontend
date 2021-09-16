import React from 'react'
import { useStore } from 'effector-react'
import { $showFavoriteTracks, toggleFavorites } from '../model/songlist'
import { IconButton } from '@material-ui/core'
import { QueueMusicRounded } from '@material-ui/icons'

export const Favs = () => {
    const favs = useStore($showFavoriteTracks)
    return(
        <>
            <IconButton
                onClick={(e) => toggleFavorites()}
            >
                <QueueMusicRounded color={favs ? 'action' : 'disabled'}/>
            </IconButton>
        </>
    )
}