import { useEffect, createContext } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Get, Create, Update } from '../../api/patients'
import { Get as getDoctorInfo } from '../../api/doctor'
import { useAuth } from '../../hooks/useAuth'
import { useForm } from '../../hooks/useForm'

import PageHeader from '../../components/PageHeader'
import { Input, Button, ButtonLink } from '../../components/Ui'

export const formContext = createContext({})

export async function loader({params}){ return {...params, id: parseInt(params.id)} }

export default function Page(){

	const { id } = useLoaderData()
	const { user } = useAuth()
	const {token_type, token} = user
	const auth_id = user.info.id
	const navigate = useNavigate()

	const {formState, setFormState, onInputChange, onResetForm} = useForm({
		code: '',
		doctor_id: '',
		center_id: '',
		name: '',
		lastname: '',
		gender: 'mujer'
	})


	const handleInputChange = e => onInputChange(e)


	useEffect(() => { 
		const getData = async () => {
			try {
				if(id){
					const resp = await Get(`${token_type} ${token}`, {id})

					setFormState({
						...formState,
						...resp.data
					})
				}else{
					const resp = await getDoctorInfo(`${token_type} ${token}`, {id: auth_id})
					const {center} = resp.data

					setFormState({
						...formState,
						code: center.code, 
						doctor_id: resp.data.id,
						center_id: center.id
					})
				}

			} catch (err) {
				console.log('error:', err)
			}
		}

		getData()

	}, [])


	const handleSubmit = async e => {
		e.preventDefault()
		let resp

		try {
			if( id ){
				resp = await Update(`${token_type} ${token}`, {...formState})
			}else{ 
				resp = await Create(`${token_type} ${token}`, {...formState})
			}

			console.log('resp', resp)
			onResetForm()
			if(navigate) navigate('/patients')
		} catch (err) {
			console.log('error', err)
		}

	}


	const contextValue = {formState, handleInputChange}

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
						<Input label="Nombre" name="name" context={formContext} />
						<Input label="Apellido" name="lastname" context={formContext} />

						<div className="">
							<label>Género</label>
							<select name="gender" value={formState.gender} onChange={onInputChange}>
								<option value="mujer">Mujer</option>
								<option value="hombre">Hombre</option>
							</select>
						</div>

						<div className="flex gap-x-5 justify-between pt-4 col-span-2">
							<div className="w-32">
								<Button className="bg-primary border-primary text-white w-full">{id ? 'Actualizar' : 'Guardar'}</Button>
							</div>

							<ButtonLink link="/patients">Cancelar</ButtonLink>
						</div>
					</div>
				</form>
			</section>
		</formContext.Provider>
	</>)
}