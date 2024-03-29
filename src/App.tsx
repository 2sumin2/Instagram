import React from 'react';
import { useRecoilValue } from 'recoil';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { isLightAtom } from './atoms';
import Router from './Router';
import { ApolloProvider } from "@apollo/client";
import { darkTheme, lightTheme } from './theme';
import { client } from './apollo';

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  font-size:14px;
  vertical-align: baseline;
  font-family: 'Source Sans Pro', sans-serif;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
*{
  box-sizing: border-box;
  color:inherit;
}
body{
  font-family: 'Red Hat Mono', monospace;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
}
button{
  cursor: pointer;
  font-size:12px;
  border:0;
  background:inherit;
}
input{
  font-size:13px;
}
`;

function App() {
  const isLight = useRecoilValue(isLightAtom);
  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
