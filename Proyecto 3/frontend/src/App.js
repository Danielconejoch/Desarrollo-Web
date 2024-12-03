import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LyricsGenerator from "./components/LyricsGenerator";
import SignIn from "./components/SignIn"; // Asegúrate de tener este archivo creado
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
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/lyrics" element={<LyricsGenerator />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
