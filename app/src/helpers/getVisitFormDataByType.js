import { visitSessionStorage } from '.'

export const getVisitFormDataByType = (type, formData) => {

	if( !type ){
		console.error('Debes proveer un tipo de formulario')
		return null
	}
	
	if( !formData ){
		console.error('El objeto formData es obligatorio')
		return null
	}

	// Si el formulario está guardado en sessionStorage
	// lo recupera de ahí...
	const storedFormData = visitSessionStorage.get(type)
	if( storedFormData ) return storedFormData

	// ... si no, lo recupera del request
	const idx = Object.keys(formData).filter(i => formData[i].visit_type === type)[0]
	
	if( !formData[idx] ){
		visitSessionStorage.remove(type)
		return {}
	}

	visitSessionStorage.set(type, formData[idx])
	return formData[idx]
}