/**
 * Determines the visibility of a field based on specified criteria and values.
 *
 * @param {object} field - The field object.
 * @param {string[]} visibleKeys - An array of keys that determine the visibility of the field.
 * @param {string[]} criterias - An array of criteria values.
 * @param {object} values - The values object.
 * @returns {boolean[]} - An array of boolean values indicating the visibility of the field.
 */
export const visibleWhenFilter = (field, visibleKeys, criterias, values) => {
  /**
   * Makes a decision based on the field value and criteria.
   *
   * @param {any} fieldValue - The value of the field.
   * @param {any} criteria - The criteria value.
   * @returns {boolean} - The decision based on the field value and criteria.
   */
  const makeADecision = (fieldValue, criteria) => {
    if (fieldValue === undefined) {
      return !criteria;
    } else {
      return fieldValue === criteria;
    }
  };

  let decisions = visibleKeys.map((vKey, index) => {
    // What to do when values is undefined
    if (field && field[vKey]) {
      if (Array.isArray(field[vKey])) {
        let falseDecisionArray = field[vKey]
          .map(visibleWhenKey => {
            return values[visibleWhenKey];
          })
          .map(fieldValue => {
            let d = makeADecision(fieldValue, criterias[index]);
            return d;
          })
          .filter(fieldValue => fieldValue === false);
        if (falseDecisionArray.length > 0) {
          return false;
        }
        return true;
      } else {
        let visibleWhenKey = field[vKey];
        let d = makeADecision(values[visibleWhenKey], criterias[index]);
        return d;
      }
    }
    return true;
  });
  return decisions.filter(d => d === false);
};