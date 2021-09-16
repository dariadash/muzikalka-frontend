import React from 'react';
import { useStore } from 'effector-react';
import { $currentSongItem, $renderedSongs, loadSongs } from '../model/songlist';
import SearchAppBar from '../components/Menu';
import MediaControlCard from '../components/AudioPlayer';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core';

function Songlist() {
    const classes = useStyles();
    const songs = useStore($renderedSongs)
    const currentSong = useStore($currentSongItem)
    React.useEffect(() => {
        loadSongs()
    }, [])

    // if (songs.length === 0) {
    //     return <p className="center"> ПЕСЕН НЕТ О__О </p>
    // }

    return (
        <div className={classes.root}>
            <SearchAppBar />
            <div className={classes.title}>
            {currentSong && <p >
                И тут заиграл... <b>{currentSong.songname} от {currentSong.artist}</b>
            </p>}
            </div>
            {songs.map((song, index) => {
                return (<div key={song.id}>
                    <MediaControlCard
                        filename={song.fileName}
                        artist={song.artist}
                        songname={song.songname}
                        picture={song.picture}
                        id={song.id}
                        duration={song.duration}
                        user={song.user_id}
                        index={index}
                    />
                </div>
                )
            })}
        </div>
    )
}
export { Songlist }

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            border: '1px solid #e2e2e1',
            overflow: 'hidden',
            borderRadius: 4,
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:hover': {
            },
            '&$focused': {
                boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
                borderColor: theme.palette.primary.main,
            },
        },
        focused: {},
        title: {
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: theme.spacing(1),
        }
    })
)