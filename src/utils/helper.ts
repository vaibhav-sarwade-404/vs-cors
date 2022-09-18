/**
 * This helper function will return first key with value
 * @param obj - Object
 * @param value - value to find
 * @returns {string | undefined}
 */
const getObjectKeyFromValue = (obj: { [key: string]: any }, value: any) => {
  const objKeysArr = Object.keys(obj);
  if (!objKeysArr.length) {
    return;
  }
  return objKeysArr.find(objKey => obj[objKey] === value);
};

export { getObjectKeyFromValue };
