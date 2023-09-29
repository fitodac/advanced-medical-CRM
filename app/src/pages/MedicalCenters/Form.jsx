import { useState, useEffect, createContext } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Create, Update } from '../../api/medicalCenter'
import { useAxios, useForm } from '../../hooks'
import { useAppContext } from '../../App'

import {
	Loading,
	PageHeader
} from '../../components'
import { Input, Button, ButtonLink } from '../../components/Ui'


export const formContext = createContext({})

export async function loader({params}){ return {...params, id: parseInt(params.id)} }

export default function Page(){

	const { API_URI, token } = useAppContext()
	const { id } = useLoaderData()
	const [ loading, setLoading ] = useState(true)
	const navigate = useNavigate()

	const {formState, setFormState, onInputChange, onResetForm} = useForm({
		code: '',
		name: ''
	})

	const handleInputChange = e => onInputChange(e)

	const getCenter = useAxios({
		url: `${API_URI}/center`,
		method: 'POST',
		body: {id},
		token
	})

	useEffect(() => {
		if( id && getCenter.response?.success ){
			const { name, code } = getCenter.response.data
			setFormState({
				...formState, 
				name, 
				code
			})
			getCenter.response.success = null
		}
		setLoading(false)
	}, [getCenter])


	const handleSubmit = async e => {
		e.preventDefault()
		let resp
		
		try {
			if( id ){
				resp = await Update(token, {...formState, code: formState.code.toUpperCase(), id: parseInt(id)})
			}else{ 
				resp = await Create(token, {...formState, code: formState.code.toUpperCase()})
			}
			
			console.log('resp', resp)
			onResetForm()
			if(navigate) navigate('/medical-centers')

		} catch (err) {
			console.log('error', err)
		}
	}


	const contextValue = {formState, handleInputChange}


	return (<>
		<PageHeader 
			title={ id ? 'Centro médico' : 'Nuevo centro médico'}
			breadcrumbs={[
				{title: 'Lista de centros médicos', link: '/medical-centers'},
				{title: id ? 'Centro médico' : 'Nuevo centro médico', current: true}
			]} />

		<formContext.Provider value={contextValue}>
			<section className="max-w-sm pt-5">
				<form onSubmit={handleSubmit}>
					<div className="space-y-4">
						<Input label="Nombre" name="name" context={formContext} />

						<div className="w-32">
							<Input label="Código" name="code" className="uppercase" maxlength={5} context={formContext} />
						</div>

						<div className="flex gap-x-5 justify-between pt-4">
							<div className="w-32">
								<Button className="bg-primary border-primary text-white w-full">{id ? 'Actualizar' : 'Guardar'}</Button>
							</div>

							<ButtonLink link="/medical-centers">Cancelar</ButtonLink>
						</div>
					</div> 
				</form>
			</section>
		</formContext.Provider>

		{loading && (<Loading />)}
	</>)

}