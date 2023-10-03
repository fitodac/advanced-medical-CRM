import { 
	useContext, 
	useEffect,
	// useState 
} from 'react'
import { PropTypes } from 'prop-types'
import { FilterContext } from './context'
import { InputSearch, Button } from '../Ui'
import { useAppContext } from '../../App'
import { objectToQueryString } from '../../helpers'
// import { useAxios } from '../../hooks'

export const PatientsFilter = ({filter}) => {

	const { 
		API_URI, 
		// token 
	} = useAppContext()
	const filterContext = useContext(FilterContext)
	// const [ doctors, setDoctors ] = useState(null)

	// const { 
	// 	response, 
	// 	error, 
	// 	loading 
	// } = useAxios({
	// 	url: `${API_URI}/doctor/getAll`,
	// 	method: 'POST',
	// 	token
	// })

	// useEffect(() => {
	// 	if(response?.success){
	// 		setDoctors([...response.data])
	// 	}
	// }, [response])

	// const handleChange = e => filterContext.handleInputChange(e)

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
				label="Nombre / Apellido"
				name="name"
				context={FilterContext} />
			
			<InputSearch 
				label="Doctor"
				name="doctor"
				context={FilterContext} />

			{/* {doctors && (
			<>
				<div className="">
					<label>Doctor</label>
					<select 
						name="doctor"
						onChange={handleChange}>
						{doctors.map(({id, user: {firstname, lastname}}) => (
							<option 
								key={id}
								value={id}>
								{firstname} {lastname}
							</option>
						))}
					</select>
				</div>
			</>
			)} */}

			<Button className="btn-icon bg-primary border-primary text-white">
				<i className="ri-equalizer-fill"></i>
			</Button>
		</form>

		{/* <pre>{JSON.stringify(filterContext.formState, null, 2)}</pre> */}
		</>
	)
}

PatientsFilter.propTypes = {
	filter: PropTypes.func.isRequired
}