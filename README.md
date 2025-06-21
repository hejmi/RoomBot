# RoomBot - A simple robot simulator

A simple robot simulator that can be used to test the movement logic of a robot.

## Installation

```bash
npm install
```

## Usage

```bash
npx ts-node src/index.ts --room "5 5" --start "1 2 N" --commands "RFRFFRFRF"
```

```bash
npx ts-node src/index.ts --interactive
```

#### Arguments

- `--interactive`: Run the interactive CLI mode (will ignore all other CLI
  arguments)
- `--room`: The size of the room in the format `width height`
- `--start`: The starting position of the robot in the format `x y direction`
- `--commands`: The commands to execute in the format `RFRFFRFRF` - where `R` is
  the turn right command, `L` is the turn left command and `F` is the move
  forward command.

#### Directions

Start position is entered with x, y coordinates and direction. Direction is one
of the following:

- `N`: North
- `E`: East
- `S`: South
- `W`: West

#### Commands

- `L`: Turn left
- `R`: Turn right
- `F`: Move forward

#### Result

The final position of the robot and the direction it is facing is printed to the
console.

#### Example

```bash
npx ts-node src/index.ts --room "5 5" --start "1 2 N" --commands "RFRFFRFRF"
Room Size: 5 5
Start Position: 1 2 N
Commands: RFRFFRFRF

Report: 1 3 N
```

## Interactive Mode

Will ask for the input of room size, start position and commands to execute.

- `Enter room size (e.g., 5 5):` input e.g., `5 5`
- `Enter robot start position (e.g., 1 2 N):` input e.g., `1 2 N`
- `Enter command string (e.g., RFRFFRFRF):` input e.g., `RFRFFRFRF`

Console will print the input arguments and the result of the robot's execution.

```
Room Size: 5 5
Start Position: 1 2 N
Commands: RFRFFRFRF
Report: 1 3 N
```

## Unit Tests

Unit tests are written using Jest and can be run using the following command:

```bash
npm run test
```
