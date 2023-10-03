import { useState } from 'react'
import { PropTypes } from 'prop-types'
import { FilterContext } from '.'
import { useForm } from '../../../hooks'

export const FilterProvider = ({children}) => {

	const [ visibleForm, setVisibleForm ] = useState(false)

	const {
		formState, 
		// setFormState, 
		onInputChange, 
		// onResetForm
	} = useForm({})

	

	const handleInputChange = e => onInputChange(e)

	const contextValue = {formState, handleInputChange}

	return (
		<FilterContext.Provider value={contextValue}>
			<div className="mb-3 relative">

				<div className="flex items-center md:hidden">
					<button 
						className="btn bg-transparent border-transparent text-teal p-1"
						onClick={() => setVisibleForm(!visibleForm)}>
						<i className="ri-equalizer-fill"></i>
						<small className="text-teal text-base ml-2">Filtrar</small>
					</button>
				</div>

				<div 
					className={`bg-white p-5 inset-x-0 absolute shadow-lg z-20 
											${visibleForm ? '' : 'hidden'}
											md:p-0 md:relative md:shadow-none md:flex md:justify-end`}>
					<div className="flex items-end gap-x-4">

						<span className="text-teal text-xl pb-1.5 hidden md:inline-block">
							<i className="ri-equalizer-fill"></i>
						</span>

						{children}

					</div>
				</div>

			</div>
		</FilterContext.Provider>
	)
}


FilterProvider.propTypes = {
	children: PropTypes.node
}