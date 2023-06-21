import type {DataProps} from './DropTarget'

interface ItemProps {
	name: string,
	data: DataProps
}

// Group the input items to potentially minimize the required area needed
export function groupItems(items:ItemProps[], max_width:number) {
  // Sort items by floor_dimension_L in descending order
  items.sort((a, b) => b.data.floor_dimension_L - a.data.floor_dimension_L);
  
  let results = [];
  
  for (let i = 0; i < items.length; i++) {
    let placed = false;

    // Try to place the current item in existing groups
    for (let j = 0; j < results.length && !placed; j++) {
      let group = results[j];
      let totalWidth = group.reduce((sum, item) => sum + item.data.floor_dimension_W, 0);
      
      if (totalWidth + items[i].data.floor_dimension_W <= max_width) {
        group.push(items[i]);
        placed = true;
      }
    }

    // If the item couldn't be placed in any existing group, start a new group
    if (!placed) {
      results.push([items[i]]);
    }
  }

  return results;
}

// Similar to a reshape operation in numpy, do this to map the items on the schematic board
export function flattenArray(items:ItemProps[][]) {
	let output: ItemProps[][] = [[],[],[],[],[],[],[],[],[],[]];
	items.map((item,idx) => {
		for(let i = 0; i < item.length; i++) {
			output[i].push(item[i])
		}
	})
	return output
}

// Count the occurences of strings in names to be used for the devices list under total energy
export function countOccurrences(names: string[]) {
	return names.reduce((acc,curr) => {
		if (curr in acc) {
			acc[curr]++;
		}
		else {
			acc[curr] = 1;
		}
		return acc;
	},{} as {[key:string]: number})
}

// Calculate the total area of the flattened array, accounting for the gaps
export function calcArea(items:ItemProps[][],hGap: number, vGap: number) {
	let width:number = 0, length:number = 0;
	for(let i = 0; i < items.length; i++) {
		if(items[i].length > 0) {
			// Assumption that all items have the same width, otherwise this would be inaccurate. Need to implement
			// solution to this problem later by mapping over the i-th bin and finding the max
			width += items[i][0].data.floor_dimension_W;
			let temp_length = 0
			for(let j = 0; j < items[i].length; j++) {
				temp_length += items[i][j].data.floor_dimension_L
			}
			length = Math.max(temp_length,length)
		}
	}
	width = width + Math.max(0,vGap*items.length-1);
	length = length + Math.max(0,hGap*(items[0].length-1));
	return {width: width, length: length, area: length*width}
}

export function maxVerticalGap(items: ItemProps[][],scale:number): number{
	let curr_width = 0;
	for(let i = 0; i < items.length; i++) {
		if(items[i].length > 0) {
			// Assumption that all items have the same width, otherwise this would be inaccurate. Need to implement
			// solution to this problem later by mapping over the i-th bin and finding the max
			curr_width += items[i][0].data.floor_dimension_W;
		}
	}
	return Number(((100-curr_width)/scale).toFixed(1));
}
//
// const items = [
//   { floor_dimension_L: 10, floor_dimension_W: 10, energy: 0, cost: 0, release_date: 0 },
//   { floor_dimension_L: 10, floor_dimension_W: 10 , energy: 0, cost: 0, release_date: 0},
//   { floor_dimension_L: 30, floor_dimension_W: 10 , energy: 0, cost: 0, release_date: 0},
//   { floor_dimension_L: 30, floor_dimension_W: 10 , energy: 0, cost: 0, release_date: 0},
//   { floor_dimension_L: 40, floor_dimension_W: 10 , energy: 0, cost: 0, release_date: 0}
// ];
//
// console.log(groupItems(items, 100));
