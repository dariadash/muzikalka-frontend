import { uploadSongs } from '../../dal'
import {uploadSongsFx} from './index'

uploadSongsFx.use((files) => uploadSongs(files))