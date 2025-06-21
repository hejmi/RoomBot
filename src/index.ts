import readline from 'readline'
import { Robot } from './models/Robot'
import { InputArgs } from './types'
import { CliArgs, parseArgs } from './utils/cliParser'
import { InputValidator } from './utils/InputValidator'
import { Logger } from './utils/logger'

/*
 * Runs the robot with the given input arguments.
 * Uses the InputValidator to validate the input.
 * @param inputArgs - The input arguments to run the robot with.
 */
async function runRobot(inputArgs: InputArgs) {
	try {
		const [roomW, roomH] = InputValidator.validateRoomSize(inputArgs.room.trim())
		const startPos = InputValidator.validateStartPosition(
			inputArgs.start.trim(),
			[roomW, roomH]
		)
		const commands = InputValidator.validateCommands(inputArgs.commands.trim())

		Logger.logStart(roomW, roomH, startPos, commands)

		const robot = new Robot(roomW, roomH, startPos)
		const finalPos = robot.executeCommands(commands.trim())

		Logger.logReport(finalPos)
	} catch (error) {
		Logger.logError(error as Error)
		process.exit(1)
	}
}

/*
 * Main function that runs the robot.
 * Handles both interactive and non-interactive modes.
 */
async function main() {
	const args: CliArgs = parseArgs(process.argv.slice(2))
	let inputArgs: InputArgs

	// interactive cli mode
	if (args.interactive) {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		})

		const question = (prompt: string) =>
			new Promise<string>((resolve) => rl.question(prompt, resolve))

		const roomInput = await question('Enter room size (e.g., 5 5): ')
		const startInput = await question(
			'Enter robot start position (e.g., 1 2 N): '
		)
		const commandsInput = await question(
			'Enter command string (e.g., RFRFFRFRF): '
		)

		rl.close()
		inputArgs = { room: roomInput, start: startInput, commands: commandsInput }
		runRobot(inputArgs)
	} else {
		if (!args.room || !args.start || !args.commands) {
			throw new Error(
				'Missing required CLI arguments: --room, --start, --commands'
			)
		}
		inputArgs = { room: args.room, start: args.start, commands: args.commands }
		runRobot(inputArgs)
	}
}

main()
