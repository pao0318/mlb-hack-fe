import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useThemeContext, ThemeContextProvider } from "./themeContext";


const Root = () => {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <Root />
    </ThemeContextProvider>
  </React.StrictMode>
);
