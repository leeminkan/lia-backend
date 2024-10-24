import { assign } from 'lodash';
import { ObjectLiteral } from 'typeorm';

// The assign function replace the data with the key is not null, if the key is null keep the origin data
export function objectAssign(
  existingData: ObjectLiteral,
  newData: Partial<ObjectLiteral>,
) {
  const listObject: {
    [key: string]: unknown;
  } = {};

  Object.keys(existingData).forEach((key) => {
    if (typeof existingData[key] === 'object') {
      if (Array.isArray(existingData[key])) {
        listObject[key] = newData[key] as Array<unknown>;
      } else listObject[key] = newData[key] as { [key: string]: unknown };
    }
  });
  // Assign the property is not an object or array
  const result = assign({}, existingData, newData);
  Object.keys(listObject).map((x) => {
    const data = listObject[x];
    if (typeof data === 'object') {
      // If the data is an object, replace directly
      result[x] = { ...existingData[x], ...newData[x] };
    }
    if (Array.isArray(data)) {
      // If the data is an array, loop through the list and replace each items
      result[x] = data.map((value2, index) =>
        assign({}, existingData[x][index], value2),
      );
    }
  });
  return result;
}
