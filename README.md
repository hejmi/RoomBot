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

- `--room`: The size of the room in the format `width height`
- `--start`: The starting position of the robot in the format `x y direction`
- `--commands`: The commands to execute in the format `RFRFFRFRF` - where `R` is
  the turn right command, `L` is the turn left command and `F` is the move
  forward command.

## Example

```bash
npx ts-node src/index.ts --room "5 5" --start "1 2 N" --commands "RFRFFRFRF"
Room Size: 5 5
Start Position: 1 2 N
Commands: RFRFFRFRF

Report: 1 3 N
```
