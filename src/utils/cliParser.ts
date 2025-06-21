export interface CliArgs {
	room?: string
	start?: string
	commands?: string
	interactive?: boolean
}

export function parseArgs(args: string[]): CliArgs {
	const cliArgs: CliArgs = {}
	args.forEach((arg, i) => {
		switch (arg) {
			case '--room':
				cliArgs.room = args[i + 1]
				break
			case '--start':
				cliArgs.start = args[i + 1]
				break
			case '--commands':
				cliArgs.commands = args[i + 1]
				break
			case '--interactive':
				cliArgs.interactive = true
				break
		}
	})
	return cliArgs
}
