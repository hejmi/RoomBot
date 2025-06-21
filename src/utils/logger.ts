import { Position } from '../types'
export class Logger {
	static logStart = (
		roomW: number,
		roomH: number,
		startPos: Position,
		commands: string
	) => {
		console.log(`Room Size: ${roomW} ${roomH}`)
		console.log(
			`Start Position: ${startPos.x} ${startPos.y} ${startPos.direction}`
		)
		console.log(`Commands: ${commands}`)
	}

	static logReport = (finalPos: Position) => {
		console.log(`\nReport: ${finalPos.x} ${finalPos.y} ${finalPos.direction}`)
	}

	static logError = (error: Error) => {
		console.error('Error:', error.message)
	}

	static logInfo = (message: string) => {
		console.log(`\nINFO: ${message}\n`)
	}
}
