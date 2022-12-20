import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 html {
  box-sizing: border-box;
  font-size: 62.5%;
  height:100vh;

}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.site-button {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    font-family: 'Poppins';

    margin: 0 auto;
    padding: 16px;

    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.primary};

    transition: all 0.6s;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: transparent;
}

.loading{
    fleX:1;
    display: flex;

    align-items: center;
    justify-content: center;

    height: 300px;
}

.fluid-width {
  width: 100%;
}

.site-button:hover {
    background-color: ${({ theme }) => theme.colors.primary};

    color: white;
}

.site-button-fill {


        font-family: 'Poppins';

        background: ${({ theme }) => theme.colors.primary};
        color: white;
        font-size: 1.6rem;

        margin: 0 auto;
        padding: 16px;

        transition: all 0.6s;

        display: flex;
        justify-content: center;
        align-items: center;
    }

*:disabled {
      background-color: dimgrey !important;
      color: linen;
      opacity: 1;

      cursor: not-allowed;
    }

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

html,body{
  scroll-behavior: smooth !important;

}
.bold{
   font-weight: bold;
}
html,body {
  font-family: "Poppins", sans-serif !important;
}
*, *:before, *:after {
  box-sizing: border-box;
  border:0;
}
button{
  cursor: pointer;
}
input{ outline:none}
a{
  text-decoration: none;
}
body, h1, h2, h3, h4, h5, h6, p, ol, ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}
ol, ul {
  list-style: none;

}
img {
  max-width: 100%;
  height: auto;
}


//responsive
@media (max-width: 500px) {
  html {
    font-size: 50%;
  }
}
`;
