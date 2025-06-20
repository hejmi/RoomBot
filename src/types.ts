export type Direction = 'N' | 'E' | 'S' | 'W'

export interface Position {
	x: number
	y: number
	direction: Direction
}
