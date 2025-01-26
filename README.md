# Memory Game Project

## Overview
This project is a web-based memory game. The game includes multiple difficulty levels, a user registration system, and persistent score tracking for each player using JSON storage.

## Features
- **Memory Game:**
  - Flip and match pairs of cards to win.
  - Multiple levels of difficulty to suit all players.
- **User Registration:**
  - Players can register with a username.
  - Scores and game statistics are tracked per user.
- **Persistent Storage:**
  - Player data, including scores and the number of games played, is saved in JSON format for future reference.

## Technologies Used
- **HTML:** Structure of the web pages.
- **CSS:** Styling design and layout to enhance the visual appeal.
- **JavaScript:** Game logic, user interactions, and data management.

## How It Works
1. **Registration:**
   - Users are prompted to register with a unique username.
   - Existing users' data is retrieved if they return to the site.

2. **Gameplay:**
   - Players choose a difficulty level.
   - The game board is dynamically generated based on the chosen level.
   - Players flip cards to find matching pairs. The game tracks their progress and time.

3. **Scoring and Statistics:**
   - After each game, the user's score and the number of games played are updated.
   - Data is stored in JSON format locally for persistent tracking.

## How to Use
1. Open the `index.html` file in any modern web browser.
2. Register with a username.
3. Choose a difficulty level and start playing.
4. View your score and statistics.
