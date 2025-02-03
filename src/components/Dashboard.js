import React, { useState } from 'react';
import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
import UpcomingMatchesTab from './UpcomingMatchesTab';
import PreviousMatchesTab from './PreviousMatchesTab';
import SelectedGamesCard from './SelectedGameCard';
import PlayerStatsTab from './PlayerStatsTab';


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Upcoming Matches" />
        <Tab label="Previous Matches" />
        <Tab label="Your Selected Teams" />
        <Tab label="Player Stats" />
      </Tabs>
      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && <UpcomingMatchesTab />}
        {activeTab === 1 && <PreviousMatchesTab />}
        {activeTab === 2 && <SelectedGamesCard />}
        {activeTab === 3 && <PlayerStatsTab />}
      </Box>
    </Container>
  );
};

export default Dashboard;