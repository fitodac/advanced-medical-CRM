import { visitSessionStorage } from '.'

export const getVisitFormDataByType = (type, formData) => {

	if( !type ){
		throw new Error('Debes proveer un tipo de formulario')
	}

	if( !formData ){
		throw new Error('El objeto formData es obligatorio')
	}

	// Si el formulario está guardado en sessionStorage
	// lo recupera de ahí...
	const storedFormData = visitSessionStorage.get(type)
	if( storedFormData?.id ) return storedFormData

	// ... si no, lo recupera del request
	const idx = Object.keys(formData).filter(i => formData[i].visit_type === type)[0]
	
	if( !formData[idx] ){
		visitSessionStorage.remove(type)
		return {}
	}

	visitSessionStorage.set(type, formData[idx])
	return formData[idx]
}