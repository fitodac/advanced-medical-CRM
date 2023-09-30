import { 
	createContext, 
	// useEffect 
} from 'react'
import { 
	useForm
} from '../../../hooks'
import PropTypes from 'prop-types'
import crdState from '../crdState'

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


// eslint-disable-next-line react-refresh/only-export-components
export const formContext = createContext({})


export const FormFirst = ({
	patient
}) => {

	const {
		formState, 
		// setFormState, 
		onInputChange, 
		// onResetForm
	} = useForm({...crdState})


	const handleInputChange = e => onInputChange(e)
	const handleSubmit = async e => e.preventDefault()
	
	
	const contextValue = {
		patient,
		formState, 
		handleInputChange
	}


	return (<>
	<formContext.Provider value={contextValue}>
		<form onSubmit={handleSubmit}>
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
		</form>

		{/* <pre className="bg-black bg-opacity-70 text-white text-sm h-screen p-8 right-0 top-0 fixed overflow-y-auto">{JSON.stringify(formState, null, 2)}</pre> */}
	</formContext.Provider>
	</>)
}


FormFirst.propTypes = {
	patient: PropTypes.object.isRequired
}