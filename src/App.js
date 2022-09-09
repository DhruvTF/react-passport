import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./Routes";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./App.css";

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <AllRoutes />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
