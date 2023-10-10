import PropTypes from 'prop-types'

const menu = [
	{ toId: 'G5H6I7', label: 'Criterios de inclusión y exclusión' },
	{ toId: 'M1N2O3', label: 'Datos sociodemográficos' },
	{ toId: 'O5P6Q7', label: 'Antecedentes médicos' },
	{ toId: 'P4Q5R6', label: 'Fecha de valoración' },
	{ toId: 'L2M3N4', label: 'Antropometría' },
	{ toId: 'D2E3F4', label: 'Cribado nutricional' },
	{ toId: 'T4U5V6', label: 'Resultado del cribado nutricional' },
	{ toId: 'A9B0C1', label: 'Cribado muscular' },
	{ toId: 'Q1R2S3', label: 'Resultado del cribado muscular' },
	{ toId: 'J8K9L0', label: 'Diagnóstico nutricional utilizado' },
	{ toId: 'Z0A1B2', label: 'Resultado de la valoración nutricional' },
	{ toId: 'K5L6M7', label: 'Parámetros funcionales' },
	{ toId: 'B6C7D8', label: 'Otras medidas de composición corporal' },
	{ toId: 'W7X8Y9', label: 'Resultado de la valoración muscular' },
	{ toId: 'Y3Z4A5', label: 'Objetivo/s planteado/s' },
	{ toId: 'V0W1X2', label: 'Inicia tratamiento nutricional' },
	{ toId: 'I9J0K1', label: 'Tipo de tratamiento nutricionalindicado' },
	{ toId: 'N8O9P0', label: 'Refiere al Servicio de Endocrinología y Nutrición para iniciar el tratamiento nutricional' },
	{ toId: 'R8S9T0', label: '¿Ha prescrito actividad física?' },
	{ toId: 'F6G7H8', label: '¿Qué tipo de ejercicios ha recomendado?' },
]


export const MenuInitial = ({
	title,
	menuClass,
	handleScroll
}) => {

	return (<>
		{title && (<div className={menuClass.title}>{title}</div>)}

		<div className={menuClass.container}>
			<ul className={menuClass.ul}>
				{menu.map(({toId, label}, i) => (<li key={toId}>
					<button 
						className={menuClass.nav}
						onClick={() => handleScroll(toId)}>
							<span className="text-teal-400">{i}</span>
							<span className="">{label}</span>
						</button>
				</li>))}
			</ul>
		</div>
	</>)
}


MenuInitial.propTypes = {
	title: PropTypes.string,
	menuClass: PropTypes.shape({
		title: PropTypes.string,
		container: PropTypes.string,
		ul: PropTypes.string,
		nav: PropTypes.string,
	}),
	handleScroll: PropTypes.func
}