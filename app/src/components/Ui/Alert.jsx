import PropTypes from 'prop-types'

export const Alert = ({ type, data }) => {

	const color = type === 'error' ? 'red' :  'green'


	return (<div className={`bg-${color}-100 text-center p-7 rounded-lg`}>
						<div className={`text-${color}-700 font-semibold`}>{ data.statusText }</div>
						<div className={`text-${color}-700`}>{ data.message }</div>
					</div>)
}


Alert.propTypes = {
	type: PropTypes.string.isRequired,
	data: PropTypes.object
}


// bg-red-100
// text-red-700