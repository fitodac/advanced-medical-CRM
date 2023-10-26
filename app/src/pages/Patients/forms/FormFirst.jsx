import { 
	useState,
	useEffect,
	createContext, 
	useMemo,
	useCallback
} from 'react'
import { 
	useForm,
	useAxios
} from '../../../hooks'
import { PropTypes } from 'prop-types'
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
	SituacionActualDelPaciente,
	AntropometriaSeguimiento1,
	ParametrosFuncionales,
	OtrasMedicionesDeComposicionCorporal,
	PacienteHaSeguidoTratamientoNutricional,
	HaConseguidoElPacienteElObjetivoNutricional,
	ConsideraQuePacientePercibeMejoria,
	PacienteHaSeguidoActividadFisica,
	ResultadoCribadoNutricional,
	ResultadoCribadoMuscular,
	RequiredFieldsMessage
} from '../components'
import { Button } from '../../../components/Ui'
import { Loading } from '../../../components'


const formContext = createContext({})



export const FormFirst = ({
	patient,
	formData,
	formMessages
}) => {

	const { API_URI, token, notify } = useAppContext()
	const [loading, setLoading] = useState(true)
	const [formSaved, setFormSaved] = useState(false)

	const {
		formState, 
		setFormState, 
		onInputChange, 
		// onResetForm
	} = useForm({})

	const [ messages, setMessage ] = useState({})
	useEffect(() => setMessage(formMessages), [formMessages])

	const {
		response: updateResponse,
		// error,
		// loading: updateLoading,
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
		// loading: createLoading,
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
			visit_type: 'first'
		})

		setLoading(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	const existentFormData = useMemo(() => {
		if(formData){
			const v = getVisitFormDataByType('first', formData)
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
		if( Object.keys(formState).length ) visitSessionStorage.set('first', formState)
	}, [formState])


	useEffect(() => {
		if( createResponse?.success ){
			notify(createResponse.message, 'success')
			setFormSaved(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createResponse])


	useEffect(() => {
		if( updateResponse?.success ){
			notify(updateResponse.message, 'success')
			setFormSaved(true)
		}
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
		messages,
		handleInputChange,
		formSaved
	}

	
	return (<>
	<formContext.Provider value={contextValue}>
		<form onSubmit={handleSubmit}>
			<HeaderForm 
				title="Visita Seguimiento 1" 
				dateFieldLabel="Fecha de la visita (día/mes/año) (≈3 meses de la visita basal)"
				context={formContext} />

			<div className="text-sm mt-8 space-y-4">
				<p>
					La visita de seguimiento se realizará en todos los 
					pacientes cribados, tanto los diagnosticados de desnutrición 
					en la visita basal como los que no presentaron riesgo de 
					desnutrición en visita basal.
				</p>

				<p className="italic">
					En aquellos pacientes que en visita basal no presentaran 
					riesgo o presencia de desnutrición, se plantea realizar 
					llamada de seguimiento realizado cribado en remoto con 
					herramienta R-MAPP (acceso a través de 
					<a 
						href="https://rmappnutrition.com/es" 
						target="_blank"
						rel="noreferrer">https://rmappnutrition.com/es</a>)
					y la automedición de circunferencia de pantorrilla por 
					parte del propio paciente, en línea con uno de los objetivos 
					del proyecto. Si sale en riesgo, se activarán las líneas
					habituales de valoración de cada centro (directamente citar 
					en consultas, remitir desde atención primaria, etc.)
				</p>
			</div>

			<div className="space-y-14 mt-8">
				<FromGroup>
					<FromGroupContainer>
						<SituacionActualDelPaciente context={formContext} />
						<ResultadoCribadoNutricional context={formContext} />
						<ResultadoCribadoMuscular context={formContext} />
					</FromGroupContainer>
				</FromGroup>
				
				<FromGroup>
					<HeaderSection title="Valoración del estado nutricional" />
					
					<FromGroupContainer>
						<AntropometriaSeguimiento1 context={formContext} /> 
						<ParametrosFuncionales context={formContext} /> 
						<OtrasMedicionesDeComposicionCorporal context={formContext} /> 
					</FromGroupContainer>
				</FromGroup>

				<FromGroup>
					<HeaderSection title="Tratamiento nutricional" />

					<FromGroupContainer>
						<PacienteHaSeguidoTratamientoNutricional context={formContext} />
						<HaConseguidoElPacienteElObjetivoNutricional context={formContext} />
						<ConsideraQuePacientePercibeMejoria context={formContext} />
						<PacienteHaSeguidoActividadFisica context={formContext} />
					</FromGroupContainer>
				</FromGroup>


				<div className="bg-white w-full py-4 flex items-center gap-x-8 bottom-0 fixed z-20 shadow-2xl">
					<Button className="btn-lg text-base bg-primary border-primary text-white">Guardar</Button>
					<RequiredFieldsMessage />
				</div>
			</div>
		</form>

		{/* <pre className="bg-black bg-opacity-70 text-white text-sm w-1/3 h-screen p-8 right-0 top-0 fixed overflow-y-auto">{JSON.stringify(formState, null, 2)}</pre> */}
	</formContext.Provider>

	{loading && (<Loading />)}
	</>)
}


FormFirst.propTypes = {
	patient: PropTypes.object.isRequired,
	formData: PropTypes.array,
	formMessages: PropTypes.object
}