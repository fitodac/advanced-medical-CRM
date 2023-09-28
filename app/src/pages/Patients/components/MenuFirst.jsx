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

	return (<>
		{title && (<div className={menuClass.title}>{title}</div>)}

		<div className={menuClass.container}>
			<ul className={menuClass.ul}>
				{menu.map(({toId, label}) => (<li key={toId}>
					<button 
						className={menuClass.nav}
						onClick={() => handleScroll(toId)}>{label}</button>
				</li>))}
			</ul>
		</div>
	</>)
}

MenuFirst.propTypes = {
	title: PropTypes.string,
	menuClass: PropTypes.shape({
		title: PropTypes.string,
		container: PropTypes.string,
		ul: PropTypes.string,
		nav: PropTypes.string,
	}),
	handleScroll: PropTypes.func
}