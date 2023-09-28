import { useState, useEffect, createContext, useReducer, useRef } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useForm, useAxios } from '../../hooks'
import { useAppContext } from '../../App'
import crdState from './crdState'

import PageHeader from '../../components/PageHeader'
import {
	Sidebar,
	HeaderForm,
	HeaderSection,
	FromGroup,
	FromGroupContainer,
	CriteriosInclusionExclusionExclusion,
	FechaNacimiento,
	AntecedentesMedicos,
	FechaValoracion,
	Antropometria,
	CribadoNutricional,
	ResultadoCribadoNutricional,
	CribadoMuscular,
	ResultadoCribadoMuscular,
	DiagnosticoNutricionalUtilizado,
	ResultadoValoracionNutricional,
	ParametrosFuncionales,
	OtrasMedicionesDeComposicionCorporal,
	ResultadoValoracionMuscular,
	ObjetivosPlanteados,
	IniciaTratamientoNutricional,
	TipoTratamientoNutricionalIndicado,
	RefiereEndocrinologiaParaIniciarTratamientoNutricional,
	ActividadFisicaPrescripta,
	TiposDeEjercicios
} from './components'
import { Button } from '../../components/Ui'

import {
	reducerInitialStateFirst,
	reducerInitialStateInitial
} from './reducers'


const reducerFirst = (state, action) => {
	return state
}

const reducerInitial = (state, action) => {
	return state
}


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
	
	const { API_URI, user } = useAppContext()
	const { id, crd } = useLoaderData()
	const {token_type, token} = user
	const [ patient, setPatient ] = useState({name: '', gender: ''})
	const [ formType, setFormType ] = useState('first')
	const firstFooter = useRef(null)
	const initialFooter = useRef(null)
	// const navigate = useNavigate()

	const scrollToTheEnd = () => {
		switch(formType){
			case 'first':
				firstFooter.current.scrollIntoView({ behavior: 'smooth' })
				break;
			case 'initial':
				initialFooter.current.scrollIntoView({ behavior: 'smooth' })
				break;
		}
		return
	}


	const [ state_first, dispatchFirst ] = useReducer(reducerFirst, reducerInitialStateFirst)
	const [ state_initial, dispatchInitial ] = useReducer(reducerInitial, reducerInitialStateInitial)

	const {formState, setFormState, onInputChange, onResetForm} = useForm(crdState)

	const getPatient = useAxios({
		url: `${API_URI}/patient`,
		method: 'POST',
		body: {id},
		token: `${token_type} ${token}`
	})

	useEffect(() => {
		if( getPatient.response?.success ){
			// console.log(getPatient.response.data)
			const { name, lastname, gender } = getPatient.response.data
			
			setPatient({
				...patient, 
				name: `${name} ${lastname}`,
				gender
			})
			
			getPatient.response.success = null
		}
	}, [getPatient])


	useEffect(() => {
		if(id) setFormState({...formState, patient_id: id, visit_type: crd})
	}, [id, crd])

	const handleInputChange = e => onInputChange(e)


	const handleSubmit = async e => {
		e.preventDefault()
	}


	const contextValue = {
		patient,
		formState, 
		state_first,
		state_initial,
		handleInputChange
	}


	return (<>
		<PageHeader 
			title="CRD"
			breadcrumbs={[
				{title: 'Lista de pacientes', link: '/patients'},
				{title: 'CRD', current: true}
			]} />

		

		<formContext.Provider value={contextValue}>
			<section className="max-w-7xl pt-10 -mr-6 xl:mr-0">
				<div className="lg:grid lg:grid-cols-5 lg:gap-x-10">
					<Sidebar setFormType={val => { setFormType(val) }} />

					<div className="col-span-4 max-h-[73vh] scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-100 pt-2 pb-28 pr-10 xl:pr-14">
						{formType === 'first' 
						&& (<form onSubmit={handleSubmit}>
							<HeaderForm title="Visita inicial" context={formContext} />

							<div className="space-y-14 mt-14">
								<FromGroup>
									<HeaderSection title="Criterios de inclusión y exclusión" />
									<CriteriosInclusionExclusionExclusion context={formContext} />
								</FromGroup>
								
								<FromGroup>
									<HeaderSection title="Datos sociodemográficos" />
									<FromGroupContainer>
										<FechaNacimiento context={formContext} />
										<AntecedentesMedicos context={formContext} />
									</FromGroupContainer>
								</FromGroup>

								<FromGroup>
									<HeaderSection title="Ámbito asistencial" />
									<FromGroupContainer>
										<FechaValoracion context={formContext} />
										<Antropometria context={formContext} />
										<CribadoNutricional context={formContext} />
										<ResultadoCribadoNutricional context={formContext} />
										<CribadoMuscular context={formContext} />
										<ResultadoCribadoMuscular context={formContext} />
										<DiagnosticoNutricionalUtilizado context={formContext} />
										<ResultadoValoracionNutricional context={formContext} />
										<ParametrosFuncionales context={formContext} />
										<OtrasMedicionesDeComposicionCorporal context={formContext} />
										<ResultadoValoracionMuscular context={formContext} />
									</FromGroupContainer>
								</FromGroup>

								<FromGroup>
									<HeaderSection title="Tratamiento nutricional (si procede)" />
									<FromGroupContainer>
										<ObjetivosPlanteados context={formContext} />
										<IniciaTratamientoNutricional context={formContext} />
										<TipoTratamientoNutricionalIndicado context={formContext} />
										<RefiereEndocrinologiaParaIniciarTratamientoNutricional context={formContext} />
									</FromGroupContainer>
								</FromGroup>
								
								<FromGroup>
									<HeaderSection title="Actividad física - promoción" />
									<FromGroupContainer>
										<ActividadFisicaPrescripta context={formContext} />
										<TiposDeEjercicios context={formContext} />
									</FromGroupContainer>
								</FromGroup>

								<div className="">
									<Button className="btn-lg text-base bg-primary border-primary text-white">Guardar</Button>
								</div>
							</div>

							<div ref={firstFooter} />
						</form>)}


						{formType === 'initial' 
						&& (<form onSubmit={handleSubmit}>
							<HeaderForm title="Seguimiento 1" />
							<div ref={initialFooter} />
						</form>)}

					</div>
				</div>

			</section>


			{/* Scroll to the end of the "first" form */}
			{formType === 'first' 
			&& (<button 
						className="btn btn-icon bg-slate-400 border-slate-400 text-white bottom-10 right-10 absolute rounded-full"
						onClick={scrollToTheEnd}>
						<i className="ri-arrow-down-line top-0.5 relative"></i>
					</button>)}
			
			
			{/* Scroll to the end of the "initial" form */}
			{formType === 'initial'
			&& (<button
						className="btn btn-icon bg-slate-400 border-slate-400 text-white bottom-10 right-10 absolute rounded-full"
						onClick={scrollToTheEnd}>
						<i className="ri-arrow-down-line top-0.5 relative"></i>
					</button>)}
			
		</formContext.Provider>
	</>)
}