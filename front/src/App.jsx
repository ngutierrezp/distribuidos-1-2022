import routes from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppbarComponent from "./components/AppbarComponent";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7858A6",
    },
    secondary: {
      main: "#353742",
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <AppbarComponent />
          <Routes>
            {routes.map((route, index) => {
              return (
                <Route
                  key={`${index}-route`}
                  path={route.path}
                  element={<route.component></route.component>}
                />
              );
            })}
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
