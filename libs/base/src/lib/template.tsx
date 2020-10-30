import React from 'react'
import styled from 'styled-components'

/* eslint-disable-next-line */
export interface TemplateProps {}

const StyledTemplate = styled.div`
  color: pink;
`

export const Template: React.FC<TemplateProps> = () => {
  return (
    <StyledTemplate>
      <h1>Welcome to template!</h1>
    </StyledTemplate>
  )
}

export default Template
