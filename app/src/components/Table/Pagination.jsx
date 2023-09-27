import PropTypes from 'prop-types'
// import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'


const btnClassName = (idx) => {
	switch(idx){
		case 'arrow-left': return `ri-arrow-left-s-line relative transition-all group-hover:-ml-2`
		case 'arrow-right': return `ri-arrow-right-s-line relative transition-all group-hover:ml-2`
		default: return `w-10 h-10 grid place-content-center select-none rounded transition-all hover:bg-primary hover:text-white `
	}
}



export const Pagination = ({links}) => {

	// useEffect(() => {
	// 	console.log('links')
	// }, [])


	return (<div className="pt-3">
		<div className="flex gap-x-1 overflow-x-hidden justify-end">

			{ links.map((e,i) => (<NavLink key={e.label} className={btnClassName(i) + `${!i ?? ' group'} ${i === links.length - 1 ?? ' group'}`}>
				{ !i && (<i className={btnClassName('arrow-left')} />) }
				{ i === (links.length -1) && (<i className={btnClassName('arrow-right')} />) }
				{ (i >= 1 && i < links.length -1) && e.label }
			</NavLink>))}

		</div>
	</div>)
}


Pagination.propTypes = {
	links: PropTypes.array.isRequired
}