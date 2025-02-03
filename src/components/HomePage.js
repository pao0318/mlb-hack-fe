import { Card, CardContent, Button } from '@mui/material';
import { SportsBaseball, Group, EmojiEvents } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 p-6">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <motion.h1 
          className="text-6xl font-bold text-yellow-400 mb-4"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Baseball Fantasy League
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-300"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Draft, manage, and win with your dream baseball team!
        </motion.p>
      </div>
      
      {/* Leaderboard Preview */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card className="bg-gray-800 text-white">
            <CardContent className="flex items-center space-x-4 p-6">
              <SportsBaseball className="text-yellow-400 w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold">Top Players</h2>
                <p className="text-gray-400">See who's leading the season.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card className="bg-gray-800 text-white">
            <CardContent className="flex items-center space-x-4 p-6">
              <Group className="text-blue-400 w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold">Join a League</h2>
                <p className="text-gray-400">Compete with friends and rivals.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Call-to-Action */}
      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Button 
          component={Link} 
          to="/dashboard" 
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 text-xl font-bold rounded-full shadow-lg"
        >
          Go to Dashboard
        </Button>
      </motion.div>

      {/* Trophy Icon Animation */}
      <motion.div 
        className="fixed bottom-10 right-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <EmojiEvents className="text-yellow-400 w-16 h-16" />
      </motion.div>
    </div>
  );
};

export default HomePage;