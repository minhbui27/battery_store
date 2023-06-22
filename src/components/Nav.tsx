import * as React from 'react';
import '../styles/Nav.scss'

export default function Nav(): JSX.Element {
	return(
		<nav className='navbar flex flex-col justify-center bg-rose-600 top-0 w-full h-16 sticky'>
			<div className='bigtext text-white flex flex-col justify-center ml-4 text-2xl'>Battery Store</div>
		</nav>
	)
}
