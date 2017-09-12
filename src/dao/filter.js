export const FILTER_TYPE = {
    EQUAL: 'equal',
    STARTS_WITH: 'startsWith',
    ENDS_WITH: 'endsWith',
    GREATER_THAN: 'greaterThan',
    GREATER_THAN_OR_EQUAL: 'greaterThanOrEqual',
    LESSER_THAN: 'lesserThan',
    LESSER_THAN_OR_EQUAL: 'lesserThanOrEqual',
    BETWEEN: 'between'
};

export const FILTER_SPLITTER = '~';

export default class Filter {
    /**
     * 
     * @param {String} type 
     * @param {String} value 
     * @param {String} index 
     */
    constructor(type, value, xEntity) {
        this.type = type;
        this.value = value;
        if (xEntity) {
            this.index = xEntity.name;
        }
    }
}