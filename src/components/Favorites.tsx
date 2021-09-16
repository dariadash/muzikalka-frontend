import React from 'react'
import { CircularProgress, IconButton } from '@material-ui/core'
import { FavoriteBorderRounded, FavoriteRounded } from '@material-ui/icons'
import { trackFavoriteFx, trackUnfavoriteFx } from '../model/songlist'
import { useStore } from 'effector-react'

type Props = {
    songId: number,
    isFavorite: boolean
}

export const Favorite = ({songId, isFavorite}: Props) => {

    const isFavoritePending = useStore(trackFavoriteFx.pending)
    const isUnfavoritePending = useStore(trackUnfavoriteFx.pending)

    const isLoading = isUnfavoritePending || isFavoritePending
    
    if (isLoading) {
        return <><CircularProgress /></>
    }
    const handleButton = () => {
        return isFavorite
            ? trackUnfavoriteFx(songId)
            : trackFavoriteFx(songId)
    }

    return (
        <>
            <IconButton
                color="secondary"
                size="small"
                onClick={() => handleButton()}
            >
                {!isFavorite && (
                    <FavoriteBorderRounded />)}
                {isFavorite && (
                    <FavoriteRounded />
                )}
            </IconButton>
        </>
    )
}