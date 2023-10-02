import { 
	useEffect,
	useMemo,
	createContext 
} from 'react'
import { 
	useForm
} from '../../../hooks'
import { PropTypes } from 'prop-types'
import crdState from '../crdState'
import { useAppContext } from '../../../App'
import {
	getVisitFormDataByType
} from '../../../helpers'

import {
	HeaderForm,
} from '../components'

// eslint-disable-next-line react-refresh/only-export-components
export const formContext = createContext({})


export const FormInitial = ({
	patient,
	formData
}) => {

	const {
		formState, 
		setFormState, 
		onInputChange, 
		// onResetForm
	} = useForm(crdState)

	const existentFormData = useMemo(() => {
		if(formData) return getVisitFormDataByType('first', formData)
	}, [formData])

	useEffect(() => {
		setFormState({
			...formState,
			...existentFormData
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [existentFormData])

	const handleInputChange = e => onInputChange(e)
	const handleSubmit = async e => e.preventDefault()

	const contextValue = {
		patient,
		// formState, 
		handleInputChange
	}

	
	return (<>
	<formContext.Provider value={contextValue}>
		<form onSubmit={handleSubmit}>
			<HeaderForm title="Seguimiento 1" context={formContext} />
		</form>

		<pre className="bg-black bg-opacity-70 text-white text-sm w-1/3 h-screen p-8 right-0 top-0 fixed overflow-y-auto">{JSON.stringify(formState, null, 2)}</pre>
	</formContext.Provider>
	</>)
}


FormInitial.propTypes = {
	patient: PropTypes.object.isRequired,
	formData: PropTypes.array
}