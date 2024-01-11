import { useEffect, createContext, useMemo, useCallback, useState } from 'react'
import { useForm, useAxios } from '../../../hooks'
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
	TiposDeEjercicios,
	RequiredFieldsMessage,
} from '../components'
import { Button } from '../../../components/Ui'
import { Loading } from '../../../components'

const formContext = createContext({})

export const FormInitial = ({ patient, formData, formMessages }) => {
	const { API_URI, token, notify } = useAppContext()
	const [loading, setLoading] = useState(true)
	const [formSaved, setFormSaved] = useState(false)

	const {
		formState,
		setFormState,
		onInputChange,
		// onResetForm
	} = useForm({})

	const [messages, setMessage] = useState({})
	useEffect(() => setMessage(formMessages), [formMessages])

	const {
		response: updateResponse,
		error: updateError,
		// loading: updateLoading,
		refetch: updateRefetch,
	} = useAxios({
		url: `${API_URI}/visit/update`,
		method: 'PUT',
		body: { ...formState },
		token,
		init: 0,
	})

	const {
		response: createResponse,
		error: createError,
		// loading: createLoading,
		refetch: createRefetch,
	} = useAxios({
		url: `${API_URI}/visit/create`,
		method: 'POST',
		body: { ...formState },
		token,
		init: 0,
	})

	useEffect(() => {
		setFormState({
			...formState,
			patient_id: patient.id,
			visit_type: 'initial',
		})

		setLoading(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const existentFormData = useMemo(() => {
		if (formData) {
			const v = getVisitFormDataByType('initial', formData)
			return v.id ? v : null
		}
	}, [formData])

	useEffect(() => {
		if (existentFormData) {
			setFormState({
				...formState,
				...existentFormData,
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [existentFormData])

	const handleInputChange = (e) => {
		const { name, value } = e.target

		if ('usual_body_weight' === name) {
			console.log(name, value)
			setFormState({...formState, loss_last_six_months: value})
			// onInputChange({ target: { name: 'loss_last_six_months', value: '21' } })
		}

		onInputChange(e)
	}

	useEffect(() => {
		if (Object.keys(formState).length) {
			visitSessionStorage.set('initial', formState)
		}
	}, [formState])

	useEffect(() => {
		if (createResponse?.success) {
			notify(createResponse.message, 'success')
			setFormSaved(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createResponse])

	useEffect(() => {
		if (updateResponse?.success) {
			notify(updateResponse.message, 'success')
			setFormSaved(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateResponse])

	useEffect(() => {
		if (createError) {
			console.log('createError')
			let errorMessage = ''
			for (let e in createError.message) {
				createError.message[e].forEach((msg) => {
					errorMessage += msg + '\n' // Añade un carácter de nueva línea después de cada mensaje
				})
			}
			notify(errorMessage, 'error')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createError])

	useEffect(() => {
		if (updateError) {
			console.log('updateError')
			let errorMessage = ''
			for (let e in updateError.message) {
				updateError.message[e].forEach((msg) => {
					errorMessage += msg + '\n' // Añade un carácter de nueva línea después de cada mensaje
				})
			}
			notify(errorMessage, 'error')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateError])

	const handleSubmit = useCallback(
		(e) => {
			if (e) e.preventDefault()

			if (formState.id) {
				updateRefetch()
			} else {
				createRefetch()
			}
		},
		[formState, createRefetch, updateRefetch]
	)

	const contextValue = {
		patient,
		formState,
		messages,
		handleInputChange,
		setFormState,
		formSaved,
	}

	return (
		<>
			<formContext.Provider value={contextValue}>
				<form onSubmit={handleSubmit}>
					<HeaderForm
						title="Visita inicial"
						dateFieldLabel="Fecha (día/mes/año)"
						context={formContext}
					/>

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
								<RefiereEndocrinologiaParaIniciarTratamientoNutricional
									context={formContext}
								/>
							</FromGroupContainer>
						</FromGroup>

						<FromGroup>
							<HeaderSection title="Actividad física - promoción" />
							<FromGroupContainer>
								<ActividadFisicaPrescripta context={formContext} />
								<TiposDeEjercicios context={formContext} />
							</FromGroupContainer>
						</FromGroup>

						<div className="bg-white w-full py-4 flex items-center gap-x-8 bottom-0 fixed z-20 shadow-2xl">
							<Button className="btn-lg text-base bg-primary border-primary text-white">
								Guardar
							</Button>
							<RequiredFieldsMessage />
						</div>
					</div>
				</form>
			</formContext.Provider>

			{loading && <Loading />}
		</>
	)
}

FormInitial.propTypes = {
	patient: PropTypes.object.isRequired,
	formData: PropTypes.array,
	formMessages: PropTypes.object,
}
