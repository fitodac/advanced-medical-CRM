import { useState, useEffect, createContext } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useAxios, useForm } from '../../hooks'
import { useAppContext } from '../../hooks'

import {
	Loading,
	PageHeader
} from '../../components'
import { Input, Button, ButtonLink } from '../../components/Ui'


export const formContext = createContext({})

export async function loader({params}){ return {...params, id: parseInt(params.id)} }

export default function Page(){

	const { API_URI, token, notify } = useAppContext()
	const { id } = useLoaderData()
	const [ loading, setLoading ] = useState(true)
	const navigate = useNavigate()

	const {formState, setFormState, onInputChange, onResetForm} = useForm({
		code: '',
		name: ''
	})

	const handleInputChange = e => onInputChange(e)

	// Get center data on edition
	const {
		response, 
		// error, 
		loading: getCenterLoading, 
		refetch
	} = useAxios({
		url: `${API_URI}/center`,
		method: 'POST',
		body: {id},
		token,
		init: 0
	})

	// Create center
	const { 
		response: createCenterResponse, 
		// error: createCenterError, 
		// loading: createCenterLoading, 
		refetch: createCenterRefetch 
	} = useAxios({
		url: `${API_URI}/center/create`,
		method: 'POST',
		body: {...formState},
		token,
		init: 0
	})

	// Upadate center
	const { 
		response: updateCenterResponse, 
		// error: updateCenterError, 
		// loading: updateCenterLoading, 
		refetch: updateCenterRefetch 
	} = useAxios({
		url: `${API_URI}/center/update`,
		method: 'PUT',
		body: {...formState, id},
		token,
		init: 0
	})

	useEffect(() => {
		if( response?.success ){
			const { name, code } = response.data
			setFormState({
				...formState, 
				name, 
				code
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [response])

	useEffect(() => setLoading(getCenterLoading), [getCenterLoading])

	useEffect(() => {
		if( createCenterResponse?.success ){
			notify(createCenterResponse.message, 'success')
			onResetForm()
			if(navigate) navigate('/medical-centers')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createCenterResponse])

	useEffect(() => {
		if( updateCenterResponse?.success ){
			notify(updateCenterResponse.message, 'success')
			onResetForm()
			if(navigate) navigate('/medical-centers')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateCenterResponse])

	useEffect(() => {
		if( id ){
			refetch()
		}else{
			setLoading(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])



	const handleSubmit = e => {
		e.preventDefault()
		
		try {
			if( id ){
				updateCenterRefetch()
			}else{ 
				createCenterRefetch()
			}
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
							<Input label="Código" name="code" className="uppercase" maxlength={5} context={formContext} disabled={id ? true : false} />
						</div>

						<div className="flex gap-x-5 justify-between pt-4">
							<ButtonLink link="/medical-centers">Cancelar</ButtonLink>
							
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