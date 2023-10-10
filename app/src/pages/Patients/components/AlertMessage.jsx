import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const toDecimal = val => parseFloat(String(val).replaceAll(',', '.')) 

const message = (name, val) => {
	switch(name){
		case 'current_body_weight': 
		case 'ans__anthropometry__current_weight': 
			return val < 30 || val > 150 ? 'Los valores no pueden ser inferior a 30kg o superior a 150kg.' : null
		case 'height':
			return val < 1.3 || val > 2 ? 'Los valores no pueden ser inferior a 1,3m o superior a 2m.' : null
		case 'BMI':
		case 'ans__anthropometry__current_bmi':
			return val < 15 || val > 35 ? 'Los valores no pueden ser inferiores a 15kg/m o superiores a 35kg/m. Por favor, revisa peso y altura.' : null
		case 'calf_circumference':
		case 'ans__anthropometry__calf_circumference':
			return val < 20 || val > 50 ? 'Los valores no pueden ser inferiores a 20cm o superiores a 50cm.' : null
		case 'bi__hydratation':
			return val < 50 || val > 80 ? 'Los valores no pueden ser inferiores a 50% o superiores a 80%.' : null
		case 'bi__ffm':
			return val < 20 || val > 70 ? 'Los valores no pueden ser inferiores a 20kg o superiores a 70kg.' : null
		case 'bi__fm':
			return val < 10 || val > 35 ? 'Los valores no pueden ser inferiores a 10kg o superiores a 35kg.' : null
		case 'bi__bcm':
			return val < 10 || val > 40 ? 'Los valores no pueden ser inferiores a 10kg o superiores a 40kg.' : null
		case 'bi__phase_angle':
			return val < 3 || val > 25 ? 'Los valores no pueden ser inferiores a 3deg o superiores a 25deg.' : null
		case 'au__total_adipose_tissue':
			return val > 12 ? 'El valor no pueden ser superior a 12cm.' : null
		case 'au__superficial':
		case 'au__preperitoneal':
			return val > 12 ? 'El valor no pueden ser superior a 12cm.' : null
		case 'mu__area':
			return val < 5 ? 'El valor no pueden ser inferior a 5cm².' : null
		case 'mu__circumference':
			return val > 25 ? 'El valor no pueden ser superior a 25cm.' : null
		case 'mu__axes_xax':
		case 'mu__axes_yax':
		case 'mu__adipose_tissue':
			return val > 12 ? 'El valor no pueden ser superior a 12cm.' : null
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