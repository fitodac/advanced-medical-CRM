export const ErrorResponse = resp => {

	const { 
		status,
		statusText,
		data
	} = resp
	
	return {
		status,
		statusText,
		message: data.message ?? data.error
	}
}


export const NoToken = () => {
	return {
		status: 500,
		statusText: 'Debes proveer un token',
		message: 'La mayoría de las llamadas a la API requieren un token'
	}
}


export const NoRequest = () => {
	return {
		status: 500,
		statusText: 'Debes proveer datos para realizar la petición',
		message: 'Aparentemente estás realizando una petición a una ruta que requiere datos en el body. Por favor, asegúrate de incluírlos.'
	}
}