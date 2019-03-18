import CommonEntity from './common-entity';

export default class ColumnEntity extends CommonEntity {
  /**
   * 
   * @param {String} name 
   * @param {Boolean} unique 
   * @param {Boolean} multiEntry 
   * @param {Boolean} nullable 
   * @param {String} type 
   */
  constructor(name, unique = false, multiEntry = false, nullable = true, type = 'string') {
    super();
    this.setter(name, 'name');
    this.unique = unique;
    this.multiEntry = multiEntry;
    this.type = type;
    this.nullable = nullable;
  }
  /**
   * 
   * @param {Object} json 
   */
  static fromJSON(json) {
    return new ColumnEntity(json.name, json.unique, json.multiEntry, json.nullable, json.type);
  }
}