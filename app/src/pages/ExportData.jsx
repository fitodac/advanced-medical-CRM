import { PageHeader } from '../components'

export default function Page(){
	return (<>
		<PageHeader 
			title="Exportar datos"
			breadcrumbs={[
				{title: 'Exportar datos', current: true}
			]} />

		<div className="h-96 grid place-content-center">
			<div className="text-slate-200 text-3xl leading-none">En construcción...</div>
		</div>
	</>)
}