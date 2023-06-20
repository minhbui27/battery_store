import * as React from 'react'
import '../styles/Info.scss'

export default function Info(): JSX.Element {
	return(
		<div className='pt-16'>
			<div style={{fontFamily:'Poppins'}} className='text-5xl p-2 flex flex-row justify-center items-center'> Explore our options </div>	
		<div className='flex flex-col px-8 md:flex-row h-96 w-full'>
			<div className='rounded-xl flex flex-col m-2 h-1/4 md:h-full md:w-1/4 bg-blue-200'>
					<div className='flex text-2xl justify-center py-2 flex-row'>Megapack 2XL</div>
			</div>
			<div className='rounded-xl flex flex-col m-2 h-1/4 md:h-full md:w-1/4 bg-blue-200'>
					<div className='flex text-2xl justify-center py-2 flex-row'>Megapack 2XL</div>
			</div>
			<div className='rounded-xl flex flex-col m-2 h-1/4 md:h-full md:w-1/4 bg-blue-200'>
					<div className='flex text-2xl justify-center py-2 flex-row'>Megapack 2XL</div>
			</div>
			<div className='rounded-xl flex flex-col m-2 h-1/4 md:h-full md:w-1/4 bg-blue-200'>
					<div className='flex text-2xl justify-center py-2 flex-row'>Megapack 2XL</div>
			</div>
		</div>
		</div>
	)
}
