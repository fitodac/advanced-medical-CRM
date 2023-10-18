import { useState, useEffect, createContext } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useAxios, useForm } from '../../hooks'
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
	const [ centers, setCenters ] = useState(null)
	const [ specialties, setSpecialties ] = useState(null)
	const [ loading, setLoading ] = useState(true)
	const navigate = useNavigate()

	const {formState, setFormState, onInputChange, onResetForm} = useForm({
		firstname: '',
		lastname: '',
		name: '',
		email: '',
		role: '',
		center_id: 1,
		specialty_id: 1
	})

	const handleInputChange = e => onInputChange(e)

	// Get user data on edition
	const { 
		response: getUserResponse, 
		// error: getUserError, 
		// loading: getUserLoading, 
		refetch: getUserRefetch 
	} = useAxios({
		url: `${API_URI}/user`,
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


	// Create user
	const { 
		response: createUserResponse, 
		// error: createUserError, 
		loading: createUserLoading, 
		refetch: createUserRefetch 
	} = useAxios({
		url: `${API_URI}/user/create`,
		method: 'POST',
		body: {...formState},
		token,
		init: 0
	})

	// Upadate user
	const { 
		response: updateUserResponse, 
		// error: updateUserError, 
		loading: updateUserLoading, 
		refetch: updateUserRefetch 
	} = useAxios({
		url: `${API_URI}/user/update`,
		method: 'PUT',
		body: {...formState, id},
		token,
		init: 0
	})


	useEffect(() => {
		if( getUserResponse?.success ){
			const { firstname, lastname, name, email, role, doctor } = getUserResponse.data
			const center_id = doctor ? doctor.center_id : 0
			const specialty_id = doctor ? doctor.specialty_id : 0
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
	}, [getUserResponse])


	useEffect(() => {
		if( getSpecialtiesResponse?.success ) setSpecialties([...getSpecialtiesResponse.data])
	}, [getSpecialtiesResponse])

	useEffect(() => {
		if( getCentersResponse?.success ) setCenters([...getCentersResponse.data])
	}, [getCentersResponse])

	useEffect(() => {
		if( createUserResponse?.success ){
			notify(createUserResponse.message, 'success')
			onResetForm()
			if(navigate) navigate('/users')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createUserResponse])

	useEffect(() => {
		if( updateUserResponse?.success ){
			notify(updateUserResponse.message, 'success')
			onResetForm()
			if(navigate) navigate('/users')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateUserResponse])

	useEffect(() => setLoading(getSpecialtiesLoading), [getSpecialtiesLoading])
	useEffect(() => setLoading(getCentersLoading), [getCentersLoading])
	useEffect(() => setLoading(createUserLoading), [createUserLoading])
	useEffect(() => setLoading(updateUserLoading), [updateUserLoading])

	useEffect(() => {
		if( id ){
			getUserRefetch()
		}else{
			setLoading(false)
		}
		getSpecialtiesRefetch()
		getCentersRefetch()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])




	const handleSubmit = e => {
		e.preventDefault()
		setLoading(true)

		try {
			if( id ){
				const { role, center_id, specialty_id } = formState

				if( 'doctor' === role ){
					const centerID = !center_id ? parseInt(centers[0].id) : center_id
					const specialtyID = !specialty_id ? parseInt(specialties[0].id) : specialty_id
					setFormState({
						...formState,
						center_id: centerID,
						specialty_id: specialtyID
					})
				}

				updateUserRefetch()
			}else{ 
				createUserRefetch()
			}
		} catch (err) {
			setLoading(false)
			console.log('error', err)
		}
	}

	const contextValue = {formState, handleInputChange}


	return(<>
		<PageHeader 
			title={ id ? 'Usuario' : 'Nuevo usuario'}
			breadcrumbs={[
				{title: 'Lista de usuarios', link: '/users'},
				{title: id ? 'Usuario' : 'Nuevo usuario', current: true}
			]} />

		<formContext.Provider value={contextValue}>
			<section className="max-w-3xl pt-5">
				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-2 gap-x-5 gap-y-4">
						<Input label="Nombre" name="firstname" context={formContext} />
						<Input label="Apellido" name="lastname" context={formContext} />
						<Input label="Usuario" name="name" context={formContext} />
						<Input label="Email" name="email" context={formContext} />
						
						<div className="">
							<label className="select-none">Rol de usuario</label>
							<select name="role" value={formState.role} onChange={onInputChange}>
								<option value="admin">Admin</option>
								<option value="doctor">Doctor</option>
							</select>
						</div>

						<div>
							{ 'doctor' === formState.role 
							? (<div className="space-y-4 pt-4">
									<div className="font-medium leading-tight">Datos del doctor</div>

									{ specialties 
									? (<div className="">
											<label className="select-none">Especialidad</label>
											<select name="specialty_id" value={formState.specialty_id} onChange={onInputChange}>
												{ specialties.map((e,i) => (<option value={e.id} key={i}>{e.name}</option>)) }
											</select>
										</div>) 
									: null }

									{ centers 
									? (<div className="">
											<label className="select-none">Centro médico</label>
											<select name="center_id" value={formState.center_id} onChange={onInputChange}>
												{ centers.map((e,i) => (<option value={e.id} key={i}>{e.name}</option>)) }
											</select>
										</div>) 
									: null }

								</div>)
							: null }
						</div>

						<div className="flex gap-x-5 justify-between pt-4 col-span-2">
							<ButtonLink link="/users">Cancelar</ButtonLink>
							
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