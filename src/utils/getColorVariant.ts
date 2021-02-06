const getColorVariant = (color: string, value: number): string => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color) as Array<string>
	const rgb = {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	}
	return `rgb(${rgb.r + value}, ${rgb.g + value}, ${rgb.b + value})`
}

export default getColorVariant