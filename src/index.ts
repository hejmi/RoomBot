import { Robot } from './models/Robot'
import { Direction, Position } from './types'
import readline from 'readline'
import { CliArgs, parseArgs } from './utils/cliParser'

// create the room
function parseRoom(roomStr: string): [number, number] {
	const [w, h] = roomStr.split(' ').map(Number)
	if (!Number.isInteger(w) || !Number.isInteger(h)) {
		throw new Error('Invalid room size')
	}
	return [w, h]
}

// create the start position for robot
function parseStart(startStr: string): Position {
	const [xStr, yStr, dir] = startStr.split(' ')
	const x = Number(xStr)
	const y = Number(yStr)
	if (!['N', 'E', 'S', 'W'].includes(dir)) {
		throw new Error('Invalid start direction')
	}
	if (!Number.isInteger(x) || !Number.isInteger(y)) {
		throw new Error('Invalid start position coordinates')
	}
	return { x, y, direction: dir as Direction }
}

async function main() {
	const args: CliArgs = parseArgs(process.argv.slice(2))

	// interactive cli mode
	if (args.interactive) {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		})

		const question = (prompt: string) =>
			new Promise<string>((resolve) => rl.question(prompt, resolve))

		try {
			const roomInput = await question('Enter room size (e.g., 5 5): ')
			const startInput = await question(
				'Enter robot start position (e.g., 1 2 N): '
			)
			const commandsInput = await question(
				'Enter command string (e.g., RFRFFRFRF): '
			)

			rl.close()

			const [roomW, roomH] = parseRoom(roomInput.trim())
			const startPos = parseStart(startInput.trim())
			console.log(`Room Size: ${roomW} ${roomH}`)
			console.log(
				`Start Position: ${startPos.x} ${startPos.y} ${startPos.direction}`
			)
			console.log(`Commands: ${commandsInput.trim()}`)

			const robot = new Robot(roomW, roomH, startPos)
			const finalPos = robot.executeCommands(commandsInput.trim())

			console.log(`\nReport: ${finalPos.x} ${finalPos.y} ${finalPos.direction}`)
		} catch (error) {
			console.error('Error:', (error as Error).message)
			process.exit(1)
		}
	} else {
		// standard cli mode
		try {
			if (!args.room || !args.start || !args.commands) {
				throw new Error(
					'Missing required CLI arguments: --room, --start, --commands'
				)
			}
		} catch (error) {
			console.error('Error:', (error as Error).message)
			process.exit(1)
		}

		const [roomW, roomH] = parseRoom(args.room.trim())
		const startPos = parseStart(args.start.trim())

		console.log(`Room Size: ${roomW} ${roomH}`)
		console.log(
			`Start Position: ${startPos.x} ${startPos.y} ${startPos.direction}`
		)
		console.log(`Commands: ${args.commands.trim()}`)

		const robot = new Robot(roomW, roomH, startPos)
		const finalPos = robot.executeCommands(args.commands.trim())

		console.log(`\nReport: ${finalPos.x} ${finalPos.y} ${finalPos.direction}`)
	}
}

main()
