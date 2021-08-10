export default class Collection extends Array {
  constructor() {
    super()
  }
  /**
   *
   * @param {Boolean} distinct
   */
  setDistinct(distinct) {
    this.distinct = distinct
  }
  /**
   *
   * @param {Object} value
   */
  push(value) {
    if (this.distinct && this.indexOf(value) !== -1) {
      return
    }
    this.push(value)
  }

  count() {
    return this.length
  }
  /**
   *
   * @param {String} column
   */
  avg(column) {
    if (!(column && typeof column === 'string')) {
      throw new TypeError('Please provide column to find min')
    }
    let avg = 0
    this.forEach(value => {
      value = typeof value === 'object' ? value[column] : value
      if (value) {
        avg += Number(value)
      }
    })
    return avg / this.length
  }
  /**
   *
   * @param {String} column
   */
  min(column) {
    if (!(column && typeof column === 'string')) {
      throw new TypeError('Please provide column to find min')
    }
    let min
    this.forEach(value => {
      value = typeof value === 'object' ? value[column] : value
      if (!min || min > value) {
        min = value
      }
    })
    return min
  }
  /**
   *
   * @param {String} column
   */
  max(column) {
    if (!(column && typeof column === 'string')) {
      throw new TypeError('Please provide column to find min')
    }
    let max
    this.forEach(value => {
      value = typeof value === 'object' ? value[column] : value
      if (!max || max < value) {
        max = value
      }
    })
    return max
  }
}
