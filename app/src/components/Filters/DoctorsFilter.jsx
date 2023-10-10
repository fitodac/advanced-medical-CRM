import { useContext } from 'react'
import { PropTypes } from 'prop-types'
import { FilterContext } from './context'
import { InputSearch, Button } from '../Ui'
import { useAppContext } from '../../hooks'
import { objectToQueryString } from '../../helpers'
import { useAxios } from '../../hooks'

export const DoctorsFilter = ({filter}) => {

	const { API_URI, token, user: {role} } = useAppContext()
	const filterContext = useContext(FilterContext)

	// useEffect(() => {
	// 	filterContext.handleInputChange({target: {name: 'role', value: 'doctor'}})
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

	// Get specialties list
	const {
		response: getSpecialtiesResponse,
		// error: getSpecialtiesError,
		// loading: getSpecialtiesLoading,
	} = useAxios({
		url: `${API_URI}/specialties`,
		method: 'POST',
		token
	})


	// Get centers list
	const {
		response: getCentersResponse,
		// error: getCentersError,
		// loading: getCentersLoading,
	} = useAxios({
		url: `${API_URI}/center/getAll`,
		method: 'POST',
		token
	})

	const handleChange = e => filterContext.handleInputChange(e)

	const handleSubmit = e => {
		e.preventDefault()
		filter(`${API_URI}/doctor?${objectToQueryString(filterContext.formState)}`)
	}

	return (
		<>
		<form
			onSubmit={handleSubmit}
			className="w-full space-y-2 md:flex md:space-0 md:gap-x-3 md:items-end">

			<InputSearch
				label="Nombre / Apellido"
				name="name"
				context={FilterContext} />

			{getSpecialtiesResponse?.success && (
				<div className="">
					<label>Especialidad</label>

					<select
						name="specialty_id"
						onChange={handleChange}>
						<option value=""></option>
						{getSpecialtiesResponse?.data.map(({id, name}) => (
							<option key={id} value={id}>{name}</option>
						))}
					</select>
				</div>
			)}

			{getCentersResponse?.success && (
				<div className="">
					<label>Centro médico</label>

					<select
						name="center_id"
						onChange={handleChange}>
						<option value=""></option>
						{getCentersResponse?.data.map(({id, name}) => (
							<option key={id} value={id}>{name}</option>
						))}
					</select>
				</div>
			)}

			<Button className="btn-icon bg-primary border-primary text-white">
				<i className="ri-equalizer-fill"></i>
			</Button>
		</form>
		</>
	)
}

DoctorsFilter.propTypes = {
	filter: PropTypes.func.isRequired
}