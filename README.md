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
- Any key restarts the game after Game Over

## Project structure

- `index.html` - page markup and canvas element
- `app.js` - game loop, entity logic, collision, and input handling
- `tileMap.js` - the maze layout
- `style.css` - page styling
- `images/` - sprites (Pac-Man, ghosts, walls, cherry, scared ghost)
- `audios/` - sound effect and music files

## Status

Core gameplay (movement, collision, scoring, lives) is working. See below for planned improvements.

## Planned improvements

1. Add sound effects and background music.
2. Fix turning difficulty.
3. Add special effects: power food, scared ghosts, cherry.
4. Ghosts make turn decisions at intersections instead of only turning on collision.
5. Add a pause button, instructions, and menu/end screens.
6. Add a high score table.
7. Randomly generate a symmetrical maze each game.
8. Adjustable game speed.
9. Two-player mode.