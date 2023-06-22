import * as React from 'react'
import type { FC } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import '../../styles/Builder.scss'
import { calcArea, maxVerticalGap, groupItems, flattenArray, countOccurrences } from './helpers'
import Slider from '@mui/material/Slider';
import { Input } from '@mui/material'
import { devices_map } from '../Builder'

export interface DataProps {
  floor_dimension_L: number
  floor_dimension_W: number
  energy: number
  cost: number
  release_date: number
}

interface arrangedDataProps {
  name: string
  data: DataProps
}

// converting devices_map into a dictionary to be used for the manual adding
// this will be immutable
const devicesDict = devices_map.reduce((acc, {name, data}) => {
	acc[name] = data;
	return acc
}, {} as {[key:string]: DataProps})

export const DropTarget: FC = () => {
  const transformer_info = {
    floor_dimension_L: 10,
    floor_dimension_W: 10,
    energy: -0.25,
    cost: 10000,
    release_date: 0,
  }
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
  const [arrangedData, setArrangedData] = React.useState<arrangedDataProps[][]>([[]])

	// These are variables that the user can change to modify the layout
	const [scale, setScale] = React.useState<number>(5)
	const [horizontalGap, setHorizontalGap] = React.useState<number>(0)
	const [verticalGap, setVerticalGap] = React.useState<number>(0)

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

  // function to remove item from list via index. Must updated the arranged data, the original names and data arrays
  const handleRemove = (i: number, j: number) => {
    if (arrangedData[i] && arrangedData[i][j]) {
      let toRemove = arrangedData[i][j]
      setArrangedData((data) => {
        let temp = [...data]
        temp[i].splice(j, 1)
        return temp
      })
			// Very important that setData must be called first because I am removing via index of the string.
      setData((data) => {
        let updatedData = [...data]
        updatedData.splice(names.indexOf(toRemove.name), 1)
        return updatedData
      })
      setNames((names) => {
        let updatedNames = [...names]
        updatedNames.splice(names.indexOf(toRemove.name), 1)
        return updatedNames
      })
    }
  }

  // When the item is hovering over, turn green, otherwise remain transparent
  const isActive = canDrop && isOver
  let backgroundColor = 'rgb(254 202 202)'
  isActive
    ? (backgroundColor = 'green')
    : (backgroundColor = 'rgb(254 202 202)')

	// Update when names are changed
  React.useEffect(() => {
    // logic to handle adding a Transformer every 4 devices automatically
		// if the number of non Transformers are a multiple of 4, 
		// and there isn't already a transformer for the previous multiple of 4 non Transformers
		let countTransformers = countOccurrences(names)['Transformer'] === undefined ? 0 : countOccurrences(names)['Transformer']
		for(let i = 0; i < Math.floor(((names.length-countTransformers)/4)-countTransformers); i++) {
			handleDrop({name: 'Transformer',data:transformer_info})
		}

    const totalEnergy = data.reduce((acc, curr) => acc + curr.energy, 0)
    const totalCost = data.reduce((acc, curr) => acc + curr.cost, 0)
    setTotalCost(totalCost)
    setTotalEnergy(totalEnergy)

    // Reordering the data and names to match the width constraint & possibly optimize for area
    let temp = groupItems(
      names.map((name, index) => {
        return { name: name, data: data[index] }
      }),
      100
    )
    if (temp.length > 0) {
      setArrangedData(flattenArray(temp))
    }
		setVerticalGap(verticalGap => Math.min(verticalGap,maxVerticalGap(arrangedData,scale)))
  }, [names])

	// function to handle the adding via the materialui input block until the devices list
	const handleInput = (target: number, name: string) => {
		let numOcc = countOccurrences(names)[name];
		if(target >= numOcc) {
			for(let i = 0; i < target - numOcc; i++) {
				handleDrop({name: name, data: devicesDict[name]})
			}
		}
		else {
			for(let c = 0; c < numOcc-target; c++) {
				for(let i = 0; i < arrangedData.length; i++) {
					for(let j = 0; j < arrangedData[i].length; j++) {
						if(arrangedData[i][j].name == name) {
							handleRemove(i,j);
							return;
						}
					}
				}
			}
		}
	}


	/*-------------------------------------------------------------------------------*/
	/*--------------------------------Begin of return--------------------------------*/
	/*-------------------------------------------------------------------------------*/
  return (
    <div
      ref={drop}
      style={{ backgroundColor }}
      className='flex self-center flex-row h-full w-4/5'
    >
			{/* Container of the items in the layout */}
      <div className='p-8 w-4/5 overflow-auto'>
        {arrangedData.map((item, sidx) => {
          return (
            <div key={sidx} style={{marginBottom: verticalGap*scale + "px"}} className='flex flex-row'>
              {item.map((i, idx) => {
                return (
                  <div
                    style={{
											marginRight: horizontalGap*scale + "px",
                      width: scale * i.data.floor_dimension_L,
                      height: scale * i.data.floor_dimension_W,
                      backgroundColor: colorDictionary[i.name],
                    }}
                    className='flex-shrink-0 flex justify-center items-center border-2 border-black'
                    key={idx}
                  >
                    <button style={{fontSize: 5*scale}} onClick={() => handleRemove(sidx, idx)}>🗑</button>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      {/* The legend and the items below it */}
      <div className='flex flex-col justify-start w-1/5 overflow-y-auto bg-transparent'>
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
                    <div>&nbsp;{item}</div>
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
            <div className='total-cost items-center justify-center flex flex-col bg-blue-500 h-12 w-full'>{`Total Cost: $${totalCost}`}</div>
          </>
        ) : (
          <></>
        )}
        {/* Only display the energy if currently greater than zero */}
        {totalEnergy > 0 ? (
          <>
            <div className='total-energy items-center justify-center flex flex-col bg-green-500 h-12 w-full'>{`Total Energy: ${totalEnergy} MWh`}</div>
          </>
        ) : (
          <></>
        )}
        {names.length > 0 ? (
          <>
            <div className='total-cost items-center justify-center flex flex-col bg-amber-500 h-12 w-full'>{`Total Area: ${calcArea(arrangedData,horizontalGap,verticalGap).area} sq. ft`}</div>
						<div className='bg-rose-100 h-40 flex flex-col'>
							<div className='total-energy pt-2 flex justify-center items-center'>Devices list:</div>
							{uniqueNames.map((item,idx) => {
								return (
									<div key={idx} className='flex flex-row justify-center'>{`${item}: `}
									<div className='w-8 ml-2'>
										{item !== 'Transformer' ? <Input
											value={countOccurrences(names)[item]}
											sx={{height:'10px',fontSize:'15px'}}
											size="small"
											onChange={(e: any) => handleInput(e.target.value,item)}
											inputProps={{
												step: 1,
												min: 0,
												type: 'number',
												'aria-labelledby': 'input-slider',
											}}
										/> : <div>{`${countOccurrences(names)[item]}`}</div>}
									</div>
									</div>
								)
							})}
						</div>
						<div className='h-28 bg-emerald-100 flex flex-col justify-start items-center'>
							<div className='flex flex-row w-3/5'>
								<div className='px-2'>Scale</div>
								<Slider size="small" value={scale} step={0.1} defaultValue={scale} min={1} max={10} onChange={(e: any) => setScale(e.target.value)} aria-label="Default" valueLabelDisplay="auto" />
							</div>
							<div className='flex flex-row justify-center items-center w-full px-2'>	
								<div className='w-5/6 pl-2'>Horizontal Gap (ft)</div>
								<div className='w-1/6'>
									<Input
										value={horizontalGap}
										size="small"
										onChange={(e: any) => setHorizontalGap(e.target.value)}
										inputProps={{
											step: 1,
											min: 0,
											max: 10,
											type: 'number',
											'aria-labelledby': 'input-slider',
										}}
									/>
								</div>
							</div>
							<div className='flex flex-row justify-center items-center w-full px-2'>	
								<div className='w-5/6 pl-2'>Vertical Gap (ft)</div>
								<div className='w-1/6'>
									{/* Make sure the scaling vertical does not let the max width exceed 100 ft. If there are 10 items, max vgap = 0*/}
									<Input
										value={verticalGap < maxVerticalGap(arrangedData,scale) ? verticalGap : maxVerticalGap(arrangedData,scale)}
										size="small"
										onChange={(e: any) => setVerticalGap(e.target.value)}
										inputProps={{
											step: 1,
											min: 0,
											max: maxVerticalGap(arrangedData,scale),
											type: 'number',
											'aria-labelledby': 'input-slider',
										}}
									/>
								</div>
							</div>
						</div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
