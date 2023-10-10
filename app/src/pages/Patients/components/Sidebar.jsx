import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { MenuInitial, MenuFirst } from '.'

const menuClass = {
	title: 'text-slate-600 text-xs font-semibold px-3 pt-5',
	container: 'max-h-[68vh] scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-100 pb-20',
	ul: 'text-slate-500 pt-4',
	nav: 'border-slate-100 border-l-2 text-sm text-left leading-none inline-block px-3 py-2 flex gap-x-1.5 select-none transition-all hover:text-teal-400 hover:border-primary'
}

const handleScroll = id => {
	const el = document.getElementById(id)
	el && el.scrollIntoView({ behavior: 'smooth' })
}


export const Sidebar = ({setFormType}) => {

	const [ visit, setVisit ] = useState('initial')

	useEffect(() => {
		setFormType(visit)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visit])

	return (<div className="bg-slate-100 -ml-6 hidden relative lg:block">
		<div className="tabs">
			<input type="radio" name="tabsNav" id="initial" onChange={() => setVisit('initial')} checked={visit === 'initial'} />
			<input type="radio" name="tabsNav" id="first" onChange={() => setVisit('first')} checked={visit === 'first'} />

			<div className="tabs-nav">
				<label htmlFor="initial" className="tab-item" data-tab="first">Visita inicial</label>
				<label htmlFor="first" className="tab-item" data-tab="initial">Seguimiento 1</label>
			</div>

			<div className="tabs-content">
				
				<div className="tab-body">
					<MenuInitial 
						title="Visita inicial"
						menuClass={menuClass}
						handleScroll={handleScroll} />
				</div>
				
				
				<div className="tab-body">
					<MenuFirst 
						title="Primer seguimiento"
						menuClass={menuClass}
						handleScroll={handleScroll} />
					
				</div>

			</div>
		</div>
	</div>)
}


Sidebar.propTypes = {
	setFormType: PropTypes.func
}