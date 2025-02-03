import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const PlayerStatsTab = () => {
  const [playerName, setPlayerName] = useState("Chase Utley"); // Default player
  const [year, setYear] = useState(2008); // Default year
  const [playerStats, setPlayerStats] = useState(null); // Holds the player stats
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Holds error messages if API fails

  const fetchPlayerStats = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your FastAPI backend endpoint
      const response = await axios.post(`http://127.0.0.1:8000/playerCareerStats`, {
        player_name: playerName,
        season: year,
      });
      setPlayerStats(response.data);
    } catch (error) {
      console.error("Error fetching player stats:", error);
      setError("Failed to load player stats. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchStats = () => {
    fetchPlayerStats();
  };

  if (loading) {
    return (
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading Player Stats...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!playerStats) {
    return (
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="h6">
          Enter details and fetch player stats.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Player Name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={year}
              label="Year"
              onChange={(e) => setYear(e.target.value)}
            >
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2008}>2008</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleFetchStats}>
            Fetch Stats
          </Button>
        </Box>
      </Box>
    );
  }

  // Bar Chart Data
  const barChartData = [
    { name: "Runs", value: playerStats.runs },
    { name: "Home Runs", value: playerStats.homeRuns },
    { name: "RBIs", value: playerStats.rbi },
    { name: "Strike Outs", value: playerStats.strikeOuts },
  ];

  // Pie Chart Data
  const pieChartData = [
    { name: "Ground Outs", value: playerStats.groundOuts },
    { name: "Air Outs", value: playerStats.airOuts },
    { name: "Home Runs", value: playerStats.homeRuns },
  ];

  // Radar Chart Data
  const radarChartData = [
    { stat: "Runs", value: playerStats.runs, fullMark: 1500 },
    { stat: "RBIs", value: playerStats.rbi, fullMark: 1500 },
    { stat: "OPS", value: playerStats.ops * 1000, fullMark: 1500 }, // Scaled for visualization
    { stat: "Batting Avg", value: playerStats.avg * 1000, fullMark: 1000 },
  ];

  // Line Chart Data (Monthly Home Runs Trend)
  const lineChartData = playerStats.monthlyStats
    ? Object.entries(playerStats.monthlyStats).map(([month, data]) => ({
        month,
        homeRuns: data.homeRuns || 0,
      }))
    : [];

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Player Stats for {year}: {playerName}
      </Typography>

      <Grid container spacing={3}>
        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Key Stats Comparison
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Outs Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#0088FE", "#00C49F", "#FFBB28"][index % 3]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        {/* Radar Chart */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Player Performance Radar
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarChartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="stat" />
              <PolarRadiusAxis />
              <Radar
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Monthly Home Runs Trend
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="homeRuns" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayerStatsTab;
