import axios from 'axios'

export const getSongs = (filter?: string) => axios.get('/api/songs',{
    params: {filter}
})

export const uploadSongs = (files:File[]) => {
    const formData = new FormData()
    for(const file of files){
        formData.append('songs', file)
    }
    return axios.post('/api/profile/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

export const getFavTrack = (filter?: boolean) => axios.get('/api/songs', {
  params: {filter}
})

export const trackFavorite = (song_id: number) => {
  return axios.post('/api/songs/like', {
    song_id
  })
}

export const trackUnfavorite = (song_id: number) => {
  return axios.post('/api/songs/dislike', {
    song_id
  })
}