import * as React from 'react'
import '../styles/Info.scss'

export default function Info(): JSX.Element {
	return(
		<div className='pt-16'>
			<div style={{fontFamily:'Poppins'}} className='text-4xl p-2 flex flex-row justify-center items-center'> Explore our options below </div>	
		<div className='flex flex-col md:flex-row h-screen bg-blue-200 w-full'>
			<div className='flex flex-col border-2 border-black h-1/4 md:h-full md:w-1/4'></div>
			<div className='flex flex-col border-2 border-black h-1/4 md:h-full md:w-1/4'></div>
			<div className='flex flex-col border-2 border-black h-1/4 md:h-full md:w-1/4'></div>
			<div className='flex flex-col border-2 border-black h-1/4 md:h-full md:w-1/4'></div>
		</div>
		</div>
	)
}
