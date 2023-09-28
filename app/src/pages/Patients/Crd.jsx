import { useState, useEffect, createContext, useReducer } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { 
	useAuth, 
	useForm, 
	useAxios 
} from '../../hooks'
import { useAppContext } from '../../App'
import crdState from './crdState'

import PageHeader from '../../components/PageHeader'
import { 
	Input,
	Button,
	CheckboxList,
	CheckboxGroup,
	InputDate
} from '../../components/Ui'
import {
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
	CribadoNutricionalResults,
	CribadoMuscular,
	CribadoMuscularResults,
	DiagnosticoNutricionalUtilizado,
	ResultadoValoracionNutricional,
	ParametrosFuncionales,
	OtrasMedicionesDeComposicionCorporal
} from './components'
import {
	reducerInitialStateFirst,
	reducerInitialStateInitial
} from './reducers'
import { Navbar } from './Navbar'


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
	
	const { id, crd } = useLoaderData()
	const { user } = useAuth()
	const {token_type, token} = user
	const [ patient, setPatient ] = useState({name: '', gender: ''})
	const [ formType, setFormType ] = useState('first')

	// const navigate = useNavigate()
	const { API_URI } = useAppContext()

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
					<Navbar setFormType={val => { setFormType(val) }} />

					<div className="col-span-4 max-h-[73vh] scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-100 pt-2 pr-10 xl:pr-14">
						{ formType === 'first' 
						&& (<form onSubmit={handleSubmit}>
							<HeaderForm title="Visita inicial" patient={patient} context={formContext} />

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
										<CribadoNutricionalResults context={formContext} />
										<CribadoMuscular context={formContext} />
										<CribadoMuscularResults context={formContext} />
										<DiagnosticoNutricionalUtilizado context={formContext} />
										<ResultadoValoracionNutricional context={formContext} />
										<ParametrosFuncionales context={formContext} />
										<OtrasMedicionesDeComposicionCorporal context={formContext} />
									</FromGroupContainer>
								</FromGroup>

							</div>
						</form>)}



						{ formType === 'initial' 
						&& (<form onSubmit={handleSubmit}>
							<HeaderForm title="Seguimiento 1" patient={patient} />
						</form>)}

					</div>
				</div>

				
			</section>
		</formContext.Provider>
	</>)
}