import React from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { useStore } from 'effector-react';
import { $volume, handleVolume } from '../model/songlist';
import { VolumeDownRounded, VolumeOffRounded, VolumeUpRounded } from '@material-ui/icons';
import styled, { css } from 'styled-components'

export default function InputSlider() {
  const volume = useStore($volume)

  const [isShown, setIsShown] = React.useState(false);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    handleVolume(newValue as number)
  };

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   handleVolume(parseInt(event.target.value))
  // };

  const visibleMax = volume >= 50
  const unvisible = volume === 0

  return (
    <Wrapper 
      isShown={isShown}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}  
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item >
          {visibleMax ? <VolumeUpRounded /> : <VolumeDownRounded />
            &&
            unvisible ? <VolumeOffRounded /> : <VolumeDownRounded />}
        </Grid>
          <Grid item xs>
            <Slider
              className={'slideriko'}
              value={volume}
              onChange={handleSliderChange}
              aria-labelledby="input-slider" />
          </Grid>
      </Grid>
    </Wrapper>
  );
}

type WrapperProps = {
  isShown: boolean
}
const Wrapper = styled.div<WrapperProps>`
  width: 90px;

  .slideriko {
  opacity: 0;
  transform: translateX(-25%);
  transition: 0.4s;
  ${({isShown}) => isShown && css`
      transform: translateX(0);
      opacity: 1;
  `}
  }
`