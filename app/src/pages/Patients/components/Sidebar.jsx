import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { MenuInitial, MenuFirst } from '.'

const menuClass = {
	title: 'text-slate-400 text-sm font-semibold',
	ul: 'text-slate-500 space-y-4 pt-6 -ml-4',
	nav: 'border-slate-100 border-l-2 text-sm text-left leading-none inline-block px-3 select-none transition-all hover:text-primary hover:border-primary'
}

const handleScroll = id => {
	const el = document.getElementById(id)
	el.scrollIntoView({ behavior: 'smooth' })
}


export const Sidebar = ({setFormType}) => {

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
					<MenuInitial 
						title="Visita inicial"
						menuClass={menuClass} />
				</div>
				
				
				<div className="tab-body">
					<MenuFirst 
						title="Primer seguimiento"
						menuClass={menuClass} />
					
				</div>

			</div>
		</div>
	</div>)
}


Sidebar.prototype = {
	setFormType: PropTypes.func
}