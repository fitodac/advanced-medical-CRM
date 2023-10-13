import PropTypes from 'prop-types'
import { InputMask } from '../../../components/Ui'
import { 
	HeaderFieldGroup,
	AlertMessage 
} from '.'

import fields from '../formfields/otrasMedicionesDeComposicionCorporal'

const id = 'B6C7D8'

export const OtrasMedicionesDeComposicionCorporal = ({context}) => {
	return (<>
		<section className="space-y-3" id={id}>
			<HeaderFieldGroup title="Otras medidas de composición corporal" />

			<section className="space-y-8">
				<div className="">
					<label className="input-checkbox">
						<span className="text-slate-600 text-base font-medium">{fields.bioimpedanciaElectrica.label}</span>
					</label>


					<div className="space-y-3">
						{fields.bioimpedanciaElectrica.options.map(({key, name, label, append}) => (
						<AlertMessage key={key} name={name} context={context}>
							<div className="grid grid-cols-12 gap-x-4">
								<div className="col-span-4 flex items-center">
									<label className="text-sm leading-none font-normal w-full block select-none" dangerouslySetInnerHTML={label}/>
								</div>
								
								<div className="col-span-2 lg:col-span-2">
									<InputMask name={name} context={context} />
								</div>
								
								<div className="col-span-3 flex items-center">
									<label className="leading-none w-full block select-none">{append}</label>
								</div>

							</div>
						</AlertMessage>
						))}


						<div className="text-slate-500 text-sm leading-tight pt-4 space-y-2">
							<p>† Masa celular (kg) dividido por altura (BCM/h) en metros, cuyo valor normal es entre 14-21 en varones y entre 10-17 en mujeres.</p>
							<p>* Desviación del ángulo de fase con respecto a su grupo etario. Parámetro estadístico que expresa la relación entre el ángulo de fase menos el ángulo de fase medio y su desviación estándar. Este parámetro es útil para comprender si el valor del ángulo de fase relacionado con la edad de la persona es superior o inferior al de referencia.</p>
						</div>
					</div>

				</div>


				<div className="">
					<label className="input-checkbox">
						<span className="text-slate-600 text-base font-medium">{fields.dexa.label}</span>
					</label>

					<div className="space-y-3">
						{fields.dexa.options.map(({key, name, label, append}) => (
						<AlertMessage key={key} name={name} context={context}>
							<div className="grid grid-cols-12 gap-x-4">
								<div className="col-span-4 flex items-center">
									<label className="text-sm leading-none font-normal w-full block select-none">{label}</label>
								</div>
								
								<div className="col-span-2 lg:col-span-2">
									<InputMask name={name} context={context} />
								</div>
								
								<div className="col-span-3 flex items-center">
									<label className="leading-none w-full block select-none">{append}</label>
								</div>
							</div>

						</AlertMessage>
						))}
					</div>
				</div>


				<div className="">
					<label className="input-checkbox">
						<span className="text-slate-600 text-base font-medium">{fields.tc.label}</span>
					</label>

					<div className="space-y-3">
						{fields.tc.options.map(({key, name, label, append}) => (
						<AlertMessage key={key} name={name} context={context}>
							<div className="grid grid-cols-12 gap-x-4">
								<div className="col-span-4 flex items-center">
									<label className="text-sm leading-none font-normal w-full block select-none">{label}</label>
								</div>
								
								<div className="col-span-2 lg:col-span-2">
									<InputMask name={name} context={context} />
								</div>
								
								<div className="col-span-3 flex items-center">
									<label className="leading-none w-full block select-none">{append}</label>
								</div>
							</div>
						</AlertMessage>
						))}
					</div>
				</div>


				<div className="space-y-4">
					<label className="input-checkbox">
						<input type="checkbox" />
						<span className="text-slate-600 text-base font-medium">{fields.ecography.label}</span>
					</label>

					<div className="">
						<p>Realizar de acuerdo con el protocolo SEEN (anotar la referencia medida en cm en la 
						que se ha realizado la medición en abdomen y recto anterior. Para más información acceder 
						a García-Almeida JM, García-García C, Vegas-Aguilar IM, Ballesteros Pomar MD, Cornejo-Pareja 
						IM, Fernández Medina B, de Luis Román DA, Bellido Guerrero D, Bretón Lesmes I, Tinahones 
						Madueño FJ. Nutritional ultrasound®: Conceptualisation, technical considerations and 
						standardisation. Endocrinol Diabetes Nutr (Engl Ed). 2023 Mar;70 Suppl 1:74-84. doi: 
						10.1016/j.endien.2022.11.010. PMID: 36935167.) Acceso:</p>
						<p>
							<a 
								href="https://www.sciencedirect.com/science/article/abs/pii/S2530018022001688?via%3Dihub" 
								target="_blank" 
								rel="noreferrer"
								className="text-primary italic underline">https://www.sciencedirect.com/science/article/abs/pii/S2530018022001688?via%3Dihub</a>
						</p>
					</div>

					<div className="space-y-3">
						<div className="font-medium">Ecografía abdominal</div>

						{fields.ecography.options.abdominal.map(({key, name, label, append}) => (
						<AlertMessage key={key} name={name} context={context}>
							<div className="grid grid-cols-12 gap-x-4">
								<div className="col-span-4 flex items-center">
									<label className="text-sm leading-none font-normal w-full block select-none">{label}</label>
								</div>
								
								<div className="col-span-2 lg:col-span-2">
									<InputMask name={name} context={context} />
								</div>
								
								<div className="col-span-3 flex items-center">
									<label className="leading-none w-full block select-none">{append}</label>
								</div>
							</div>
						</AlertMessage>
						))}
					</div>
					
					
					<div className="space-y-3">
						<div className="font-medium">Ecografía muscular</div>

						{Object.keys(fields.ecography.options.muscular).map(e => (<div key={e} className="space-y-3">
							{'axies' === e && (<label className="">Ejes:</label>)}
							{fields.ecography.options.muscular[e].map(({key, name, label,append}) => (
							<AlertMessage key={key} name={name} context={context}>
								<div className={`grid grid-cols-12 gap-x-4 ${'adiposeTissue' === e && 'pt-3'}`}>
									<div className="col-span-4 flex items-center">
										<label className="text-sm leading-none font-normal w-full block select-none">{label}</label>
									</div>
									
									<div className="col-span-2 lg:col-span-2">
										<InputMask name={name} context={context} />
									</div>
									
									<div className="col-span-3 flex items-center">
										<label className="leading-none w-full block select-none">{append}</label>
									</div>
								</div>
							</AlertMessage>
							))}
						</div>))}
					</div>
				</div>
			</section>

		</section>
	</>)
}


OtrasMedicionesDeComposicionCorporal.propTypes = {
	context: PropTypes.object.isRequired
}