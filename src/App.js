import React from "react";
import { 
  BrowserRouter as Router, 
  Route, 
  Routes, 
  Link, 
  Navigate,
  useLocation
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import { useThemeContext } from "./themeContext";
import { AppBar, Toolbar, Button, IconButton, Typography } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Chatbot from "./components/Chatbot";
import GameDetails from "./components/helpers/GameDetails";
import UpcomingGameRoster from "./components/helpers/UpcomingGameRosters";
import HomePage from "./components/HomePage";


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => {
  const { darkMode, setDarkMode } = useThemeContext();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          {!isLoggedIn && (
            <>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </>
          )}
          {isLoggedIn && (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              
              <Button 
                color="inherit" 
                onClick={() => {
                  localStorage.removeItem('isLoggedIn');
                  localStorage.removeItem('user');
                  window.location.href = '/';
                }}
              >
                Logout
              </Button>
            </>
          )}
          <IconButton
            color="inherit"
            onClick={() => setDarkMode((prev) => !prev)}
            sx={{ marginLeft: 'auto' }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
        <Chatbot />
      </AppBar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/signup" 
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Signup />
          } 
        />
        <Route path="/game/:gameId" element={<GameDetails />} />
        <Route path="/roster/:gameId" element={<UpcomingGameRosterWrapper />} />
        <Route 
          path="/login" 
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />
          } 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

// Wrapper for UpcomingGameRoster to handle the state passed via `navigate`
const UpcomingGameRosterWrapper = () => {
  const { state } = useLocation();
  const { homeTeamId, awayTeamId } = state || {};

  if (!homeTeamId || !awayTeamId) {
    return <Typography>No team information provided.</Typography>;
  }

  return <UpcomingGameRoster homeTeamId={homeTeamId} awayTeamId={awayTeamId} />;
};

export default App;
