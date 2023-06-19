import * as React from 'react'
import type { FC } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { DropItem } from './DropItem'

export interface DataProps {
	floor_dimension_L: number,
	floor_dimension_W: number,
	energy: number,
	cost: number,
	release_date: number 
}
export interface DropProps {
	name: string,
}
export const DropTarget: FC = () => {
	const [names,setNames] = React.useState<string[]>([])
	const [data,setData] =  React.useState<DataProps[]>([])
	const handleDrop = (item: any) => {setNames(names => [...names, item.name]);
		setData(data => [...data, item.data]);
	}
	console.log(data)
	const [{canDrop, isOver},drop ] = useDrop(() => ({
		accept: ItemTypes.data,
		drop: (item) => { 
			handleDrop(item);
			return {name: 'Battery Site'};
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		})
	}))
	const isActive = canDrop && isOver
	let backgroundColor = "transparent"
	isActive ? backgroundColor = "green" : backgroundColor = "transparent"	
	
	return(
		<div ref={drop} style = {{backgroundColor}} className='h-1/2 w-full border-2 border-black'>
			{names.map((item,idx) => <DropItem key={idx} name={item} data={data[idx]}/>)}
		</div>
	)
}
