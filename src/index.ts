import { Robot } from './models/Robot'
import { Direction, Position } from './types'

interface CliArgs {
	room?: string
	start?: string
	commands?: string
}

// parse the input arguments from command line
function parseArgs(): CliArgs {
	const args = process.argv.slice(2)
	const cliArgs: CliArgs = {}

	args.forEach((arg, i) => {
		if (arg === '--room') cliArgs.room = args[i + 1]
		if (arg === '--start') cliArgs.start = args[i + 1]
		if (arg === '--commands') cliArgs.commands = args[i + 1]
	})

	return cliArgs
}

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
	const args = parseArgs()

	try {
		if (!args.room || !args.start || !args.commands) {
			throw new Error(
				'Missing required CLI arguments: --room, --start, --commands'
			)
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
	} catch (error) {
		console.error('Error:', (error as Error).message)
		process.exit(1)
	}
}

main()
