import PropTypes from 'prop-types'
import { CheckboxGroup } from '../../../components/Ui'
import { HeaderFieldGroup } from '.'

import fields from '../formfields/criteriosInclusionExclusion'

const id = 'criteriosInclusionExclusion'


export const CriteriosInclusionExclusionExclusion = ({context}) => {

	return (<>
		<section className="space-y-7" id={id}>
			<div className="space-y-3">
				<HeaderFieldGroup title="Criterios de inclusión" />
				<CheckboxGroup options={fields.criteriosDeInclusion} />
			</div>
			
			<div className="space-y-3">
				<HeaderFieldGroup title="Criterios de exclusión" />
				<CheckboxGroup options={fields.criteriosDeExclusion} />
			</div>
		</section>
	</>)
}


CriteriosInclusionExclusionExclusion.propTypes = {
	context: PropTypes.object.isRequired
}