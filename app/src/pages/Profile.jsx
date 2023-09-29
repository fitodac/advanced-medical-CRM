import { useEffect, createContext, useState } from 'react'
import { Update, updateUserInLocalStorage } from '../api/user'
import { useForm, useAxios } from '../hooks'
import { useAppContext } from '../App'

import { PageHeader } from '../components'
import { Button, Input } from '../components/Ui'


export const formContext = createContext({})

export default function Page(){
	
	const { 
		API_URI, 
		token,
		user: {
			info: {
				id, 
				firstname, 
				lastname, 
				email, 
				name, 
				role
			}
		}
	} = useAppContext()
	
	const [ specialties, setSpecialties ] = useState(null)
	const [ center, setCenter ] = useState(null)


	const { response, error, loading } = useAxios({
		url: `${API_URI}/doctors/getInfo`,
		method: 'POST',
		body: {id},
		token
	})
	
	const getCenters = useAxios({
		url: `${API_URI}/center/getAll`,
		method: 'POST',
		token
	})
	
	const getSpecialties = useAxios({
		url: `${API_URI}/specialties`,
		method: 'POST',
		token
	})

	useEffect(() => {
		if( response?.data && 'doctor' === role ){
			const {specialty_id, center} = response.data.doctor
			setFormState({ ...formState, specialty_id })
			setCenter({...center})
		}
	}, [response])


	useEffect(() => {
		if( getCenters?.response.success ){
			getCenters.response.success = null
		}
	}, [getCenters])
	

	useEffect(() => {
		if( getSpecialties?.response.success ){
			setSpecialties([...getSpecialties.response.data])
			getSpecialties.response.success = null
		}
	}, [getSpecialties])



	const {formState, setFormState, onInputChange} = useForm({
		firstname,
		lastname,
		name,
		email,
		role,
		center_id: 0,
		specialty_id: 0
	})

	const handleInputChange = e => onInputChange(e)


	const handleSubmit = async e => {
		e.preventDefault()
		let resp

		try {
			const form_state = {...formState, id}
			const { center_id, specialty_id } = formState
			if( center_id ) form_state.center_id = parseInt(form_state.center_id)
			if( specialty_id ) form_state.specialty_id = parseInt(form_state.specialty_id) 

			resp = await Update(`${token_type} ${token}`, {...form_state, id})
			updateUserInLocalStorage({...formState})

			console.log('resp', resp)
		} catch (err) {
			console.log('error', err)
		}
	}


	const contextValue = {formState, handleInputChange}


	return (<>
		<PageHeader 
			title="Mi cuenta"
			breadcrumbs={[
				{title: 'Mi cuenta', current: true}
			]} />

		<formContext.Provider value={contextValue}>
			<section className="max-w-3xl pt-5">
				<form onSubmit={handleSubmit} className="space-y-10">

					<div className="space-y-2">
						<div className="font-semibold leading-none select-none">Datos de usuario</div>

						<div className="grid grid-cols-2 gap-x-5 gap-y-4">
							<Input label="Usuario" name="name" context={formContext} disabled={'superadmin' === role} />
							<Input label="Email" name="email" context={formContext} disabled />
							<Input label="Rol" name="role" context={formContext} disabled />
						</div>
					</div>

					{ 'doctor' === role || 'admin' === role
					? (<>
						<div className="bg-slate-200 h-px"></div>

						<div className="space-y-2">
							<div className="font-semibold leading-none select-none">Datos de personales</div>

							<div className="grid grid-cols-2 gap-x-5 gap-y-4">
								<Input label="Nombre" name="firstname" context={formContext} />
								<Input label="Apellido" name="lastname" context={formContext} />
							</div>
						</div>
					</>)
					: null }


					{ 'doctor' === role 
					? (<>
						<div className="bg-slate-200 h-px"></div>

						<div className="space-y-2">
							<div className="font-semibold leading-none select-none">Datos de doctor</div>

							<div className="grid grid-cols-2 gap-x-5 gap-y-4">
								{ specialties 
								? (<div className="">
										<label>Especialidad</label>
										<select name="specialty_id" value={formState.specialty_id} onChange={onInputChange}>
											{ specialties.map((e,i) => (<option value={e.id} key={i}>{e.name}</option>)) }
										</select>
									</div>) 
								: null }

								{ center 
								? (<div className="">
										<label>Centro médico</label>
										<div className="text-slate-500 font-semibold">{center.name}</div>
										<small className="text-slate-400 text-xs">COD. {center.code}</small>
									</div>) 
								: null }

							</div>
						</div>
					</>)
					: null}

					{ 'doctor' === role || 'admin' === role
					? (<div className="pt-4 col-span-2">
							<Button className="bg-primary border-primary text-white">{id ? 'Actualizar' : 'Guardar'}</Button>
						</div>)
					: null }

				</form>
			</section> 
		</formContext.Provider>
		
	</>)
}