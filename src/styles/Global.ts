import { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    outline: none;
    font-family: 'Source Sans Pro';
    font-weight: 400;
    scroll-behavior: smooth;
    font-family: 'Maven Pro';
  }

  * {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  html,
  body {
    width: 100%;
    min-height: 100%;
    background: #F8F9FA;
  }

  body {
    overflow-x: hidden;
  }

  button,
  a {
    cursor: pointer;
  }

  h1 {
    font-weight: 700;
    font-size: 56px;
    line-height: 125%;
  }

  h2 {
    font-weight: 700;
    font-size: 40px;
    line-height: 125%;
  }

  h3 {
    font-weight: 700;
    font-size: 32px;
    line-height: 125%;
  }

  h4 {
    font-weight: 700;
    font-size: 24px;
    line-height: 125%;
  }

  h5 {
    font-family: 'Source Sans Pro';
    font-weight: 600;
    font-size: 20px;
    line-height: 125%;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px #fff inset !important;
  }

  input::-webkit-calendar-picker-indicator {
    display: none;
  }

`;