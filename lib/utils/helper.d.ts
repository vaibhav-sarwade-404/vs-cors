/**
 * This helper function will return first key with value
 * @param obj - Object
 * @param value - value to find
 * @returns {string | undefined}
 */
declare const getObjectKeyFromValue: (obj: {
    [key: string]: any;
}, value: any) => string | undefined;
export { getObjectKeyFromValue };
