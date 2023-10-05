import { 
	createContext,
	useEffect,
	useMemo,
	// useState
} from 'react'
import { 
	useForm,
	// useAxios
} from '../../../hooks'
import { PropTypes } from 'prop-types'
// import { useAppContext } from '../../../App'
import {
	getVisitFormDataByType
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
	PacienteHaSeguidoActividadFisica
} from '../components'
import { Button } from '../../../components/Ui'

const formContext = createContext({})

export const FormFirst = ({
	patient,
	formData
}) => {

	// const { API_URI, token } = useAppContext()
	// const [ loadingState, setLoadingState ] = useState(false)
	const {
		formState, 
		setFormState, 
		onInputChange, 
		// onResetForm
	} = useForm({})

	useEffect(() => {
		setFormState({
			...formState,
			patient_id: patient.id,
			visit_type: 'initial'
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const existentFormData = useMemo(() => {
		if(formData) return getVisitFormDataByType('first', formData)
	}, [formData])


	useEffect(() => {
		setFormState({
			...formState,
			...existentFormData
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [existentFormData])

	const handleInputChange = e => onInputChange(e)
	
	const handleSubmit = e => {
		e.preventDefault()
		console.log('formState', formState)
	}



	const contextValue = {
		patient,
		formState, 
		handleInputChange
	}

	
	return (<>
	<formContext.Provider value={contextValue}>
		<form onSubmit={handleSubmit}>
			<HeaderForm 
				title="Visita Seguimiento 1" 
				dateFieldLabel="Fecha de la visita (≈3 meses de la visita basal)"
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
					<SituacionActualDelPaciente context={formContext} /> 
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


				<div className="">
					<Button className="btn-lg text-base bg-primary border-primary text-white">Guardar</Button>
				</div>
			</div>
		</form>

		{/* <pre className="bg-black bg-opacity-70 text-white text-sm w-1/3 h-screen p-8 right-0 top-0 fixed overflow-y-auto">{JSON.stringify(formState, null, 2)}</pre> */}
	</formContext.Provider>
	</>)
}


FormFirst.propTypes = {
	patient: PropTypes.object.isRequired,
	formData: PropTypes.array
}