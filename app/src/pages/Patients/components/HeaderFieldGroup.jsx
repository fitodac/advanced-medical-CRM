import PropTypes from 'prop-types'

export const HeaderFieldGroup = ({
	title,
	subtitle
}) => {
	return (<div className="leading-tight select-none">
						{title && (<div className="text-primary font-extrabold">{title}</div>)}
						{subtitle && (<div className="text-slate-400 text-sm">{subtitle}</div>)}
					</div>)
}


HeaderFieldGroup.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
}