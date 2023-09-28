import PropTypes from 'prop-types'

const menu = [
	{
		toId: 'criteriosInclusionExclusion',
		label: 'Criterios de inclusión y exclusión'
	},
	{
		toId: 'datosSociodemograficos',
		label: 'Datos sociodemográficos'
	}
]

export const MenuFirst = ({
	title,
	menuClass,
	handleScroll
}) => {

	const handleClick = id => handleScroll(id)

	return (<>
		<div className={menuClass.title}>{title}</div>

		<ul className={menuClass.ul}>
			{menu.map(({toId, label}) => (<li key={toId}>
				<button 
					className={menuClass.nav}
					onClick={() => handleClick(toId)}>{label}</button>
			</li>))}
		</ul>
	</>)
}

MenuFirst.propTypes = {
	title: PropTypes.string,
	menuClass: PropTypes.object,
	handleScroll: PropTypes.func
}