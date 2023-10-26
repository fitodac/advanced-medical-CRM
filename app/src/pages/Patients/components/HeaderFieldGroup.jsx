import PropTypes from 'prop-types'

export const HeaderFieldGroup = ({
	title,
	subtitle,
	required
}) => {

	return (<div className="leading-tight select-none">
						{title && (
						<div className="text-primary font-extrabold">
							{title} 

							{required && (
							<svg 
								xmlns="http://www.w3.org/2000/svg" 
								viewBox="0 0 24 24"
								className="fill-red-600 w-3 pl-0.5 inline -top-1 relative">
								<path d="M12.9993 3L12.9991 10.267L19.2935 6.63397L20.2935 8.36602L14.0001 11.999L20.2935 15.634L19.2935 17.366L12.9991 13.732L12.9993 21H10.9993L10.9991 13.732L4.70508 17.366L3.70508 15.634L9.99808 12L3.70508 8.36602L4.70508 6.63397L10.9991 10.267L10.9993 3H12.9993Z" />
							</svg>
							)}
						</div>
						)}
						{subtitle && (<div className="text-slate-400 text-sm">{subtitle}</div>)}
					</div>)
}


HeaderFieldGroup.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	required: PropTypes.bool
}