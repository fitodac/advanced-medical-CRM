const CriteriosDeInclusion = () => {

	const options = [
		'Personas con antecedentes de una enfermedad crónica',
		'Edad ›18 años',
		'Accede a formar parte del estudio y firma el consentimiento informado'
	]

	const content = options.map((e,i) => (<div 
		key={`option${i}`} 
		className="flex gap-6 items-start">
		<label className="input-checkbox">
			<input type="checkbox" />
			<span>Sí</span>
		</label>
		
		<label className="input-checkbox">
			<input type="checkbox" />
			<span>No</span>
		</label>

		<div>{e}</div>
	</div>))


	return (<>{ content }</>)
}

export {
	CriteriosDeInclusion
}