import { useEffect, createContext, useState } from 'react'
import { useForm, useAxios } from '../hooks'
import { useAppContext } from '../hooks'

import { 
	Loading, 
	PageHeader 
} from '../components'
import { Button, Input } from '../components/Ui'


const updateUserInLocalStorage = data => {
	const stored_user = JSON.parse(window.localStorage.getItem('advanceUser'))

	const new_user = {
		...stored_user,
		info: {
			...stored_user.info,
			...data
		}
	}

	window.localStorage.setItem('advanceUser', JSON.stringify(new_user))
}


export const formContext = createContext({})

export default function Page(){
	
	const { 
		API_URI, 
		token,
		notify,
		setUserInfo,
		user
	} = useAppContext()

	const { info } = user
	const {id, role} = info
	
	const [ specialties, setSpecialties ] = useState(null)
	const [ center, setCenter ] = useState(null)
	const [ loading, setLoading ] = useState(true)

	const {formState, setFormState, onInputChange} = useForm({})


	const { 
		response, 
		// error: getDoctorError, 
		// loading: getDoctorLoading,
		refetch
	} = useAxios({
		url: `${API_URI}/profile/${id}`,
		method: 'GET',
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


	// Upadate profile
	const { 
		response: updateProfileResponse, 
		error: updateProfileError, 
		loading: updateProfileLoading, 
		refetch: updateProfileRefetch 
	} = useAxios({
		url: `${API_URI}/profile/${id}`,
		method: 'PATCH',
		body: {...formState},
		token,
		init: 0
	})


	useEffect(() => {
		if( response?.success ){

			if( 'doctor' === role ){
				const {specialty_id, center} = response.data.doctor

				setFormState({ 
					...formState, 
					...response.data,
					specialty_id 
				})

				setCenter({...center})

			}else{
				setFormState({
					...formState, 
					...response.data
				})
			}

		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [response])


	useEffect(() => {
		if( getSpecialtiesResponse?.success ) setSpecialties([...getSpecialtiesResponse.data])
	}, [getSpecialtiesResponse])


	useEffect(() => {
		setLoading(getSpecialtiesLoading)
	}, [ getSpecialtiesLoading ])


	useEffect(() => {
		setLoading(updateProfileLoading)
	}, [updateProfileLoading])


	useEffect(() => {
		if( updateProfileResponse?.success ){
			console.log('updateProfileResponse', updateProfileResponse.data)
			setUserInfo({...updateProfileResponse.data})
			updateUserInLocalStorage({...updateProfileResponse.data})
			notify(updateProfileResponse.message, 'success')
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateProfileResponse])


	useEffect(() => {
		if( updateProfileError?.message ){
			notify(updateProfileError.message, 'error')
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateProfileError])


	useEffect(() => {
		refetch()
		'doctor' === role ? getSpecialtiesRefetch() : setLoading(false)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	const handleInputChange = e => onInputChange(e)


	const handleSubmit = async e => {
		e.preventDefault()

		try {
			const { role, center_id, specialty_id } = formState

			if( 'doctor' === role ){
				setFormState({
					...formState,
					center_id: parseInt(center_id),
					specialty_id: parseInt(specialty_id)
				})
			}
			updateProfileRefetch()

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
								{ specialties ? (
									<div className="">
										<label>Especialidad</label>
										<select name="specialty_id" value={formState.specialty_id} onChange={onInputChange}>
											{ specialties.map((e,i) => (<option value={e.id} key={i}>{e.name}</option>)) }
										</select>
									</div>
								) : null }

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

					<div className="bg-slate-200 h-px"></div>

					<div className="space-y-2">
						<div className="font-semibold leading-none select-none">Seguridad</div>
						<div className="text-slate-500 text-sm">Cambiar contraseña</div>

						<div className="grid grid-cols-2 gap-x-5 gap-y-4 pt-2">
							<Input 
								label="Contraseña actual" 
								name="password" 
								context={formContext}
								type="password" />

							<Input 
								label="Nueva contraseña" 
								name="new_password" 
								context={formContext}
								type="password" />
						</div>
					</div>


					{ 'doctor' === role || 'admin' === role
					? (<div className="pt-4 col-span-2">
							<Button className="bg-primary border-primary text-white">{id ? 'Actualizar' : 'Guardar'}</Button>
						</div>)
					: null }

				</form>
			</section>
		</formContext.Provider>
		
		{loading && (<Loading />)}
	</>)
}