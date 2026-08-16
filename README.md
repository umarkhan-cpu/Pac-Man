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

Power pellets are in: 2 of the 4 on the board are randomly chosen each level to grant temporary ghost immunity (~7s), with a flashing warning near the end of the window. All 4 pellets still award points; only the 2 active ones trigger immunity. Eating ghosts is intentionally not implemented yet - passing through a scared ghost is currently a no-op.

## Planned improvements

1. Ghost house - dedicated maze tiles, per-ghost state (`house` / `exiting` / `active`)
2. Eating ghosts - collision-while-scared triggers an eaten state instead of a no-op, with combo scoring
3. Pathfinding for eaten ghosts back to the house
4. Chase/scatter AI modes
5. Add sound effects and background music.
6. Cherry / bonus fruit.
7. Redesign with proper start/game-over screens, instructions, and a full high score table.
8. Randomly generate a symmetrical maze each game.
9. Two-player mode.