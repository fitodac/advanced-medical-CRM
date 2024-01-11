const convertToNumber = (str) => {
	if (!str) return 0
	return str.indexOf(',') ? parseFloat(str.replace(',', '.')) : parseFloat(str)
}

const convertToString = (num) => {
	const n = num.toFixed(2)
	return n.indexOf('.') ? n.replace('.', ',') : n
}

export const calculateLossLastSixMonths = (formState) => {
	const { usual_body_weight, current_body_weight } = formState
	const usualBodyWeight = convertToNumber(usual_body_weight)
	const currentBodyWeight = convertToNumber(current_body_weight)
	const calc_lost_weight = usualBodyWeight - currentBodyWeight

	return calc_lost_weight > 0 ? convertToString(calc_lost_weight) : '0'
}

export const calculateWeightLossPercentage = (formState) => {
	const { usual_body_weight, current_body_weight } = formState
	const usualBodyWeight = convertToNumber(usual_body_weight)
	const currentBodyWeight = convertToNumber(current_body_weight)
	const calc_lost_weight_percent =
		((usualBodyWeight - currentBodyWeight) / usualBodyWeight) * 100

	return calc_lost_weight_percent > 0
		? convertToString(calc_lost_weight_percent)
		: '0'
}

export const calculateBmi = (formState) => {
	const { current_body_weight, height } = formState
	const currentBodyWeight = convertToNumber(current_body_weight)
	const Height = convertToNumber(height)

	return convertToString(currentBodyWeight / Math.pow(Height, 2))
}
