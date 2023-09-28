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

export const MenuInitial = ({
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

		{/* <ul className="">
			<li className="">
				<button onClick={() => handleScroll('criteriosInclusionExclusion')} className={navClass}>Criterios de inclusión y exclusión</button>
			</li>
			<li className="">
				<button onClick={() => handleScroll('datosSociodemograficos')} className={navClass}>Datos sociodemográficos</button>
			</li>
		</ul> */}
	</>)
}


MenuInitial.propTypes = {
	title: PropTypes.string,
	menuClass: PropTypes.object,
	handleScroll: PropTypes.func
}