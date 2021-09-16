import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import { Paper } from '@material-ui/core';
import { 
  $currentSongId, 
  nextTrack, 
  prevTrack, 
  pausePlaying, 
  $trackPaused, 
  playSameTrack, 
  playNewTrack, 
  stopPlaying, 
  trackFastForward,
  trackRewind,
  $interval,
  stopInterval
 } from '../model/songlist';
import { useStore } from 'effector-react';
import { Tracker } from './Trackers';
import { Timer } from './Timer';
import { CloseRounded, FastForwardRounded, FastRewindRounded, RepeatOne, RepeatOneRounded } from '@material-ui/icons';
import { Favorite } from './Favorites';
import InputSlider from './Volume';
import { useLongPress } from 'use-long-press';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: '0 28px 28px rgba(0, 0, 0, 0.2)',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(1),
    },
    details2: {
      display: 'flex',
      flexDirection: 'row',
    },
    cardContent: {
      flexShrink: 1,
      flexGrow: 1,
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
      height: 151,
    },
    controls: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    controlsMain: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    controllLike: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    controllVol: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: theme.spacing(1),
      margin: theme.spacing(1),
    },
    wrapper2: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: theme.spacing(1),
      margin: theme.spacing(1),
    }
  }),
);

type Props = {
  artist: string,
  songname: string,
  filename: string,
  picture: string,
  id: number,
  duration: number,
  user: number | null
  index: number
}

export default function MediaControlCard(props: Props) {
  const { songname, artist, filename, picture, id, duration, user, index } = props
  const classes = useStyles();

  const musicPaused = useStore($trackPaused)
  const currentTrackId = useStore($currentSongId)
  const visible = currentTrackId === index
  const playing = visible && !musicPaused
  const valueInterval = useStore($interval)

  const onFastForward = useLongPress(() => {
    trackFastForward()
  }, {
    threshold: 500,
    captureEvent: true,
    onStart: () => trackFastForward(),
    onFinish: () => stopInterval(),
    onCancel: () => nextTrack(),
  })
  const onRewind = useLongPress(() => {
    trackRewind()
  }, {
    threshold: 500,
    captureEvent: true,
    onStart: () => trackRewind(),
    onFinish: () => stopInterval(),
    onCancel: () => prevTrack(),
  })

  const playAction = () => {
    if (currentTrackId === index) {
      playSameTrack(index)
      return
    }
    playNewTrack(index)
  }

  return (
    <Paper className={classes.wrapper}>
      <div className={classes.wrapper2} onClick={() => playAction()}>
        {artist} - {songname}
        <IconButton size="small" onClick={(e) => {
          e.stopPropagation()
          stopPlaying()
        }}>
          {visible &&
            <CloseRounded />}
        </IconButton>
      </div>
      {visible && (
        <Card className={classes.root}>
          <div className={classes.details}>
            <div className={classes.details2}>
              <CardContent className={classes.cardContent}>
                <Typography component="h5" variant="h5">
                  {songname}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {artist}
                </Typography>
              </CardContent>
              <CardMedia
                className={classes.cover}
                title={`track artwork for ${songname} by ${artist}`}
                image={`/api/files/${picture}`}
              />
            </div>
            <div className={classes.details}>
              <Tracker />
              <>
                <Timer duration={duration} />
              </>
            </div>
            <div className={classes.controls}>
              <div className={classes.controllVol}>
                <InputSlider />
              </div>
              <div className={classes.controlsMain}>
                <IconButton 
                  aria-label="previous"
                  {...onRewind}
                >
                  {
                    Boolean(valueInterval) 
                      ? <FastRewindRounded /> 
                      : <SkipPreviousIcon />
                  }
                </IconButton>
                {!playing &&
                  <IconButton aria-label="play/pause" onClick={() => playAction()}>
                    <PlayArrowIcon className={classes.playIcon} />
                  </IconButton>}
                {playing &&
                  <IconButton aria-label="play/pause" onClick={() => pausePlaying()}>
                    <PauseIcon className={classes.playIcon} />
                  </IconButton>}
                <IconButton 
                  aria-label="next" 
                  {...onFastForward}
                >
                  {
                    Boolean(valueInterval) 
                      ? <FastForwardRounded />
                      : <SkipNextIcon /> 
                  }
                </IconButton>
              </div>
              <IconButton onClick={() => playSameTrack(currentTrackId as number)}>
                <RepeatOneRounded />
              </IconButton>
              <div className={classes.controllLike}>
                <Favorite
                  songId={id}
                  isFavorite={user !== null}
                />
              </div>
            </div>
          </div>
        </Card>)}
    </Paper>
  );
}