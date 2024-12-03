import React from "react";
import LyricsGenerator from "./components/LyricsGenerator";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LyricsGenerator />
    </ThemeProvider>
  );
}

export default App;
