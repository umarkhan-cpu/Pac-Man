# Pac-Man

A browser-based Pac-Man clone built with HTML5 Canvas and vanilla JavaScript.

## Play it

Live at [umarkhan-cpu.github.io/Pac-Man](https://umarkhan-cpu.github.io/Pac-Man/)

## Running it locally

Open `index.html` in a browser, or serve the folder with any static server, e.g.:

```
python3 -m http.server
```

Then visit `http://localhost:8000`.

## Controls

- Arrow keys or WASD to move
- Space to pause/resume
- Any key restarts the game after Game Over
- Double-click the best score to reset it (with confirmation)

## Project structure

- `index.html` - page markup and canvas element
- `app.js` - game loop, entity logic, collision, and input handling
- `tileMap.js` - the maze layout
- `style.css` - page styling
- `images/` - sprites (Pac-Man, ghosts, walls, cherry, scared ghost)
- `audios/` - sound effect and music files

## Status

Core gameplay (movement, collision, scoring, lives) is working. Game can be paused/resumed with Space. Best score persists across sessions via localStorage. See below for planned improvements.

## Planned improvements

1. Add sound effects and background music.
2. Add special effects: power food, scared ghosts, cherry
3. More advanced ghost AI (scatter/chase modes, pathfinding)
4. Redesign with proper start/game-over screens, instructions, and a full high score table.
5. Randomly generate a symmetrical maze each game.
6. Adjustable game speed.
7. Two-player mode.