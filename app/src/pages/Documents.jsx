import PageHeader from '../components/PageHeader'

const boxClassName = `bg-white border boder-slate-100 px-7 py-4 space-y-1 select-none transition-all rounded-md 
											hover:bg-slate-400 hover:border-slate-400 hover:text-white`


export default function Page(){
	return (<>
		<PageHeader 
			title="Documentos"
			breadcrumbs={[
				{title: 'Documentos', current: true}
			]} />

		<section className="w-full overflow-x-hidden pt-5">
			<div className="grid grid-cols-4 gap-8">

				<a href="//google.com" target="_blank" rel="noreferrer" className={boxClassName}>
					<div className="font-bold">Protocolo</div>
					<div className="text-sm font-light leading-tight">Aquí va una descripción de lo que se trata este documento</div>
				</a>

				<a href="//google.com" target="_blank" rel="noreferrer" className={boxClassName}>
					<div className="font-bold">Formulario de registro de casos</div>
					<div className="text-sm font-light leading-tight">Aquí va una descripción de lo que se trata este documento</div>
				</a>

				<a href="//google.com" target="_blank" rel="noreferrer" className={boxClassName}>
					<div className="font-bold">Consentimiento informado</div>
					<div className="text-sm font-light leading-tight">Aquí va una descripción de lo que se trata este documento</div>
				</a>

			</div>
		</section>
	</>)
}