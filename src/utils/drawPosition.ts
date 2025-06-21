import chalk from 'chalk'
import { Direction } from '../types'

const directionSymbols: Record<Direction, string> = {
	N: '▲',
	E: '▶︎',
	S: '▼',
	W: '◀︎',
}

/*
 * Draws the robot's position on the console.
 * @param width - The width of the room.
 * @param height - The height of the room.
 * @param robotX - The x coordinate of the robot.
 * @param robotY - The y coordinate of the robot.
 * @param directionStr - The direction of the robot.
 * @param isStart - Whether the robot is in the start position or in the final position.
 */
export function drawPosition(
	width: number,
	height: number,
	robotX: number,
	robotY: number,
	directionStr: Direction,
	isStart?: boolean
): void {
	const rows: string[] = []
	const direction = directionSymbols[directionStr]

	for (let y = 0; y < height; y++) {
		let row = ''
		for (let x = 0; x < width; x++) {
			if (x === robotX && y === robotY) {
				row += chalk.overline.underline.gray(`${chalk.green(direction)}|`)
			} else {
				row += chalk.overline.underline.gray(' |')
			}
		}
		rows.push(
			`${chalk.gray(String(y).padStart(2))} ${chalk.underline.overline.gray(
				'|'
			)}${row}`
		)
	}

	const header =
		'   ' +
		chalk.underline.gray(
			Array.from(
				{ length: width },
				(_, i) => `${i < 1 ? ' ' + i + ' ' : i > 9 ? i : i + ' '}`
			).join('')
		)
	console.log(`\nRobot ${isStart ? 'starting' : 'result'} position:\n`)
	console.log(header)
	console.log(rows.join('\n'))
}
