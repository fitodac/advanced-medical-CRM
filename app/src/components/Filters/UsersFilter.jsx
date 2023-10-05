import { useContext, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import { FilterContext } from './context'
import { InputSearch, Button } from '../Ui'
import { useAppContext } from '../../App'
import { objectToQueryString } from '../../helpers'

export const UsersFilter = ({filter}) => {

	const { API_URI } = useAppContext()
	const filterContext = useContext(FilterContext)

	useEffect(() => {
		filterContext.handleInputChange({target: {name: 'role', value: 'doctor'}})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleChange = e => filterContext.handleInputChange(e)

	const handleSubmit = e => {
		e.preventDefault()
		filter(`${API_URI}/user/list/?${objectToQueryString(filterContext.formState)}`)
	}


	return (
		<>
		<form 
			onSubmit={handleSubmit}
			className="w-full space-y-2 md:flex md:space-0 md:gap-x-3 md:items-end">
			<div className="">
				<label>Rol</label>
				<select 
					name="role"
					defaultValue="doctor"
					onChange={handleChange}>
					<option value=""></option>
					<option value="doctor">Doctor</option>
					<option value="admin">Admin</option>
				</select>
			</div>

			<InputSearch 
				label="Nombre / Apellido"
				name="name"
				context={FilterContext} />

			<Button className="btn-icon bg-primary border-primary text-white">
				<i className="ri-equalizer-fill"></i>
			</Button>
		</form>
		</>
	)
}

UsersFilter.propTypes = {
	filter: PropTypes.func.isRequired
}