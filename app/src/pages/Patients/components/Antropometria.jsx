import PropTypes from 'prop-types'
import { useContext, useEffect } from 'react'
import { InputMask } from '../../../components/Ui'
import { HeaderFieldGroup, AlertMessage } from '.'
import {
	calculateLossLastSixMonths,
	calculateWeightLossPercentage,
	calculateBmi,
} from '../../../helpers'

import fields from '../formfields/antropometria'

const id = 'L2M3N4'

export const Antropometria = ({ context }) => {
	const c = useContext(context)
	const { usual_body_weight, current_body_weight, height } = c.formState

	useEffect(() => {
		c.setFormState({
			...c.formState,
			loss_last_six_months: calculateLossLastSixMonths(c.formState),
			weight_loss_percentage: calculateWeightLossPercentage(c.formState),
			BMI: calculateBmi(c.formState),
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [usual_body_weight, current_body_weight, height])

	return (
		<>
			<section className="space-y-3" id={id}>
				<HeaderFieldGroup title="Antropometría" required />

				{fields.map(({ name, label, append }) => (
					<AlertMessage key={label} name={name} context={context}>
						<div key={label} className="grid grid-cols-12 gap-x-4">
							<div className="col-span-3 flex items-center">
								<label className="text-sm leading-none font-normal w-full block select-none">
									{label}
								</label>
							</div>

							<div className="col-span-2 lg:col-span-2">
								<InputMask
									name={name}
									context={context}
									readonly={
										'loss_last_six_months' === name ||
										'weight_loss_percentage' === name ||
										'BMI' === name
									}
								/>
							</div>

							<div className="col-span-3 flex items-center">
								<label className="leading-none w-full block select-none">
									{append}
								</label>
							</div>
						</div>
					</AlertMessage>
				))}
			</section>
		</>
	)
}

Antropometria.propTypes = {
	context: PropTypes.object.isRequired,
}
