import { createGlobalStyle, css } from 'styled-components'

export const GlobalStyles = createGlobalStyle(
  () => css`
    html {
      height: 100%;
      width: 100%;
    }

    body,
    #__next {
      overflow-x: hidden;
      height: inherit;
      width: inherit;
      margin: 0;
      z-index: 0;
    }

    #root,
    #application {
      font-size: 100%;
      height: inherit;
      width: inherit;
    }

    * {
      box-sizing: border-box;
    }

    a {
      text-decoration: none;
      color: inherit;
    }
  `
)
