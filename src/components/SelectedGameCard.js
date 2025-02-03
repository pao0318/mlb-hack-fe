import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, Typography, Button, Collapse, Alert, CircularProgress } from '@mui/material';
import PlayerDetails from './helpers/PlayerDetails';

const SelectedGamesCard = () => {
  const [gameData, setGameData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedGameId, setExpandedGameId] = useState(null); // Track which game is expanded
  const [pointsData, setPointsData] = useState({}); // Store points data for each game

  const getUserTaggedId = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        return parsedData.user_id; 
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
      }
    }
    return null; 
  };

  const fetchGameData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const userTaggedId = getUserTaggedId();
    if (!userTaggedId) {
      setError('User ID not found in localStorage.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/findSelectedGames/${userTaggedId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.result, "coming");
      setGameData(data.result); // Set the game data directly from the result
    } catch (err) {
      setError(err.message || 'Failed to fetch game data.');
    } finally {
      setLoading(false);
    }
  }, []); // useCallback ensures function identity is stable

  const submitPointsPayload = async (game) => { 
    if (!game) return;

    // Extract gameId and playerIds from the game object
    const payload = {
        gameId: game.payload.gameId,
        playerIds: game.payload.players.map(player => player.player_id)
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/points', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      // Store points data for this specific game using its gameId
      setPointsData(prevPoints => ({ ...prevPoints, [game.payload.gameId]: data }));
    } catch (err) {
      setError(err.message || 'Failed to submit points payload.');
    }
    
    console.log(payload, "payload");
  };

  useEffect(() => {
    fetchGameData();
  }, [fetchGameData]); // Now the dependency is properly handled

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!gameData.length) return <Typography>No game data available.</Typography>;

  return (
    <div>
      {gameData.map((game) => (
        <Card key={game.id} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Game Details
            </Typography>
            
            <Card 
              variant="outlined" 
              style={{ 
                backgroundColor: '#f0f0f0', 
                marginBottom: '15px', 
                padding: '10px' 
              }}
            >
              <Typography variant="h6" color="primary" align="center">
                {pointsData[game.payload.gameId]?.totalGamePoints !== undefined ? `${pointsData[game.payload.gameId].totalGamePoints} Total Points` : 'Calculate Points'}
              </Typography>
            </Card>

            <Typography variant="body1">
              <strong>Team:</strong> {game.payload.team}
            </Typography>
            <Typography variant="body1">
              <strong>Game ID:</strong> {game.payload.gameId}
            </Typography>
            <Typography variant="body1">
              <strong>User ID:</strong> {game.payload.userTaggedId}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setExpandedGameId(expandedGameId === game.payload.gameId ? null : game.payload.gameId)} // Toggle expanded state
              style={{ marginTop: '10px', marginRight: '10px' }}
            >
              {expandedGameId === game.payload.gameId ? 'Hide Players' : 'Show Players'}
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => submitPointsPayload(game)} // Pass current game to function
              style={{ marginTop: '10px' }}
            >
              Calculate Points
            </Button>

            <Collapse in={expandedGameId === game.payload.gameId} timeout="auto" unmountOnExit>
              <div style={{ marginTop: '10px' }}>
                {game.payload.players.map((player) => (
                  <PlayerDetails key={player.player_id} player={player} />
                ))}
                
                {/* Display Player Points */}
                {pointsData[game.payload.gameId] && (
                  <div style={{ marginTop: '10px' }}>
                    <Typography variant="h6">Player Points</Typography>
                    {Object.entries(pointsData[game.payload.gameId].playerPoints).map(([playerId, point]) => (
                      <Typography key={playerId}>
                        Player ID: {playerId}, Points: {point}
                      </Typography>
                    ))}
                  </div>
                )}
              </div>
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SelectedGamesCard;
