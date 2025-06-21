import { Direction } from '../types'
import { InputValidator } from './InputValidator'

describe('InputValidator', () => {
	describe('validateRoomSize', () => {
		it('accepts valid room dimensions', () => {
			expect(() => InputValidator.validateRoomSize('5 5')).not.toThrow()
		})

		it('throws on non-integer room dimensions', () => {
			expect(() => InputValidator.validateRoomSize('5.2 5')).toThrow()
		})

		it('throws on zero or negative room size', () => {
			expect(() => InputValidator.validateRoomSize('0 5')).toThrow()
			expect(() => InputValidator.validateRoomSize('-1 5')).toThrow()
		})
	})

	describe('validateStartPosition', () => {
		it('accepts valid start position and direction', () => {
			const result = InputValidator.validateStartPosition('1 2 N', [5, 5])
			expect(result).toEqual({ x: 1, y: 2, direction: 'N' as Direction })
		})

		it('throws if direction is invalid', () => {
			expect(() => InputValidator.validateStartPosition('1 2 A', [5, 5])).toThrow()
		})

		it('throws if coordinates are out of room bounds', () => {
			expect(() => InputValidator.validateStartPosition('5 5 E', [5, 5])).toThrow()
			expect(() =>
				InputValidator.validateStartPosition('-1 2 E', [5, 5])
			).toThrow()
		})
	})

	describe('validateCommands', () => {
		it('accepts valid command strings', () => {
			expect(() => InputValidator.validateCommands('LRFFRL')).not.toThrow()
		})

		it('throws on invalid characters', () => {
			expect(() => InputValidator.validateCommands('LRAZ')).toThrow()
			expect(() => InputValidator.validateCommands('123')).toThrow()
		})
	})
})
