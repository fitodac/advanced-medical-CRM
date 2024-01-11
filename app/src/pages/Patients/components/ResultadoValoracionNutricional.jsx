import { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { HeaderFieldGroup, AlertMessage } from '.'

import fields from '../formfields/resultadoValoracionNutricional'

const id = 'Z0A1B2'

export const ResultadoValoracionNutricional = ({ context }) => {
	const formContext = useContext(context)
	const [input_visible, setInputVisible] = useState(false)
	const [chkState, setChkState] = useState('')

	useEffect(() => {
		formContext.handleInputChange({
			target: { name: fields[0].name, value: chkState },
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chkState])

	const handleChange = (e) => {
		const { value, checked } = e.target
		setChkState(checked ? value : '')
		if ('si' !== value)
			formContext.handleInputChange({
				target: { name: 'patient_malnourished__code', value: '' },
			})
		setInputVisible('si' === value)
	}

	return (
		<>
			<section className="space-y-3" id={id}>
				<HeaderFieldGroup
					title="Resultado de la valoración nutricional"
					subtitle="¿Está el paciente desnutrido?"
					required
				/>

				<div className="space-y-3">
					{fields.map(({ key, name, value, label }) => (
						<AlertMessage key={key} name={name} context={context}>
							<div key={key} className="flex gap-6 items-start">
								{key !== 'patient_malnourished_3' ? (
									<label className="input-checkbox w-40">
										<input
											type="radio"
											name={name}
											onChange={handleChange}
											defaultValue={value}
											checked={formContext.formState[name] === value}
										/>

										<span>{label}</span>
									</label>
								) : (
									<>
										<label className="input-checkbox w-40">
											<input
												type="radio"
												name={name}
												onChange={handleChange}
												defaultValue={value}
												checked={formContext.formState[name] === value}
											/>

											<span>{label}</span>
										</label>

										{('si' === formContext.formState[name] ||
											input_visible) && (
											<Selectors
												fieldChange={(e) => formContext.handleInputChange(e)}
												state={formContext.formState}
											/>
											// <div className="w-full flex gap-x-4">
											// 	<label className="text-sm font-light">Codificación desnutrición según CIE 10</label>
											// 	<div className="w-28 relative -top-2">
											// 		<Input name="patient_malnourished__code" context={context} />
											// 	</div>
											// </div>
										)}
									</>
								)}
							</div>
						</AlertMessage>
					))}
				</div>
			</section>
		</>
	)
}

ResultadoValoracionNutricional.propTypes = {
	context: PropTypes.object.isRequired,
}

function Selectors({ fieldChange, state }) {
	const handleChange = (e) => fieldChange(e)

	return (
		<div className="w-full grid grid-cols-2 gap-x-5">
			<div>
				<label>Diagnóstico</label>
				<select
					name="patient_malnourished__diagnosis"
					onChange={handleChange}
					defaultValue={state.patient_malnourished__diagnosis}
				>
					<option value=""></option>
					<option
						value="E46 Riesgo nutricional (cribado positivo o solo un criterio GLIM que
						no permite diagnóstico)"
					>
						E46 Riesgo nutricional (cribado positivo o solo un criterio GLIM que
						no permite diagnóstico)
					</option>
					<option value="E44.0 DRE moderada">E44.0 DRE moderada</option>
					<option value="E43 DRE grave">E43 DRE grave</option>
				</select>
			</div>

			<div>
				<label>Procedimiento</label>
				<select
					name="patient_malnourished__procedure"
					onChange={handleChange}
					defaultValue={state.patient_malnourished__procedure}
				>
					<option value=""></option>
					<option value="3E0436Z Nutrición parenteral por vía central">
						3E0436Z Nutrición parenteral por vía central
					</option>
					<option value="3E0336Z Nutrición parenteral por vía periférica">
						3E0336Z Nutrición parenteral por vía periférica
					</option>
					<option value="3E0G76Z Suplementos orales / nutrición enteral oral">
						3E0G76Z Suplementos orales / nutrición enteral oral
					</option>
					<option value="3E0H76Z Nutrición enteral por SNY">
						3E0H76Z Nutrición enteral por SNY
					</option>
					<option value="3E0G36Z Nutrición enteral por SNG / gastrostomía">
						3E0G36Z Nutrición enteral por SNG / gastrostomía
					</option>
					<option value="3E0H36Z Nutrición enteral por SNY/yeyunostomía">
						3E0H36Z Nutrición enteral por SNY/yeyunostomía
					</option>
				</select>
			</div>
		</div>
	)
}

Selectors.propTypes = {
	fieldChange: PropTypes.func,
	state: PropTypes.object,
}
