import * as React from 'react'
import type { FC } from 'react'	
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

export interface DataProps {
	floor_dimension_L: number,
	floor_dimension_W: number,
	energy: number,
	cost: number,
	release_date: number 
}

export interface ItemProps {
	name: string
	data: DataProps
}

interface DropResult {
	name: string
}

export const DropItem: FC<ItemProps> = function DropItem({name,data}) {
	// The useDrag hook from react-dnd connects with the DropTarget through the HTML5Backend to determine the DropResult, in this case the name "Battery Site"
	const [{isDragging}, drag] = useDrag(() => ({
		// box type is draggable element
		type: ItemTypes.data,
		item: {name: name, data: data},
		// after the item is dragged into a valid target, then if there is a dropResult, ...
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult<DropResult>();
			// do something
			if (item && dropResult) {
				alert(`You dropped ${item.name} into ${dropResult.name}`)
			}
		},
		// collect returns the isDragging elment and the handlerId of each object
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		})
	}))
	return(
		<div ref={drag} className='w-16 h-16 border-2 border-blue-200'>
		</div>
	)
}
