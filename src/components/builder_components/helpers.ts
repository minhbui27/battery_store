import type {DataProps} from './DropTarget'

interface ItemProps {
	name: string,
	data: DataProps
}
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
