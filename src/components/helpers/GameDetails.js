import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";

const GameDetails = () => {
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://statsapi.mlb.com/api/v1/game/${gameId}/boxscore/`)
      .then((response) => response.json())
      .then((data) => {
        setGameDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching game details:", error);
        setLoading(false);
      });
  }, [gameId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!gameDetails) {
    return <Typography>No game details found.</Typography>;
  }

  const { teams } = gameDetails;

  // Helper function to render rows for players
  const renderPlayerRows = (players) =>
    Object.values(players).map((player, index) => {
      const { person, stats, position, seasonStats } = player;
      return (
        <TableRow key={index}>
          <TableCell sx={{ padding: "4px 8px" }}>{person.fullName}</TableCell>
          <TableCell sx={{ padding: "4px 8px" }}>{position.abbreviation}</TableCell>
          <TableCell sx={{ padding: "4px 8px" }}>{stats.batting?.atBats || "-"}</TableCell>
          <TableCell sx={{ padding: "4px 8px" }}>{stats.batting?.runs || "-"}</TableCell>
          <TableCell sx={{ padding: "4px 8px" }}>{stats.batting?.hits || "-"}</TableCell>
          <TableCell sx={{ padding: "4px 8px" }}>{stats.batting?.rbi || "-"}</TableCell>
          <TableCell sx={{ padding: "4px 8px" }}>{stats.batting?.baseOnBalls || "-"}</TableCell>
          <TableCell sx={{ padding: "4px 8px" }}>{stats.batting?.strikeOuts || "-"}</TableCell>
          <TableCell sx={{ padding: "4px 8px" }}>{seasonStats.batting?.avg || "-"}</TableCell>
          <TableCell sx={{ padding: "4px 8px" }}>{seasonStats.batting?.ops || "-"}</TableCell>
        </TableRow>
      );
    });

  return (
    <div>
      {/* Game Summary */}
      <Typography variant="h5" gutterBottom>
        {teams.away.team.name} vs {teams.home.team.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Date:</strong> {gameDetails.gameDate}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <strong>Final Score:</strong> {teams.away.teamStats.runs} -{" "}
        {teams.home.teamStats.runs}
      </Typography>

      {/* Away Team Batters */}
      <Typography variant="h6" gutterBottom>
        {teams.away.team.name} Batters
      </Typography>
      <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: "4px 8px" }}>Player</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>Pos</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>AB</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>R</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>H</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>RBI</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>BB</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>K</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>AVG</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>OPS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderPlayerRows(teams.away.players)}</TableBody>
        </Table>
      </TableContainer>

      {/* Home Team Batters */}
      <Typography variant="h6" gutterBottom>
        {teams.home.team.name} Batters
      </Typography>
      <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: "4px 8px" }}>Player</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>Pos</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>AB</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>R</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>H</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>RBI</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>BB</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>K</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>AVG</TableCell>
              <TableCell sx={{ padding: "4px 8px" }}>OPS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderPlayerRows(teams.home.players)}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GameDetails;
