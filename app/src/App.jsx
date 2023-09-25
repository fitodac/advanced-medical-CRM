// import { useState } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from './components/Footer'


function App() {

	const navigation = useNavigation()

  return (
		<div className="grid grid-cols-12">
			<div 
				className="bg-slate-100 w-screen min-h-screen -left-full fixed 
										sm:w-auto sm:relative sm:left-auto sm:col-span-3 
										lg:col-span-2">
				<Navbar />
			</div>

			<section 
				className="col-span-12 w-full min-h-screen overflow-hidden 
									sm:col-span-9 lg:col-span-10">

				<section 
					className={
						navigation.state === "loading" ? "loading max-w-full" : "max-w-full"
					}>
					<div className="grid max-w-full">
						<Header />
						
						<div className="row-span-2 px-6 py-5 overflow-x-auto">
							<Outlet />
						</div>

						<Footer />
					</div>
				</section>

			</section>

		</div>
  )
}

export default App
