import { Direction, Position } from '../types'

const validDirections: Direction[] = ['N', 'E', 'S', 'W']

export class InputValidator {
	/*
	 * Validates the room size input string.
	 * Throws an error if the input is invalid.
	 * @param roomStr - The input room size to validate.
	 * @returns An array containing the width and height of the room.
	 */
	static validateRoomSize(roomStr: string): [number, number] {
		const [width, height] = roomStr.split(' ').map(Number)

		if (!Number.isInteger(width) || !Number.isInteger(height)) {
			throw new Error('Room dimensions must be integers.')
		}

		if (width <= 0 || height <= 0) {
			throw new Error('Room dimensions must be greater than zero.')
		}

		return [width, height]
	}

	/*
	 * Validates the start position input string.
	 * Throws an error if the input is invalid.
	 * @param startStr - The input start position to validate.
	 * @param room - The dimensions of the room.
	 * @returns An object containing the x, y, and direction of the start position.
	 */
	static validateStartPosition(
		startStr: string,
		room: [number, number]
	): Position {
		const [xStr, yStr, dir] = startStr.split(' ')
		const x = Number(xStr)
		const y = Number(yStr)

		const [roomW, roomH] = room

		if (!Number.isInteger(roomW) || !Number.isInteger(roomH)) {
			throw new Error('Room dimensions must be integers.')
		}

		if (roomW <= 0 || roomH <= 0) {
			throw new Error('Room dimensions must be greater than zero.')
		}

		if (!validDirections.includes(dir.toUpperCase() as Direction)) {
			throw new Error(`Invalid direction '${dir}'. Use one of: N, E, S, W.`)
		}

		if (isNaN(x) || isNaN(y) || x < 0 || x >= roomW || y < 0 || y >= roomH) {
			throw new Error(
				`Start position (${x}, ${y}) is out of bounds for room size ${roomW}x${roomH}`
			)
		}

		return { x, y, direction: dir.toUpperCase() as Direction }
	}

	/*
	 * Validates the commands input string.
	 * Throws an error if the input is invalid.
	 * @param commandsStr - The input commands to validate.
	 * @returns The commands string if it is valid.
	 */
	static validateCommands(commandsStr: string): string {
		if (!commandsStr.match(/^[RFL]+$/)) {
			throw new Error(
				'Invalid commands - Only RFL allowed or did you forget to wrap in quotes?'
			)
		}
		return commandsStr
	}
}
