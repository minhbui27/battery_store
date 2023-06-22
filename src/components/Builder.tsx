import * as React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DropTarget } from './builder_components/DropTarget'
import { DropItem } from './builder_components/DropItem'
import '../styles/Builder.scss'
import devices from './builder_components/devices.json'

export const devices_map = Object.entries(devices).map(([name, data]) => {
	return { name, data }
})
export default function Builder(): JSX.Element {
  // getting the map of the json object
  return (
    <div className='h-screen w-full'>
      <div className='flex flex-row header-text text-5xl py-6 w-full justify-center items-center'>
        Layout Generator
      </div>
			{/* <DndProvider backend={TouchBackend} options={{enableMouseEvents: true}}> */}
      <DndProvider backend={HTML5Backend}>
				<div className='flex flex-row justify-center h-3/5'>
					<DropTarget/>
				</div>
				<div className='header-text text-xl p-2 flex flex-row justify-center items-center'>Drag one of the items below into the window above to begin!</div>
        {/* mapping each device in the json object into a separate drop item */}
				<div className='flex flex-row justify-center space-x-4 lg:px-2 md:px-32'>
        {devices_map.map((item) => (
          <DropItem key={item.name} name={item.name} data={item.data} />
        ))}
				</div>
      </DndProvider>
    </div>
  )
}
