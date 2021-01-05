export const convertColor = (color: string): string => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color) as Array<string>
	const rgb = {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	}
	return `rgb(${rgb.r + 50}, ${rgb.g + 50}, ${rgb.b + 50})`
}
