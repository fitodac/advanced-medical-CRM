import { useEffect, createContext, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Get, Create, Update, formFieldsData } from '../../api/user'
import { useAuth } from '../../hooks/useAuth'
import { useForm } from '../../hooks/useForm'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Ui/Input'
import Button from '../../components/Ui/Button'
import ButtonLink from '../../components/Ui/ButtonLink'

export const formContext = createContext({})

export async function loader({params}){ return {...params, id: parseInt(params.id)} }

export default function Page(){

	const { id } = useLoaderData()
	const { user: {token_type, token} } = useAuth()
	const [centers, setCenters] = useState(null)
	const [specialties, setSpecialties] = useState(null)
	const navigate = useNavigate()

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


	useEffect(() => { 
		const getData = async () => {
			try {
				const resp = await Get(`${token_type} ${token}`, {id})

				setFormState({
					...formState,
					firstname: resp.data.firstname,
					lastname: resp.data.lastname,
					name: resp.data.name, 
					email: resp.data.email,
					role: resp.data.role,
					center_id: resp.data.center_id,
					specialty_id: resp.data.specialty_id
				})
			} catch (err) {
				console.log('error:', err)
			}
		}

		if(id) getData()


		// Get additional content for fields
		const getFormData = async () => {
			try {
				const resp = await formFieldsData(`${token_type} ${token}`)
				setCenters([...resp.centers])
				setSpecialties([...resp.specialties])
			} catch (err) {
				console.log('error:', err)
			}
		}

		getFormData()
	}, [])


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