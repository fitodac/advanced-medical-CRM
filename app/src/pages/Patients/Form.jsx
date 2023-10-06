import { useState, useEffect, createContext } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useAxios, useForm } from '../../hooks'
import { useAppContext } from '../../hooks'

import {
	Loading,
	PageHeader
} from '../../components'
import { Button, ButtonLink } from '../../components/Ui'


export const formContext = createContext({})

export async function loader({params}){ return {...params, id: parseInt(params.id)} }

export default function Page(){

	const { API_URI, token, user, notify } = useAppContext()
	const { id } = useLoaderData()
	const [ loading, setLoading ] = useState(true)
	const navigate = useNavigate()

	const {formState, setFormState, onInputChange, onResetForm} = useForm({
		code: '',
		doctor_id: '',
		center_id: '',
		gender: 'mujer'
	})

	const handleInputChange = e => onInputChange(e)


	// Get patient data on edition
	const {
		response,
		// error,
		refetch
	} = useAxios({
		url: `${API_URI}/patient`,
		method: 'POST',
		body: {id},
		token,
		init: 0
	})


	// Get doctor data on edition
	const {
		response: getDoctorResponse,
		// error: getDoctorError,
		// loading: getDoctorLoading,
		refetch: getDoctorRefetch
	} = useAxios({
		url: `${API_URI}/doctor/getInfo`,
		method: 'POST',
		body: {id: user.info.id},
		token,
		init: 0
	})


	// Create patient
	const {
		response: createPatientResponse,
		// error: createPatientError,
		loading: createPatientLoading,
		refetch: createPatientRefetch
	} = useAxios({
		url: `${API_URI}/patient/create`,
		method: 'POST',
		body: {...formState},
		token,
		init: 0
	})

	// Update patient
	const {
		response: updatePatientResponse,
		// error: updatePatientError,
		loading: updatePatientLoading,
		refetch: updatePatientRefetch
	} = useAxios({
		url: `${API_URI}/patient/update`,
		method: 'PUT',
		body: {...formState, id},
		token,
		init: 0
	})


	useEffect(() => {
		if( response?.success ){
			setFormState({
				...formState, 
				...response.data
			})
			setLoading(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [response])


	useEffect(() => {
		if( getDoctorResponse?.success ){
			const {
				doctor: {
					id: doctor_id, 
					center_id, 
					center:{
						code
					}
				}
			} = getDoctorResponse.data
			setFormState({
				...formState,
				doctor_id,
				center_id,
				code
			})
			// console.log(getDoctorResponse.data)
		}
	}, [getDoctorResponse])


	useEffect(() => {
		if( createPatientResponse?.success ){
			notify(createPatientResponse.message, 'success')
			onResetForm()
			if(navigate) navigate('/patients')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createPatientResponse])
	
	useEffect(() => {
		if( updatePatientResponse?.success ){
			notify(updatePatientResponse.message, 'success')
			onResetForm()
			if(navigate) navigate('/patients')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updatePatientResponse])

	useEffect(() => setLoading(createPatientLoading), [createPatientLoading])
	useEffect(() => setLoading(updatePatientLoading), [updatePatientLoading])

	useEffect(() => {
		if( id ){
			refetch()
		}else{
			getDoctorRefetch()
			setLoading(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])



	const handleSubmit = e => {
		e.preventDefault()

		try {
			if( id ){
				updatePatientRefetch()
			}else{ 
				createPatientRefetch()
			}
		} catch (err) {
			console.log('error', err)
		}

	}


	const contextValue = { formState, handleInputChange }

	return(<>
		<PageHeader 
			title={ id ? 'Paciente' : 'Nuevo paciente' }
			breadcrumbs={[
				{title: 'Lista de pacientes', link: '/patients'},
				{title: id ? 'Paciente' : 'Nuevo paciente', current: true}
			]} />

		<formContext.Provider value={contextValue}>
			<section className="max-w-3xl pt-5">
				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-2 gap-x-5 gap-y-4">

						<div className="">
							<label>Género</label>
							<select name="gender" value={formState.gender} onChange={onInputChange}>
								<option value="mujer">Mujer</option>
								<option value="hombre">Hombre</option>
							</select>
						</div>

						<div className="flex gap-x-5 justify-between pt-4 col-span-2">
							<ButtonLink link="/patients">Cancelar</ButtonLink>

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