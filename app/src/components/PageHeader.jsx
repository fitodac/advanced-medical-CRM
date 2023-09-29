import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { ButtonLink } from '../components/Ui'

const navItemClassName = 'transition-all hover:text-primary'
const navItemActiveClassName = 'text-teal'

export const PageHeader = (props) => {

	const {
		title,
		buttons,
		breadcrumbs
	} = props


	return (<div className="flex justify-between">
		<div>
			<h1 className="text-primary text-3xl font-semibold leading-tight select-none">{title}</h1>

			{ breadcrumbs
			? (<ul className="text-slate-400 text-sm leading-none flex items-center mt-2 select-none">
					<li className="flex items-center">
						<NavLink to="/" className={({isActive}) => isActive ? navItemActiveClassName : navItemClassName}>Dashboard</NavLink>
					</li>
					
					{ breadcrumbs.map((e,i) => (<li key={i} className="flex items-center">
						<span className="bg-slate-200 w-px h-4 mx-2.5 inline-block" />
						{e.current 
						? (<span className={navItemActiveClassName}>{e.title}</span>)
						: (<NavLink to={e.link} className={navItemClassName}>{e.title}</NavLink>)}
					</li>)) }
				</ul>)
			: null }
			
		</div>

		{buttons && 
			buttons.map((e, i) => (
			<ButtonLink 
				link={e.link} 
				key={i}
				className="bg-teal border-teal text-white">
				{e.text}
			</ButtonLink>))}
		
	</div>)

}


PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
	buttons: PropTypes.array,
	breadcrumbs: PropTypes.array
}