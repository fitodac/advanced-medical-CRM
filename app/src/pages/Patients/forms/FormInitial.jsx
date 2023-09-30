import { 
	createContext 
} from 'react'
import { 
	useForm
} from '../../../hooks'
import { PropTypes } from 'prop-types'
import crdState from '../crdState'

import {
	HeaderForm,
} from '../components'

// eslint-disable-next-line react-refresh/only-export-components
export const formContext = createContext({})


export const FormInitial = ({
	patient
}) => {

	const {
		// formState, 
		// setFormState, 
		onInputChange, 
		// onResetForm
	} = useForm(crdState)

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
	</formContext.Provider>
	</>)
}


FormInitial.propTypes = {
	patient: PropTypes.object.isRequired
}