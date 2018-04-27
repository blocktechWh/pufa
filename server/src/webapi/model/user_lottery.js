'use strict';
/**
 * model
 */
export default class extends think.model.relation {
    init(...args){
        super.init(...args);
        this.tableName = 'user_lottery';
        this.relation = {
            user: {
                type: think.model.BELONG_TO,
                field: 'u_id,name,image_url',
                key: 'user_id',
                fKey: 'u_id'
            }
        };
    }
}