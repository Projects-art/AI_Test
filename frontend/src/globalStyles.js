import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.body};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background 0.3s, color 0.3s;
  }

  h1, h2, h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }
`;

export default GlobalStyle;
