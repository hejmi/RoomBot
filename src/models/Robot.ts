import { Direction, Position } from '../types'

const directions: Direction[] = ['N', 'E', 'S', 'W']

const directionMoves: Record<Direction, [number, number]> = {
	N: [0, -1], // move up
	E: [1, 0], // move right
	S: [0, 1], // move down
	W: [-1, 0], // move left
}

export class Robot {
	position: Position
	roomW: number
	roomH: number

	constructor(roomW: number, roomH: number, startPosition: Position) {
		this.roomW = roomW
		this.roomH = roomH
		this.position = startPosition
	}

	// fn to turn the robot left
	private turnLeft(): void {
		const currentIdx = directions.indexOf(this.position.direction)
		this.position.direction = directions[(currentIdx + 3) % 4]
	}

	// fn to turn the robot right
	private turnRight(): void {
		const currentIdx = directions.indexOf(this.position.direction)
		this.position.direction = directions[(currentIdx + 1) % 4]
	}

	// fn to move the robot forward based on the current direction
	private moveForward(): void {
		const [dx, dy] = directionMoves[this.position.direction]
		const newX = this.position.x + dx
		const newY = this.position.y + dy

		if (newX < 0 || newX >= this.roomW || newY < 0 || newY >= this.roomH) {
			throw new Error(`Robot moved out of bounds to (${newX}, ${newY})`)
		}

		this.position.x = newX
		this.position.y = newY
	}

	// cli commands to control the robot
	public executeCommands(commands: string): Position {
		for (const cmd of commands) {
			switch (cmd) {
				case 'L':
					this.turnLeft()
					break
				case 'R':
					this.turnRight()
					break
				case 'F':
					this.moveForward()
					break
				default:
					throw new Error(`Invalid command: ${cmd}`)
			}
		}
		return this.position
	}
}
