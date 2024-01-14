import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    ${(props) => props.theme}
  }

  * {
	box-sizing: border-box;
  }
  
  body {
    font-family: NanumSquareRound;
  }
`;
