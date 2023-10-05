import PropTypes from 'prop-types'

const menu = [
	{ toId: 'C3D4E5', label: 'Situación actual del paciente' },
	{ toId: 'U3V4W5', label: 'Antropometría' },
	{ toId: 'K5L6M7', label: 'Parámetros funcionales' },
	{ toId: 'B6C7D8', label: 'Otras medidas de composición corporal' },
	{ toId: 'H2I3J4', label: '¿El paciente ha seguido la recomendación nutricional prescrita?' },
	{ toId: 'S7T8U9', label: '¿Ha conseguido el paciente el objetivo nutricional planteado en la visita basal?' },
	{ toId: 'X6Y7Z8', label: '¿Tras la entravista con el paciente, considera usted que el paciente percibe algún tipo de mejoría asociado al tratamiento nutricional indicado?' },
	{ toId: 'E9F0G1', label: '¿El paciente ha seguido la recomendación de actividad físiaca prescrita?' },
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