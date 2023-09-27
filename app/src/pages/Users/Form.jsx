import { useEffect, createContext, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Create, Update } from '../../api/user'
import { 
	useAuth, 
	useAxios, 
	useForm 
} from '../../hooks'
import { useAppContext } from '../../App'

import PageHeader from '../../components/PageHeader'
import { 
	Input, 
	Button, 
	ButtonLink 
} from '../../components/Ui'


export const formContext = createContext({})

export async function loader({params}){ return {...params, id: parseInt(params.id)} }


export default function Page(){

	const { id } = useLoaderData()
	const { user: {token_type, token} } = useAuth()
	const [centers, setCenters] = useState(null)
	const [specialties, setSpecialties] = useState(null)
	const navigate = useNavigate()
	const { API_URI } = useAppContext()

	const {formState, setFormState, onInputChange, onResetForm} = useForm({
		firstname: '',
		lastname: '',
		name: '',
		email: '',
		role: '',
		center_id: 0,
		specialty_id: 0
	})

	const handleInputChange = e => onInputChange(e)

	const getUser = useAxios({
		url: `${API_URI}/user`,
		method: 'POST',
		body: {id},
		token: `${token_type} ${token}`
	})

	const getSpecialties = useAxios({
		url: `${API_URI}/specialties`,
		method: 'POST',
		token: `${token_type} ${token}`
	})

	const getCenters = useAxios({
		url: `${API_URI}/center/getAll`,
		method: 'POST',
		token: `${token_type} ${token}`
	})
	

	useEffect(() => {
		if( getUser.response?.success ){
			const { firstname, lastname, name, email, role, center_id, specialty_id } = getUser.response.data
			setFormState({...formState, name, firstname, lastname, email, role, center_id, specialty_id})
			getUser.response.success = null
		}
	}, [getUser])

	
	useEffect(() => {
		if( getSpecialties.response?.success ){
			setSpecialties([...getSpecialties.response.data])
			getSpecialties.response.success = null
		}
	}, [getSpecialties])


	useEffect(() => {
		if( getCenters.response?.success ){
			setCenters([...getCenters.response.data])
			getCenters.response.success = null
		}
	}, [getCenters])



	const handleSubmit = async e => {
		e.preventDefault()
		let resp

		try {
			if( id ){
				const { role, center_id, specialty_id } = formState
				const form_state = {...formState}

				if( 'doctor' === role ){
					if( !center_id ) form_state.center_id = parseInt(centers[0].id)
					if( !specialty_id ) form_state.specialty_id = parseInt(specialties[0].id)
				}
				
				resp = await Update(`${token_type} ${token}`, {...form_state, id})
			}else{ 
				resp = await Create(`${token_type} ${token}`, {...formState})
			}

			console.log('resp', resp)
			onResetForm()
			if(navigate) navigate('/users')
		} catch (err) {
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
							<label>Rol de usuario</label>
							<select name="role" value={formState.role} onChange={onInputChange}>
								<option value="admin">Admin</option>
								<option value="doctor">Doctor</option>
							</select>
						</div>

						<div>
							{ 'doctor' === formState.role 
							? (<div className="space-y-2 pt-4">
									<div className="font-medium leading-tight">Datos del doctor</div>

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

								</div>)
							: null }
						</div>

						<div className="flex gap-x-5 justify-between pt-4 col-span-2">
							<div className="w-32">
								<Button className="bg-primary border-primary text-white w-full">{id ? 'Actualizar' : 'Guardar'}</Button>
							</div>

							<ButtonLink link="/users">Cancelar</ButtonLink>
						</div>
					</div>
				</form>
			</section>
		</formContext.Provider>
	</>)
}