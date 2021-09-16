import React from 'react'
import styled from 'styled-components'
import { toDateTime } from '../lib/converter'
import { Player } from '../model/songlist'

export const Timer = ({duration}:{duration:number}) => {
    const [curTime, setCurTime] = React.useState(0)
    React.useEffect(() => {
        const subscription = setInterval(() =>  {
            setCurTime(Player.currentTime)
        }, 1000)

        return () => {
            clearInterval(subscription)
        }
    }, [])
    
    return (
        <Wrapper>
            <div>
            {toDateTime(Math.floor(curTime))}
            </div>
            <div>
            {toDateTime(duration)}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`