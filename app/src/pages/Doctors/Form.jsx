import { useState, useEffect, createContext } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useForm, useAxios } from '../../hooks'
import { useAppContext } from '../../hooks'

import {
	Loading,
	PageHeader
} from '../../components'
import { 
	Input, 
	Button, 
	ButtonLink 
} from '../../components/Ui'


export const formContext = createContext({})

export async function loader({params}){ return {...params, id: parseInt(params.id)} }

export default function Page(){

	const { API_URI, token, notify } = useAppContext()
	const { id } = useLoaderData()
	const [centers, setCenters] = useState(null)
	const [specialties, setSpecialties] = useState(null)
	const [ loading, setLoading ] = useState(true)
	const navigate = useNavigate()

	const {formState, setFormState, onInputChange, onResetForm} = useForm({
		firstname: '',
		lastname: '',
		name: '',
		email: '',
		center_id: 0,
		specialty_id: 0
	})

	const handleInputChange = e => onInputChange(e)

	// Get doctor data on edition
	const {
		response: getDoctorResponse,
		// error: getDoctorError,
		// loading: getDoctorLoading,
		refetch: getDoctorRefetch
	} = useAxios({
		url: `${API_URI}/doctor/getInfo`,
		method: 'POST',
		body: {id},
		token,
		init: 0
	})

	// Get specialties list
	const {
		response: getSpecialtiesResponse,
		// error: getSpecialtiesError,
		loading: getSpecialtiesLoading,
		refetch: getSpecialtiesRefetch
	} = useAxios({
		url: `${API_URI}/specialties`,
		method: 'POST',
		token,
		init: 0
	})

	// Get centers list
	const {
		response: getCentersResponse,
		// error: getCentersError,
		loading: getCentersLoading,
		refetch: getCentersRefetch
	} = useAxios({
		url: `${API_URI}/center/getAll`,
		method: 'POST',
		token,
		init: 0
	})

	// Create doctor
	const { 
		response: createDoctorResponse, 
		// error: createDoctorError, 
		loading: createDoctorLoading, 
		refetch: createDoctorRefetch 
	} = useAxios({
		url: `${API_URI}/user/create`,
		method: 'POST',
		body: {...formState, role: 'doctor'},
		token,
		init: 0
	})

	// Upadate doctor
	const { 
		response: updateDoctorResponse, 
		// error: updateDoctorError, 
		loading: updateDoctorLoading, 
		refetch: updateDoctorRefetch 
	} = useAxios({
		url: `${API_URI}/user/update`,
		method: 'PUT',
		body: {...formState, id},
		token,
		init: 0
	})


	useEffect(() => {
		if( getDoctorResponse?.success ){
			const { firstname, lastname, name, email, role, doctor: {center_id, specialty_id} } = getDoctorResponse.data
			setFormState({
				...formState, 
				name, 
				firstname, 
				lastname, 
				email, 
				role, 
				center_id, 
				specialty_id
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getDoctorResponse])

	useEffect(() => {
		if( getSpecialtiesResponse?.success ) setSpecialties([...getSpecialtiesResponse.data])
	}, [getSpecialtiesResponse])

	useEffect(() => {
		if( getCentersResponse?.success ) setCenters([...getCentersResponse.data])
	}, [getCentersResponse])

	useEffect(() => setLoading(getSpecialtiesLoading), [getSpecialtiesLoading])
	useEffect(() => setLoading(getCentersLoading), [getCentersLoading])
	useEffect(() => setLoading(createDoctorLoading), [createDoctorLoading])
	useEffect(() => setLoading(updateDoctorLoading), [updateDoctorLoading])

	useEffect(() => {
		if( createDoctorResponse?.success ){
			notify(createDoctorResponse.message, 'success')
			onResetForm()
			if(navigate) navigate('/doctors')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createDoctorResponse])

	useEffect(() => {
		if( updateDoctorResponse?.success ){
			notify(updateDoctorResponse.message, 'success')
			onResetForm()
			if(navigate) navigate('/doctors')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateDoctorResponse])

	useEffect(() => {
		if( id ) getDoctorRefetch()
		getSpecialtiesRefetch()
		getCentersRefetch()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	const handleSubmit = e => {
		e.preventDefault()

		try {
			if( id ){
				const { center_id, specialty_id } = formState

				const centerID = !center_id ? parseInt(centers[0].id) : center_id
				const specialtyID = !specialty_id ? parseInt(specialties[0].id) : specialty_id

				setFormState({
					...formState,
					role: 'doctor',
					center_id: centerID,
					specialty_id: specialtyID
				})

				updateDoctorRefetch()
			}else{ 
				createDoctorRefetch()
			}
		} catch (err) {
			console.log('error', err)
		}
	}

	const contextValue = {formState, handleInputChange}


	return(<>
		<PageHeader 
			title={ id ? 'Doctor' : 'Nuevo doctor' }
			breadcrumbs={[
				{title: 'Lista de doctores', link: '/doctors'},
				{title: id ? 'Doctor' : 'Nuevo doctor', current: true}
			]} />

		<formContext.Provider value={contextValue}>
			<section className="max-w-3xl pt-5">
				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-2 gap-x-5 gap-y-4">
						<Input label="Nombre" name="firstname" context={formContext} />
						<Input label="Apellido" name="lastname" context={formContext} />
						<Input label="Usuario" name="name" context={formContext} />
						<Input label="Email" name="email" context={formContext} />

						{ specialties 
						? (<div className="">
								<label>Especialidad</label>
								<select name="specialty_id" value={formState.specialty_id} onChange={onInputChange}>
									{ specialties.map((e,i) => (<option value={e.id} key={i}>{e.name}</option>)) }
								</select>
							</div>) 
						: null }

						{ centers 
						? (<div className="">
								<label>Centro médico</label>
								<select name="center_id" value={formState.center_id} onChange={onInputChange}>
									{ centers.map((e,i) => (<option value={e.id} key={i}>{e.name}</option>)) }
								</select>
							</div>) 
						: null }

						<div className="flex gap-x-5 justify-between pt-4 col-span-2">
							<ButtonLink link="/doctors">Cancelar</ButtonLink>
							
							<div className="w-32">
								<Button className="bg-primary border-primary text-white w-full">{id ? 'Actualizar' : 'Guardar'}</Button>
							</div>

						</div>

					</div>
				</form>

			</section>
		</formContext.Provider>


		{loading && (<Loading />)}
	</>)
}