import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui;
    padding:1em 3em 3em 3em;

    background-color:#eee;
    color:#222;


    @media (prefers-color-scheme:dark) {
        background-color:#222;
        color:#eee;
    }
  }

  ul {
    padding-left:1em;
  }

  li {
    margin:0.8em 0;
  }

  a {
    @media (prefers-color-scheme:dark) {
      color:#81b0fb;
    }

    &:visited {
      @media (prefers-color-scheme:dark) {
        color:#d270ff;
      }
    }
  }

`;
