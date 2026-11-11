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

  input, textarea, button {
    background:#ddd;
    color:#444;
  }



/* rating system in form */
.rating {
  display: flex;
  flex-direction: row-reverse;
  width: min-content;
  position:relative;
}

.rating input {
  position: absolute;
  opacity: 1;
  left: 0;
  height: 0;
  width: 0;
  bottom: 0;
}

.rating label {
  cursor: pointer;
}

.rating label svg {
  width: 1rem;
  height: 1rem;
  fill: black;
}

.rating label:hover svg,
.rating label:hover ~ label svg {
  fill: orange;
}

.rating input:checked ~ label svg {
  fill: orange;
}

/* rating system in headline */
.rating2 {
  --star-size: 16px;
  --gap: 5px;

  position: relative;
  display: inline-block;
}

/* shared row layout */
.stars {
  display: flex;
  gap: var(--gap);
}

.stars svg {
  width: var(--star-size);
  height: var(--star-size);
  flex-shrink: 0;
  fill: orange;
}

.bg svg {
  fill: black;
}

.fill {
  position: absolute;
  inset: 0;
  overflow: hidden;
}



`;
