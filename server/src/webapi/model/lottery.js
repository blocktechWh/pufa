'use strict';
/**
 * model
 */
export default class extends think.model.relation {

    init(...args){
        super.init(...args);
        this.tableName = 'lottery';
        this.relation = {
            joiner: {
                type: think.model.HAS_MANY, 
                field: 'lottery_id,user_id',
                model: 'user_lottery',
                key: 'id',
                fKey: 'lottery_id'
            }
        };
    }
    
}