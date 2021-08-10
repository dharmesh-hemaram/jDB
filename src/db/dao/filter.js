const FILTER_TYPE = {
  EQUAL: 'equal',
  STARTS_WITH: 'startsWith',
  ENDS_WITH: 'endsWith',
  GREATER_THAN: 'greaterThan',
  GREATER_THAN_OR_EQUAL: 'greaterThanOrEqual',
  LESSER_THAN: 'lesserThan',
  LESSER_THAN_OR_EQUAL: 'lesserThanOrEqual',
  BETWEEN: 'between'
}

const FILTER_SPLITTER = '~'

class Filter {
  /**
   *
   * @param {String} type
   * @param {String} value
   * @param {String} index
   */
  constructor(type, value, xEntity) {
    this.type = type
    this.value = value
    if (xEntity) {
      this.index = xEntity.name
    }
  }
}

export { Filter, FILTER_SPLITTER, FILTER_TYPE }
