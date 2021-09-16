import React from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

type Props = {
  onFiles: (files:any) => void
}
export const Dragger: React.FC<Props> = ({onFiles}) => {
  const onDrop = React.useCallback((files) => {
    onFiles(files)
  },[])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <Wrapper {...getRootProps()}>
      <Input {...getInputProps()}/>
      {!isDragActive 
        ? <>Перетащите файлы / Нажмите для загрузки</>
        : <h3>Отпустите файлы для начала загрузки</h3>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  border: 1px dashed #111;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`

const Input = styled.input`
  display:none;
`