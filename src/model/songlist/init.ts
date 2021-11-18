import { sample } from "effector";
import { 
    $songs, 
    loadSongs, 
    getSongsFx, 
    $searchInput,
    setSearchInput, 
    $currentSongId, 
    playSongId, 
    $currentSongItem, 
    prevTrack, 
    nextTrackGuarded, 
    $trackPaused, 
    playNewTrack, 
    playSameTrack, 
    stopPlaying, 
    $showFavoriteTracks, 
    trackFavoriteFx, 
    trackUnfavoriteFx, 
    pausePlaying, 
    nextTrack, 
    toggleFavorites, 
    $volume,
    handleVolume,
    trackFastForward,
    trackRewind,
    $interval,
    stopInterval,
    $sameSong
} from ".";
import { getSongs, trackFavorite, trackUnfavorite} from "../../dal";
import {Player} from './index'

$songs
    .on(getSongsFx.doneData, (_,{data}) => data )
    .on(trackFavoriteFx, (songs,songId) => {
        const songItem = songs.findIndex((song) => song.id === songId)
        songs[songItem].user_id = 123
        return [...songs]
    })
    .on(trackUnfavoriteFx, (songs,songId) => {
        const songItem = songs.findIndex((song) => song.id === songId)
        songs[songItem].user_id = null
        return [...songs]
    })

$searchInput
.on(setSearchInput, (_,str) => str)

sample({
    clock: [loadSongs,setSearchInput], 
    target: getSongsFx,
    source: $searchInput,
    fn: (filterStr) => ({ filter:filterStr })
})
getSongsFx.use(({filter}) => getSongs(filter))

$trackPaused
    .on(pausePlaying, () => true)
    .on(playNewTrack, () => false)
    .on(playSameTrack, () => false)
    .on(stopPlaying, () => true)
    .on(prevTrack, () => false)
    .on(nextTrack, () => false)

$currentSongId
    .on(playNewTrack, (_, songId) => songId)
    .on(prevTrack, (songId) => {
        if (songId === null) {
            return songId
        }
        if (songId <= 0) {
            return songId
        }

        return songId - 1
    })
    .on(sample($sameSong,nextTrackGuarded), (songId, sameSongOption) => {
        if (sameSongOption){
            if (songId === null) {
                return songId
            }
            return songId + 1
        }
    })
    .on(playSameTrack, (curSongId, songId) => {
        if (curSongId === songId) {
            if (Player.ended) {
                Player.currentTime = 0
                Player.play()
            }
        }
        return curSongId
    })
    .reset(stopPlaying)

$sameSong.on(playSameTrack, () => true)
    
$interval
    .on(trackFastForward,(curInterval) => {
        if (curInterval) {
            clearInterval(curInterval)
        }
        return setInterval(
            () => {
                if (Player.duration -5 >= Player.currentTime) {
                    Player.currentTime += 5
                } else {
                    nextTrack()
                }
            }, 
        1000)
    })
    .on(trackRewind,(curInterval) => {
        if (curInterval) {
            clearInterval(curInterval)
        }
        return setInterval(() => {
            if (Player.currentTime > 5) {
                Player.currentTime -= 5
            } else {
                prevTrack()
            }
        },1000)
    })
    .on(stopInterval, (intervalSubscription) => {
        clearInterval(intervalSubscription as NodeJS.Timeout)
        return null;
    })

$currentSongItem.updates.watch(async (song) => {
    if (!Boolean(song)) {
        return;
    }
    Player.setAttribute('src', `/api/files/${song?.fileName}`)
    Player.load()
    Player.currentTime = 0
    await Player.play()
})

$currentSongId.watch((st) => {
    console.log('currentSongId')
    console.log(st)
})

pausePlaying.watch(()=>{
    Player.pause()
})

stopPlaying.watch(() => {
    Player.currentTime = 0
    Player.pause()
})

nextTrackGuarded.watch(() => {
    console.log('следующий трек')
})

playSameTrack.watch(()=>{
    Player.play()
     console.log('сейм трек')
 })

playNewTrack.watch((st)=>{
    Player.play()
    console.log('новый трек')
    console.log(st)
})

playSongId.watch((st)=>{
    console.log('плей сонг ид')
    console.log(st)
})

$showFavoriteTracks
    .on(toggleFavorites, (s) => !s)

trackFavoriteFx.use((songId) => {
    return trackFavorite(songId)
})

trackUnfavoriteFx.use((songId) => {
    return trackUnfavorite(songId)
})

$volume
    .on(handleVolume, (_, value) => {
        if (value < 0) {
            return 0
        }
        if (value > 100) {
            return 100
        }
        Player.volume = value / 100
        return value
    })
