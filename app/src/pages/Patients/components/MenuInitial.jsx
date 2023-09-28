import PropTypes from 'prop-types'

const menu = [
	{ toId: 'criteriosInclusionExclusion', label: 'Criterios de inclusión y exclusión' },
	{ toId: 'datosSociodemograficos', label: 'Datos sociodemográficos' },
	{ toId: 'fechaNacimiento', label: 'Fecha de nacimiento' },
	{ toId: 'antecedentesMedicos', label: 'Antecedentes médicos' },
	
	{ toId: 'fechaValoracion', label: 'Fecha de valoración' },
	{ toId: 'antropometria', label: 'Antropometría' },
	{ toId: 'cribadoNutricional', label: 'Cribado nutricional' },
	{ toId: 'resultadoCribadoNutricional', label: 'Resultado del cribado nutricional' },
	{ toId: 'cribadoMuscular', label: 'Cribado muscular' },
	{ toId: 'resultadoCribadoMuscular', label: 'Resultado del cribado muscular' },
	{ toId: 'diagnosticoNutricionalUtilizado', label: 'Diagnóstico nutricional utilizado' },
	{ toId: 'resultadoDeLaValoracionNutricional', label: 'Resultado de la valoración nutricional' },
	{ toId: 'parametrosFuncionales', label: 'Parámetros funcionales' },
	{ toId: 'otrasMedidasDeComposicionCorporal', label: 'Otras medidas de composición corporal' },
	{ toId: 'resultadoDeLaValoracionMuscular', label: 'Resultado de la valoración muscular' },
	{ toId: 'objetivosPlanteados', label: 'Objetivo/s planteado/s' },
	{ toId: 'iniciaTratamientoNutricional', label: 'Inicia tratamiento nutricional' },
	{ toId: 'tipoDeTratamientoNutricionalIndicado', label: 'Tipo de tratamiento nutricionalindicado' },
	{ toId: 'refiereAlServicioDeEndocrinologiaParaIniciarTratamiento', label: 'Refiere al Servicio de Endocrinología y Nutrición para iniciar el tratamiento nutricional' },
	{ toId: 'haPrescritoActividadFisica', label: '¿Ha prescrito actividad física?' },
	{ toId: 'queTipoDeEjerciciosHaRecomendado', label: '¿Qué tipo de ejercicios ha recomendado?' },
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
				{menu.map(({toId, label}) => (<li key={toId}>
					<button 
						className={menuClass.nav}
						onClick={() => handleScroll(toId)}>{label}</button>
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