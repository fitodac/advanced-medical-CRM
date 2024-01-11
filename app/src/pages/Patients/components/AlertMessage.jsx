import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const toDecimal = val => parseFloat(String(val).replaceAll(',', '.')) 

const message = (name, val) => {
	switch(name){
		case 'current_body_weight': 
		case 'ans__anthropometry__current_weight': 
			return val < 30 || val > 150 ? 'Por favor confirme el valor' : null
		case 'height':
			return val < 1.3 || val > 2 ? 'Por favor confirme el valor' : null
		case 'BMI':
		case 'ans__anthropometry__current_bmi':
			return val < 15 || val > 35 ? 'Por favor confirme el valor' : null
		case 'calf_circumference':
		case 'ans__anthropometry__calf_circumference':
			return val < 20 || val > 50 ? 'Por favor confirme el valor' : null
		case 'bi__hydratation':
			return val < 50 || val > 80 ? 'Por favor confirme el valor' : null
		case 'bi__ffm':
			return val < 20 || val > 70 ? 'Por favor confirme el valor' : null
		case 'bi__fm':
			return val < 10 || val > 35 ? 'Por favor confirme el valor' : null
		case 'bi__bcm':
			return val < 10 || val > 40 ? 'Por favor confirme el valor' : null
		case 'bi__phase_angle':
			return val < 3 || val > 25 ? 'Por favor confirme el valor' : null
		case 'au__total_adipose_tissue':
			return val > 12 ? 'Por favor confirme el valor' : null
		case 'au__superficial':
		case 'au__preperitoneal':
			return val > 12 ? 'Por favor confirme el valor' : null
		case 'mu__area':
			return val < 5 ? 'Por favor confirme el valor' : null
		case 'mu__circumference':
			return val > 25 ? 'Por favor confirme el valor' : null
		case 'mu__axes_xax':
		case 'mu__axes_yax':
		case 'mu__adipose_tissue':
			return val > 12 ? 'Por favor confirme el valor' : null
		case 'hfnr__percentage_of_adherece_to_recommendations':
			console.log('val', val)
			return 'error...'
		default: return null
	}
}

export const AlertMessage = ({
	children,
	context,
	name
}) => {

	const formContext = useContext(context)
	const [ alert, setAlert ] = useState(null)


	useEffect(()=>{
		const x = message(name, toDecimal(formContext.formState[name]))
		x ? setAlert(x) : setAlert(null)
	},[name, formContext])
	// eslint-disable-next-line react-hooks/exhaustive-deps


	return (
		<>
			<div className={alert && 'bg-pink-50 bg-opacity-30 border-l-8 border-pink-400 px-3 py-2 transition-all rounded-r-lg'}>

				{children}

				{alert && (
					<div className="text-pink-500 text-sm leading-tight mt-1">{alert}</div>
				)}
			</div> 
		</>
	)
}


AlertMessage.propTypes = {
	children: PropTypes.node.isRequired,
	context: PropTypes.object,
	name: PropTypes.string
}