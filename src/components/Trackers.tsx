import { Slider } from '@material-ui/core'
import React from 'react'
import {nextTrack, Player} from '../model/songlist'

const REFRESH_MS = 1000

export const Tracker = () => {
    const [currentTime, setCurrentTime] = React.useState(0)
    const [totalTime, setTotalTime] = React.useState(0) 
    React.useEffect(()=>{
        const subscribe = setInterval(()=>{
            const currentSeconds = Math.floor(Player.currentTime)
            setCurrentTime(currentSeconds)
            setTotalTime(Player.duration)
            // костыль,ну а чо делать
            if (Player.duration - 1 < Player.currentTime) {
                nextTrack()
            }
        }, REFRESH_MS)
        return () => {
            clearInterval(subscribe)
        }
    },[])

    
    const onChange = (value: number | number[]) => {
        const castedValue = value as number
        Player.currentTime = castedValue
        setCurrentTime(Math.floor(castedValue))
    }
    return (
        <>
            <Slider
                value={currentTime}
                max={totalTime}
                onChange={(_,value) => onChange(value)}
            />
        </>
    )
}