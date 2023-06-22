import * as React from 'react'
import '../styles/Info.scss'

export default function Info(): JSX.Element {
	return(
		<div className='pt-16'>
			<div style={{fontFamily:'Poppins'}} className='text-5xl p-2 md:pt-4 flex flex-row justify-center items-center'> Our Options </div>	
		<div className='justify-center flex flex-col px-8 md:flex-row h-[40rem] w-full'>
				<div className='space-x-2 md:space-x-0 my-4 mx-0 md:mx-4 flex flex-row md:flex-col h-96 md:h-full w-full md:w-96'>
					<div className='flex flex-col rounded-xl my-2 w-1/2 md:w-full h-full md:h-1/2 bg-blue-300'>
						<h1 className='text-center mx-2 my-2 text-md md:text-2xl'>Megapack 2XL</h1>
						<div className='mx-8 text-sm md:text-xl md:px-8 justify-start'>
							<p>Length x Width: 40ft x 10ft</p>
							<p>Energy Production: 4MWh</p>
							<p>Cost: $120,000</p>
							<p>Released: 2022</p>
						</div>
					</div>
					<div className='flex flex-col rounded-xl my-2 w-1/2 md:w-full h-full md:h-1/2 bg-blue-300'>
						<h1 className='text-center mx-2 my-2 text-md md:text-2xl'>Megapack 2</h1>
						<div className='mx-8 text-sm md:text-xl md:px-8 justify-start'>
							<p>Length x Width: 30ft x 10ft</p>
							<p>Energy Production: 3MWh</p>
							<p>Cost: $80,000</p>
							<p>Released: 2021</p>
						</div>
					</div>
				</div>
				<div className='space-x-2 md:space-x-0 my-4 mx-0 md:mx-4 flex flex-row md:flex-col h-96 md:h-full w-full md:w-96'>
					<div className='flex flex-col rounded-xl my-2 w-1/2 md:w-full h-full md:h-1/2 bg-blue-300'>
						<h1 className='text-center mx-2 my-2 text-md md:text-2xl'>Megapack</h1>
						<div className='mx-8 text-sm md:text-xl md:px-8 justify-start'>
							<p>Length x Width: 30ft x 10ft</p>
							<p>Energy Production: 2MWh</p>
							<p>Cost: $30,000</p>
							<p>Released: 2005</p>
						</div>
					</div>
					<div className='flex flex-col rounded-xl my-2 w-1/2 md:w-full h-full md:h-1/2 bg-blue-300'>
						<h1 className='text-center mx-2 my-2 text-md md:text-2xl'>Powerpack</h1>
						<div className='mx-8 text-sm md:text-xl md:px-8 justify-start'>
							<p>Length x Width: 10ft x 10ft</p>
							<p>Energy Production: 1MWh</p>
							<p>Cost: $20,000</p>
							<p>Released: 2000</p>
						</div>
					</div>
				</div>
				<div className='space-x-2 md:space-x-0 my-4 mx-0 md:mx-4 flex justify-center flex-row md:flex-col h-96 md:h-full w-full md:w-96'>
					<div className='flex flex-col rounded-xl my-2 w-1/2 md:w-full h-full md:h-1/2 bg-blue-300'>
						<h1 className='text-center mx-2 my-2 text-md md:text-2xl'>Transformer</h1>
						<div className='mx-8 text-sm md:text-xl md:px-8 justify-start'>
							<p>Length x Width: 10ft x 10ft</p>
							<p>Energy Consumption: 0.25MWh</p>
							<p>Cost: $10,000</p>
						</div>
					</div>
				</div>
		</div>
		</div>
	)
}
