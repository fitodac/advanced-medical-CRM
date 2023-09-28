import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
const navClass = 'border-slate-100 border-l-2 text-sm text-left leading-none inline-block px-3 select-none transition-all hover:text-primary hover:border-primary'

const handleScroll = id => {
	const el = document.getElementById(id)
	el.scrollIntoView({ behavior: 'smooth' })
}


export const Navbar = ({setFormType}) => {

	const [ visit, setVisit ] = useState('first')

	useEffect(() => {
		setFormType(visit)
	}, [visit])

	return (<div className="hidden relative lg:block">
		<div className="tabs">
			<input type="radio" name="tabsNav" id="first" onChange={() => setVisit('first')} checked={visit === 'first'} />
			<input type="radio" name="tabsNav" id="initial" onChange={() => setVisit('initial')} checked={visit === 'initial'} />

			<div className="tabs-nav">
				<label htmlFor="first" className="tab-item" data-tab="first">Visita inicial</label>
				<label htmlFor="initial" className="tab-item" data-tab="initial">Seguimiento 1</label>
			</div>

			<div className="tabs-content">
				
				<div className="tab-body">
					<div className="text-slate-400 text-sm font-semibold">Visita inicial</div>

					<ul className="text-slate-500 space-y-4 pt-6 -ml-4">
						<li className="">
							<button onClick={() => handleScroll('criteriosInclusionExclusion')} className={navClass}>Criterios de inclusión y exclusión</button>
						</li>
						<li className="">
							<button onClick={() => handleScroll('datosSociodemograficos')} className={navClass}>Datos sociodemográficos</button>
						</li>
					</ul>
				</div>
				
				
				<div className="tab-body">
					<div className="text-slate-400 text-sm font-semibold">Primer seguimiento</div>
				</div>

			</div>
		</div>
	</div>)
}


Navbar.prototype = {
	setFormType: PropTypes.func
}