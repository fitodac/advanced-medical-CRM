import { 
	useEffect,
	createContext, 
	useMemo,
	useCallback
} from 'react'
import { 
	useForm,
	useAxios
} from '../../../hooks'
import PropTypes from 'prop-types'
import { useAppContext } from '../../../hooks'
import { 
	getVisitFormDataByType,
	visitSessionStorage
} from '../../../helpers'


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
} from '../components'
import { Button } from '../../../components/Ui'
import { Loading } from '../../../components'

const formContext = createContext({})

export const FormInitial = ({
	patient,
	formData
}) => {

	const { API_URI, token, notify } = useAppContext()

	const {
		formState, 
		setFormState, 
		onInputChange, 
		// onResetForm
	} = useForm({})


	const {
		response: updateResponse,
		// error,
		loading: updateLoading,
		refetch: updateRefetch
	} = useAxios({
		url: `${API_URI}/visit/update`,
		method: 'PUT',
		body: {...formState},
		token,
		init: 0
	})


	const {
		response: createResponse,
		// error,
		loading: createLoading,
		refetch: createRefetch
	} = useAxios({
		url: `${API_URI}/visit/create`,
		method: 'POST',
		body: {...formState},
		token,
		init: 0
	})


	useEffect(() => {
		setFormState({
			...formState,
			patient_id: patient.id,
			visit_type: 'initial'
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const existentFormData = useMemo(() => {
		if(formData){
			const v = getVisitFormDataByType('initial', formData)
			return v.id ? v : null
		}
	}, [formData])


	useEffect(() => {
		if( existentFormData ){
			setFormState({
				...formState,
				...existentFormData
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [existentFormData])


	const handleInputChange = e => onInputChange(e)


	useEffect(() => {
		if( Object.keys(formState).length ) visitSessionStorage.set('initial', formState)
	}, [formState])


	useEffect(() => {
		if( createResponse?.success ) notify(createResponse.message, 'success')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createResponse])
	


	useEffect(() => {
		if( updateResponse?.success ) notify(updateResponse.message, 'success')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateResponse])


	const handleSubmit = useCallback(e => {
		if(e) e.preventDefault()

		if( formState.id ){
			updateRefetch()
		}else{
			createRefetch()
		}
	}, [formState, createRefetch, updateRefetch])


	const contextValue = {
		patient,
		formState, 
		handleInputChange
	}


	return (<>
	<formContext.Provider value={contextValue}>
		<form onSubmit={handleSubmit}>
			<HeaderForm 
				title="Visita inicial" 
				dateFieldLabel="Fecha"
				context={formContext} />

			<div className="space-y-14 mt-8">
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
		</form> 

		{/* <pre className="bg-black bg-opacity-70 text-white text-sm w-1/3 h-screen p-8 right-0 top-0 fixed overflow-y-auto">{JSON.stringify(formState, null, 2)}</pre> */}
	</formContext.Provider>

	{(createLoading || updateLoading) && (<Loading />)}
	</>)
}


FormInitial.propTypes = {
	patient: PropTypes.object.isRequired,
	formData: PropTypes.array
}