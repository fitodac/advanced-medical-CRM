import { useEffect, createContext } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useForm } from '../../hooks/useForm'
import { 
	CriteriosDeInclusion 
} from '../../helpers/crdForm'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Ui/Input'
import Button from '../../components/Ui/Button'

export const formContext = createContext({})

export async function loader({request, params}){ 
	const crd = request.url.indexOf('/initial') ? 'initial' : request.url.indexOf('/first') ? 'first' : null
	return {
		...params,
		crd,
		id: parseInt(params.id)
	}
}



export default function Page(){
	
	const { id, crd } = useLoaderData()
	const { user } = useAuth()
	const {token_type, token} = user
	const auth_id = user.info.id
	const navigate = useNavigate()


	useEffect(() => {}, [])

	const {formState, setFormState, onInputChange, onResetForm} = useForm({
		patient_id: id,
		visit_type: crd,
		date: ''
	})

	const handleInputChange = e => onInputChange(e)


	const handleSubmit = async e => {
		e.preventDefault()
	}


	const contextValue = {formState, handleInputChange}


	return (<>
		<PageHeader 
			title="CRD"
			breadcrumbs={[
				{title: 'Lista de pacientes', link: '/patients'},
				{title: 'CRD', current: true}
			]} />

		<formContext.Provider value={contextValue}>
			<section className="max-w-3xl pt-5">
				<div className="text-lg font-bold">Visita inicial</div>

				<form onSubmit={handleSubmit}>
					<div className="space-y-14">
						<div className="grid grid-cols-2 gap-x-6 gap-y-4">
							<Input label="Paciente" name="patient_id" context={formContext} />
							<Input label="Tipo de visita" name="visit_type" context={formContext} />
							<Input label="Fecha" name="date" context={formContext} />
						</div>


						<section className="space-y-5">
							<div className="font-bold">Criterios de inclusión y exclusión</div>
							<div className="space-y-3">
								<CriteriosDeInclusion />

								{/* 


								Mirá este datepicker...
								https://mymth.github.io/vanillajs-datepicker/#/ 

								
								*/}
							</div>
						</section>

					</div>
				</form>
			</section>
		</formContext.Provider>
	</>)
}