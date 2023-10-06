import { PageHeader } from '../components'

export default function Page(){
	return (<>
		<PageHeader 
			title="Exportar datos"
			breadcrumbs={[
				{title: 'Exportar datos', current: true}
			]} />

		<div className="py-10 items-center max-w-4xl">
			<div className="bg-white border border-slate-100 p-6 rounded-xl shadow-lg">
				<a href="/" target="_blank" className="btn btn-lg bg-green-600 border-green-600 text-white space-x-2">
					<span className="text-3xl">
						<i className="ri-file-excel-2-line"></i>
					</span>
					<span>Descargar XLS</span>
				</a>
			</div>
		</div>
	</>)
}