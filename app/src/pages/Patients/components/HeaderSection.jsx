import PropTypes from 'prop-types'

export const HeaderSection = ({title}) => {
	return (<div className="text-slate-400 border-b text-sm font-medium uppercase leading-tight py-1 select-none">{title}</div>)
}


HeaderSection.propTypes = {
	title: PropTypes.string.isRequired
}