import { useContext } from 'react'
import { PropTypes } from 'prop-types'
import { FilterContext } from './context/FilterContext'

export default function FilterContainer({children}){

	const context = useContext(FilterContext)


	return (
		<div className="mb-3 relative">

			<div className="flex items-center">
				<button className="btn btn-icon bg-transparent border-transparent text-teal">
					<i className="ri-equalizer-fill"></i>
				</button>
				<small className="text-teal">Filtrar</small>
			</div>

			<div className="bg-white p-5 inset-x-0 absolute shadow-lg z-20">
				{children}
			</div>

		</div>
	)
}


FilterContainer.propTypes = {
	children: PropTypes.node
}