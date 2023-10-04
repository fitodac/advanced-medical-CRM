import { 
	useContext, 
} from 'react'
import { PropTypes } from 'prop-types'
import { FilterContext } from './context'
import { InputSearch, Button } from '../Ui'
import { useAppContext } from '../../App'
import { objectToQueryString } from '../../helpers'

export const PatientsFilter = ({filter}) => {

	const { 
		API_URI, 
	} = useAppContext()
	const filterContext = useContext(FilterContext)

	const handleSubmit = e => {
		e.preventDefault()
		filter(`${API_URI}/patient/list/?${objectToQueryString(filterContext.formState)}`)
	}


	return (
		<>
		<form 
			onSubmit={handleSubmit}
			className="w-full space-y-2 md:flex md:space-0 md:gap-x-3 md:items-end">
			
			<InputSearch 
				label="Código"
				name="code"
				containerClassName="w-36"
				context={FilterContext} />
			
			<InputSearch 
				label="Doctor"
				name="doctor"
				context={FilterContext} />

			<Button className="btn-icon bg-primary border-primary text-white">
				<i className="ri-equalizer-fill"></i>
			</Button>
		</form>
		</>
	)
}

PatientsFilter.propTypes = {
	filter: PropTypes.func.isRequired
}