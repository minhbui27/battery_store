import * as React from 'react'
import type { FC } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import '../../styles/Builder.scss'

export interface DataProps {
  floor_dimension_L: number
  floor_dimension_W: number
  energy: number
  cost: number
  release_date: number
}
export interface DropProps {
  name: string
}

export const DropTarget: FC = () => {
  const transformer_info = {
    floor_dimension_L: 10,
    floor_dimension_W: 10,
    energy: -0.25,
    cost: 10000,
    release_date: 0,
  }
  const scale = 5
  // Assign a random color for each item in order to show in the legend. Must have # colors = # devices
  const colorList: string[] = [
    '#F05365',
    '#FABC2A',
    '#F2EDEB',
    '#BD93BD',
    '#925E78',
  ]

  // declaring state variables
  // names are the names of objects, data are the information corresponding to each name
  const [names, setNames] = React.useState<string[]>([])
  const [data, setData] = React.useState<DataProps[]>([])
  const [totalEnergy, setTotalEnergy] = React.useState<number>(0)
  const [totalCost, setTotalCost] = React.useState<number>(0)

  // mapping each unique Name to a different background color
  const uniqueNames: string[] = [...new Set(names)]
  const colorDictionary: { [key: string]: string } = uniqueNames.reduce(
    (acc, curr, index) => {
      acc[curr] = colorList[index]
      return acc
      // initial value is an empty object index by a string, mapped to a color hex string
    },
    {} as { [key: string]: string }
  )

  // function to handle the action of dropping the item into the "window"
  const handleDrop = (item: any) => {
    setNames((names) => [...names, item.name])
    setData((data) => [...data, item.data])
  }

  // react-dnd hook that adds the item into the window via handleDrop
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.data,
    drop: (item) => {
      handleDrop(item)
      return { name: 'Battery Site' }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  // function to remove item from list via index
  const handleRemove = (index: number) => {
    const tempNames = [...names]
    const tempData = [...data]
    tempData.splice(index, 1)
    tempNames.splice(index, 1)
    setNames(tempNames)
    setData(tempData)
  }

  // When the item is hovering over, turn green, otherwise remain transparent
  const isActive = canDrop && isOver
  let backgroundColor = 'rgb(254 202 202)'
  isActive ? (backgroundColor = 'green') : (backgroundColor = 'rgb(254 202 202)')

  React.useEffect(() => {
    let notTransformer = names.reduce((acc, curr) => {
      if (curr !== 'Transformer') acc++
      return acc
    }, 0)
    // logic to handle adding a Transformer every 4 devices automatically
    if (
      notTransformer % 4 === 0 &&
      notTransformer / 4 !== names.length - notTransformer
    ) {
      handleDrop({ name: 'Transformer', data: transformer_info })
    }
    const totalEnergy = data.reduce((acc, curr) => acc + curr.energy, 0)
    const totalCost = data.reduce((acc, curr) => acc + curr.cost, 0)
    setTotalCost(totalCost)
    setTotalEnergy(totalEnergy)
  }, [names])


  return (
    <div
      ref={drop}
      style={{ backgroundColor }}
      className='flex flex-row h-1/2 w-full'
    >
      <div className='flex-grow'>
        {names.map((item, idx) => {
          return (
            <div
              style={{
                width: scale * data[idx].floor_dimension_L,
                height: scale * data[idx].floor_dimension_W,
                backgroundColor: colorDictionary[item],
              }}
              className='flex justify-center items-center border-2 border-blue-200'
              key={idx}
            >
              <button onClick={() => handleRemove(idx)}>🗑</button>
            </div>
          )
        })}
      </div>
      {/* The legend the the items below it */}
      <div className='flex flex-col justify-start w-1/5 overflow-y-auto h-80 bg-transparent'>
        {names.length > 0 ? (
          <>
            <div className='z-10 bg-red-50 text-legend py-2 text-xl flex flex-row justify-center h-8'>
              Legend
            </div>
            <div className='bg-red-50 h-40'>
              {[...new Set(names)].map((item, idx) => {
                return (
                  <div key={idx} className='flex justify-center items-center'>
                    <div
                      className='h-4 w-4'
                      style={{ backgroundColor: colorDictionary[item] }}
                    ></div>
                    <div>{` ${item}`}</div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <></>
        )}
				{/* Only display the cost if currently greater than zero */}
        {totalCost > 0 ? (
          <>
            <div className='total-cost items-center justify-center flex flex-col bg-blue-500 h-16 w-full'>{`Total Cost: ${totalCost}`}</div>
          </>
        ) : (
          <></>
        )}
				{/* Only display the energy if currently greater than zero */}
        {totalEnergy > 0 ? (
          <>
            <div className='total-energy items-center justify-center flex flex-col bg-green-500 h-16 w-full'>{`Total Energy: ${totalEnergy}`}</div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
