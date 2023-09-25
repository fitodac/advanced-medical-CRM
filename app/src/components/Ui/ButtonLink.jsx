import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'


ButtonLink.propTypes = {
  children: PropTypes.node.isRequired,
	link: PropTypes.string.isRequired,
	className: PropTypes.string
}

export default function ButtonLink(props){

	const {children, link, className} = props

	return (<NavLink className={className ? `btn ${className}` : 'btn'} to={link}>{children}</NavLink>)
}