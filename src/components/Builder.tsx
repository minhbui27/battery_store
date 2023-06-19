import * as React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DropTarget } from './builder_components/DropTarget'
import { DropItem } from './builder_components/DropItem'
import '../styles/Builder.scss'
import devices from './builder_components/devices.json'

export default function Builder(): JSX.Element {
	// getting the map of the json object
	const devices_map = Object.entries(devices).map(([type,data]) => {
		return {type, data}
	})
  return (
    <div className='h-screen w-full bg-red-200'>
      <DndProvider backend={HTML5Backend}>
        <DropTarget />
				{/* mapping each device in the json object into a separate drop item */}
				{ devices_map.map(item => <DropItem key={item.type} name={item.type} data={item.data}/>)}
      </DndProvider>
    </div>
  )
}
