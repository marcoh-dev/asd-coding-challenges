import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
    --color-nemo: #ff4a11;
    --color-granite: #333;
    --color-water-10: #ddd;
    --color-foam: #eee;

    --gap: 20px;


@media (prefers-color-scheme: dark) {
    --color-foam: #333;
    --color-water-10: #444;
    --color-granite: #eee;
}
  }

  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    display: grid;
    margin: auto;
    font-family: system-ui;
    place-items: center;
    min-height: 100vh;
    max-width: 50rem;

    background:var(--color-foam);
    color:var(--color-granite);
  }

  button {
    color:inherit;
  }

  input, textarea {
    background:var(--color-granite);
    color:var(--color-foam);
    background:#ddd;
    color:#444;
  }
`;
