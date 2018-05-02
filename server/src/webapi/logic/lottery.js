'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
    
    async startAction(){
        if(!this.validate({
          id: "int|required"
        })){
          return this.fail('validate error', this.errors());
        }
    }
    
}