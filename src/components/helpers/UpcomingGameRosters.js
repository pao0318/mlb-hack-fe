import React, { useEffect, useState,useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Button } from '@mui/material';

const UpcomingGameRoster = ({ homeTeamId, awayTeamId }) => {
  const [rosterData, setRosterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const { gameId } = useParams();
  const navigate = useNavigate();

  const getUserId = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        return parsedData.user_id; // Return the user_id
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
      }
    }
    return null; // Return null if no user data is found
  };

  const fetchRosters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/fetchTeamRosters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ homeTeamId, awayTeamId, gameId }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setRosterData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch rosters.');
    } finally {
      setLoading(false);
    }
  });

  const submitSelectedPlayers = async () => {
    try {
      const selectedPlayerDetails = selectedPlayers.map((playerId) => {
        const player = selectedTeamPlayers.find((p) => p["Player ID"] === playerId);
        return {
          name: player.Name,
          player_id: player["Player ID"],
          jerseyNumber: player.jerseyNumber || 'N/A', // Ensure this field exists or provide a default
          position: player.Position,
          teamId: selectedTeam === 'Home' ? homeTeamId : awayTeamId,
        };
      });

      const userId = getUserId();
      const payload = {
        team: selectedTeam,
        userTaggedId: userId,
        players: selectedPlayerDetails,
        gameId,
      };

      // Send the payload
      const response = await fetch('http://127.0.0.1:8000/saveSelectedPlayers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      await response.json();
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to save players: ' + err.message);
    }
  };

  useEffect(() => {
    fetchRosters();
  }, [homeTeamId, awayTeamId]);

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
    setSelectedPlayers([]); 
  };

  const handlePlayerSelection = (playerId) => {
    setSelectedPlayers((prevSelected) => {
      if (prevSelected.includes(playerId)) {
        return prevSelected.filter((id) => id !== playerId);
      } else if (prevSelected.length < 9) {
        return [...prevSelected, playerId]; 
      }
      return prevSelected; 
    });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!rosterData) return <Typography>No roster data available.</Typography>;

  const selectedTeamPlayers =
    selectedTeam === 'Home'
      ? rosterData.homeTeam.players
      : selectedTeam === 'Away'
      ? rosterData.awayTeam.players
      : [];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Upcoming Game Rosters
      </Typography>

      {/* Team Selection */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Select Team</InputLabel>
        <Select value={selectedTeam} onChange={handleTeamChange}>
          <MenuItem value="Home">Home</MenuItem>
          <MenuItem value="Away">Away</MenuItem>
        </Select>
      </FormControl>

      {/* Player Selection */}
      {selectedTeam && (
        <>
          <Typography variant="h5">
            {selectedTeam === 'Home' ? 'Home Team Players' : 'Away Team Players'}
          </Typography>
          <Grid container spacing={2}>
            {selectedTeamPlayers.map((player) => (
              <Grid item xs={12} sm={6} md={4} key={player["Player ID"]}>
                <Card>
                  <CardContent>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedPlayers.includes(player["Player ID"])}
                          onChange={() => handlePlayerSelection(player["Player ID"])}
                          disabled={
                            !selectedPlayers.includes(player["Player ID"]) && selectedPlayers.length >= 9
                          }
                        />
                      }
                      label={
                        <>
                          <Typography variant="h6">{player.Name}</Typography>
                          <Typography variant="body2">
                            <strong>Position:</strong> {player.Position || 'Unknown'}
                          </Typography>
                        </>
                      }
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Selected Players */}
          <Typography variant="h6" style={{ marginTop: '20px' }}>
            Selected Players ({selectedPlayers.length}/9)
          </Typography>
          <ul>
            {selectedPlayers.map((playerId) => {
              const player = selectedTeamPlayers.find((p) => p["Player ID"] === playerId);
              return (
                <li key={playerId}>
                  {player?.Name} ({player?.Position || 'Unknown'})
                </li>
              );
            })}
          </ul>

          {/* Confirm Selection Button */}
          <Button
            variant="contained"
            color="primary"
            disabled={selectedPlayers.length !== 9}
            onClick={submitSelectedPlayers}
          >
            Confirm Selection
          </Button>
        </>
      )}
    </div>
  );
};

export default UpcomingGameRoster;
