import { Robot } from './Robot'
import { Position } from '../types'

describe('Robot', () => {
	const roomWidth = 5
	const roomHeight = 5
	const startPos: Position = { x: 1, y: 2, direction: 'N' }

	it('can handle empty command string', () => {
		const robot = new Robot(roomWidth, roomHeight, startPos)
		const finalPos = robot.executeCommands('')
		expect(finalPos).toEqual(startPos)
	})

	it('turns left correctly', () => {
		const robot = new Robot(roomWidth, roomHeight, { x: 0, y: 0, direction: 'N' })
		const finalPos = robot.executeCommands('L')
		expect(finalPos.direction).toBe('W')
	})

	it('turns right correctly', () => {
		const robot = new Robot(roomWidth, roomHeight, { x: 0, y: 0, direction: 'N' })
		const finalPos = robot.executeCommands('R')
		expect(finalPos.direction).toBe('E')
	})

	it('moves forward correctly', () => {
		const robot = new Robot(roomWidth, roomHeight, { x: 2, y: 2, direction: 'N' })
		const finalPos = robot.executeCommands('F')
		expect(finalPos).toEqual({ x: 2, y: 1, direction: 'N' })
	})

	it('executes a sequence of commands correctly', () => {
		const robot = new Robot(roomWidth, roomHeight, startPos)
		const finalPos = robot.executeCommands('RFRFFRFRF')
		expect(finalPos).toEqual({ x: 1, y: 3, direction: 'N' })
	})

	it('throws error when moving out of room boundaries (negative)', () => {
		const robot = new Robot(roomWidth, roomHeight, { x: 0, y: 0, direction: 'N' })
		expect(() => robot.executeCommands('F')).toThrow(/out of bounds/)
	})

	it('throws error when moving out of room boundaries (exceeding width)', () => {
		const robot = new Robot(roomWidth, roomHeight, { x: 4, y: 4, direction: 'E' })
		expect(() => robot.executeCommands('F')).toThrow(/out of bounds/)
	})

	it('throws error on invalid command characters', () => {
		const robot = new Robot(roomWidth, roomHeight, startPos)
		expect(() => robot.executeCommands('X')).toThrow(/Invalid command/)
	})
})
