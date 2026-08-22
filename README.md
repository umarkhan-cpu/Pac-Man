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
- `images/` - sprites (Pac-Man, ghosts, walls, cherry, scared/flashing ghost)
- `audios/` - sound effect and music files

## Status

Core gameplay (movement, collision, scoring, lives) is working. Game can be paused/resumed with Space. Best score persists across sessions via localStorage.

Ghost house is in: ghosts have a proper state machine (`house` / `active` / `scared` / `flashing`) instead of a single global flag. Caged ghosts navigate to the door's column and exit upward, then lock out of the house once fully clear. Like before, 2 out of the 4 power pellets now make **all** ghosts scared for ~7s (with a flashing warning near the end), and pellets are worth 50 points again.

Eating ghosts is in too: touching a scared ghost eats it and allots 100 points instead of costing a life. For now this **instantly teleports the ghost back to the house** and re-opens its door - there's no real pathfinding yet, so it doesn't visually travel back as "eyes" like in the original game.

## Suggested improvements

1. Pathfinding for eaten ghosts - replace the instant teleport with real movement back to the house as a pair of "eyes"
2. Chase/scatter AI modes
3. Add sound effects and background music.
4. Cherry / bonus fruit.
5. Redesign with proper start/game-over screens, instructions, and a full high score table.
6. Randomly generate a symmetrical maze each game.
7. Two-player mode.