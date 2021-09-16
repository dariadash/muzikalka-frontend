import { combine, createDomain, guard } from 'effector'

export const Player = new Audio()
const d = createDomain()

type Song = {
    id: number,
    artist: string,
    songname:string,
    fileName:string,
    picture: string,
    duration: number,
    user_id: number | null
}
export const $songs = d.store<Song[]>([])
export const $searchInput = d.store('')
export const setSearchInput = d.event<string>()
type GetSongsFxPayload = {
    filter: string
}
export const getSongsFx = d.effect<GetSongsFxPayload, any>()

export const $showFavoriteTracks = d.store(false)
export const toggleFavorites = d.event()

export const trackFavoriteFx = d.effect<number, any>()
export const trackUnfavoriteFx = d.effect<number, any>()
export const $renderedSongs = combine(
    $songs,
    $showFavoriteTracks,
    (songs, showFavoriteTracks) => {
        if (!showFavoriteTracks) {
            return songs
        }
        return songs.filter(
            (song) => Boolean(song.user_id)
        )
    }
)

export const $currentSongId = d.store<number | null>(null)
export const $currentSongItem = combine(
    $renderedSongs,
    $currentSongId, 
    (songs, currentSongId) => {
        if (currentSongId === null) {
            return null
        }
        return songs[currentSongId]
    }
)

export const nextTrack = d.event()
export const prevTrack = d.event()

export const pausePlaying = d.event()
export const stopPlaying = d.event()

export const playSongId = d.event<number>()
export const loadSongs = d.event<void>()

export const nextTrackGuarded = guard({
    clock: nextTrack,
    source: combine($currentSongId, $renderedSongs),
    filter: ([songId,songs]) => {
        return songId !== null && songId <= songs.length - 1
    }
})

export const $trackPaused = d.store(true);

export const playSameTrack = guard({
    source: playSongId,
    clock: playSongId,
    filter: (currentSongId, songFromPayloadId) => {
        return currentSongId === songFromPayloadId
    }
})
 
export const playNewTrack = guard({
    source: $currentSongId,
    clock: playSongId,
    filter: (currentSongId, songFromPayloadId) => {
        return currentSongId !== songFromPayloadId
    }
})

export const $volume = d.store<number>(30);
export const handleVolume = d.event<number>()

export const $interval = d.store<NodeJS.Timeout | null>(null);
export const stopInterval = d.event()
export const trackFastForward = d.event();
export const trackRewind = d.event()

export const $sameSong = d.store(false)