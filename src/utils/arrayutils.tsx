/**
 * Reduces an array into an object consisting of groups. The keys of the object indicate the groups
 * and the values hold an array of elements which are in that group. Mapping functions can be specified
 * which determine the key and the value for the element. An initial object may be optionally specified.
 * 
 * @param {Array<any>} arr array to be grouped
 * @param {Function} keyMap Mapping function that evaluates what key to give an array element.
 * @param {Function} valueMap Mapping function that evaluates what value to give an array element.
 * @param {Object} intitial the initial object to add to, defaulting to {}
 * @returns {Object}
 */
export function mapArrayToObject (
  arr: Array<any>, 
  keyMap: Function = (key: any) => key,
  valueMap: Function = (value: any) => value,
  initial: Object = {}
) {
  return arr.reduce((groups, element, idx) => {
    const key = keyMap(element, idx);
    const value = valueMap(element, idx);
    if (!groups[key]) {
      groups[key] = [value];
    } else {
      groups[key].push(value);
    }
    return groups;
  }, initial);
}
