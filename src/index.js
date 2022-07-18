import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/system";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import theme from "./components/theme";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import ProtectedRoute from "./components/ProtectedRoute";

//pages
import App from "./App";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AllUsers from "./pages/AllUsers";
import FollowedUsers from "./pages/FollowedUsers";

const container = document.getElementById("root");
const root = createRoot(container);
let persistor = persistStore(store);

root.render(
  <Router>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="allusers" element={<AllUsers />} />
                <Route path="followedusers" element={<FollowedUsers />} />
              </Route>
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
