import { useEffect, createContext } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useForm } from '../../hooks/useForm'
import data from './crdFormData'
import crdState from './crdState'

import PageHeader from '../../components/PageHeader'
import { 
	Input,
	Button,
	CheckboxList,
	CheckboxGroup
} from '../../components/Ui'

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


	const {formState, setFormState, onInputChange, onResetForm} = useForm(crdState)

	useEffect(() => {
		if(id) setFormState({...formState, patient_id: id, visit_type: crd})
	}, [id, crd])

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


						{/* Criterios de inclusión y exclusión */}
						<section className="space-y-5">
							<div className="text-slate-400 border-b text-sm font-medium uppercase leading-tight py-1">Criterios de inclusión y exclusión</div>
							<section className="space-y-7">
								<div className="space-y-3">
									<div className="font-bold">Criterios de inclusión</div>
									<CheckboxGroup options={data.criteriosDeInclusion} />
								</div>
								
								<div className="space-y-3">
									<div className="font-bold">Criterios de exclusión</div>
									<CheckboxGroup options={data.criteriosDeExclusion} />
								</div>
							</section>
						</section>


						{/* Datos sociodemográficos */}
						<section className="space-y-5">
							<div className="text-slate-400 border-b text-sm font-medium uppercase leading-tight py-1">Datos sociodemográficos</div>
							<section className="space-y-7">
								<div className="space-y-3">
									<div className="leading-tight">
										<div className="font-bold">Antecedentes médicos</div>
										<div className="text-sm font-medium">(Especificar patología y estadío si procede)</div>
									</div>
									<CheckboxList options={data.antecedentesMedicos} />
								</div>
							</section>
						</section>


						{/* Ámbito asistencial */}
						<section className="space-y-5">
							<div className="text-slate-400 border-b text-sm font-medium uppercase leading-tight py-1">Ámbito asistencial</div>
							<section className="space-y-7">
								<div className="space-y-3">
									<div className="leading-tight">
										<div className="font-bold">Fecha de valoración</div>
									</div>
									<CheckboxList options={data.fechaDeValoracion} />
								</div>
								
								<div className="space-y-3">
									<div className="leading-tight">
										<div className="font-bold">Valoración del estado nutricional</div>
									</div>
									<CheckboxList options={data.cribadoNutricional} />
								</div>
								
								<div className="space-y-3">
									<div className="leading-tight">
										<div className="font-bold">Resultado del cribado nutricional</div>
										<div className="text-sm font-medium">¿Está el paciente en riesgo de desnutrición?</div>
									</div>
									<CheckboxList options={data.resultadoDeCribadoNutricional} />
								</div>

								<div className="space-y-3">
									<div className="leading-tight">
										<div className="font-bold">Cribado muscular</div>
									</div>
									<CheckboxList options={data.cribadoMuscular} />
								</div>

								<div className="space-y-3">
									<div className="leading-tight">
										<div className="font-bold">Resultado del cribado muscular</div>
									</div>
									<CheckboxList options={data.pacienteEnRiesgoDeSarcopenia} />
								</div>

								<div className="space-y-3">
									<div className="leading-tight">
										<div className="font-bold">Diagnóstico nutricional utilizado</div>
									</div>
									<CheckboxList options={data.diagnosticoNutricionalUtilizado} />
								</div>
								
								<div className="space-y-3">
									<div className="leading-tight">
										<div className="font-bold">Resultado de la valoracieon nutricional</div>
										<div className="text-sm font-medium">¿Está el paciente desnutrido?</div>
									</div>
									<CheckboxList options={data.resultadoDeLaValoracionNutricional} />
								</div>
							</section>
						</section>

					</div>
				</form>
			</section>
		</formContext.Provider>
	</>)
}