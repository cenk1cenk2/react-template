import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'

export const PageLoader: React.FC = () => {
  return (
    <Fragment>
      {/* Initial Page Loader */}
      <Loader>
        <div className="base">
          <div className="logo" />
          <div className="spinner">
            <div className="dot" />
            <div className="dots">
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </Loader>
      {/* END Initial Page Loader */}
    </Fragment>
  )
}

export const NProgressBar: React.FC = () => {
  return (
    <Fragment>
      <NProgressStyles>
        <div className="bar" role="bar">
          <div className="peg"></div>
        </div>
        <div className="spinner" role="spinner">
          <div className="spinner-icon"></div>
        </div>
      </NProgressStyles>
    </Fragment>
  )
}

export const NProgressStyles = styled.div(
  () => css`
    .bar {
      background: #efefef;
      position: fixed;
      z-index: 9999;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
    }

    /* Fancy blur effect */
    .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 25px #000000, 0 0 10px #000000;
      opacity: 1;
      -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
      transform: rotate(3deg) translate(0px, -4px);
    }

    /* Remove these to get rid of the spinner */
    .spinner {
      display: block;
      position: fixed;
      z-index: 9999;
      top: 15px;
      right: 15px;
    }

    .spinner-icon {
      width: 18px;
      height: 18px;
      box-sizing: border-box;
      border: solid 2px transparent;
      border-top-color: #efefef;
      border-left-color: #efefef;
      border-radius: 50%;
      -webkit-animation: nprogress-spinner 400ms linear infinite;
      animation: nprogress-spinner 400ms linear infinite;
    }

    .nprogress-custom-parent {
      overflow: hidden;
      position: relative;
    }

    .nprogress-custom-parent #nprogress .spinner,
    .nprogress-custom-parent #nprogress .bar {
      position: absolute;
    }

    @-webkit-keyframes nprogress-spinner {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }

    @keyframes nprogress-spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `
)

export const Loader = styled.div(
  ({ theme }) => css`
    /* Make clicks pass-through */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${theme.palette.background.default};
    z-index: 9000;
    opacity: 0.99;
    backdrop-filter: blur(6px);

    .base {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .logo,
    .logo::before,
    .logo::after {
      position: relative;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .logo {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin: auto;
      color: #242424;
      background: url('../assets/imgs/logo/logo.svg') no-repeat 50%/70% #121212;
      box-shadow: inset 0 0 0 2px #404040;
      transform: translate(0, -25%);
    }

    .logo svg {
      fill: ${theme.palette.primary.main};
    }

    .logo::before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border-top: 2px solid ${theme.palette.primary.light};
      border-right: 2px solid ${theme.palette.primary.light};
      animation: logospinner 2.8s ease-in-out infinite;
    }

    @keyframes logospinner {
      25% {
        transform: rotate(-180deg);
      }

      55% {
        transform: rotate(-180deg);
      }

      72% {
        transform: rotate(-275deg);
      }
    }

    .spinner {
      margin: -20px 0 0 -71px;
      width: 142px;
      height: 40px;
      filter: contrast(5);
      -webkit-filter: contrast(5);
      -moz-filter: contrast(5);
      -o-filter: contrast(5);
      -ms-filter: contrast(5);
      z-index: 9025;
      transform: translate(50%, 0);
    }

    .dot {
      position: absolute;
      width: 16px;
      height: 16px;
      left: 15px;
      filter: blur(4px);
      -webkit-filter: blur(4px);
      -moz-filter: blur(4px);
      -o-filter: blur(4px);
      -ms-filter: blur(4px);
      background: #efefef;
      border-radius: 50%;
      transform: translateX(0);
      animation: dot 2.8s infinite;
    }

    .dots {
      transform: translateX(0);
      margin-top: 12px;
      margin-left: 31px;
      animation: dots 2.8s infinite;
    }

    .dots div {
      display: block;
      float: left;
      width: 16px;
      height: 16px;
      margin-left: 16px;
      filter: blur(4px);
      -webkit-filter: blur(4px);
      -moz-filter: blur(4px);
      -o-filter: blur(4px);
      -ms-filter: blur(4px);
      background: #efefef;
      border-radius: 50%;
    }

    @-moz-keyframes dot {
      50% {
        transform: translateX(96px);
      }
    }

    @-webkit-keyframes dot {
      50% {
        transform: translateX(96px);
      }
    }

    @-o-keyframes dot {
      50% {
        transform: translateX(96px);
      }
    }

    @keyframes dot {
      50% {
        transform: translateX(96px);
      }
    }

    @-moz-keyframes dots {
      50% {
        transform: translateX(-31px);
      }
    }

    @-webkit-keyframes dots {
      50% {
        transform: translateX(-31px);
      }
    }

    @-o-keyframes dots {
      50% {
        transform: translateX(-31px);
      }
    }

    @keyframes dots {
      50% {
        transform: translateX(-31px);
      }
    }
  `
)
