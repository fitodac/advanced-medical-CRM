export const getVisitFormDataByType = (type, formData) => {

	if( !type ){
		console.error('Debes proveer un tipo de formulario')
		return null
	}
	if( !formData ){
		console.error('El objeto formData es obligatorio')
		return null
	}

	const idx = Object.keys(formData).filter(i => formData[i].visit_type === type)[0]
	return formData[idx]

}