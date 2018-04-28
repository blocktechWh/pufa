'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  /**
   * index action logic
   * @return {} []
   */
  indexAction(){
   
  }

  historyAction(){
    let rules = {
      year: {
        required: true,
        regexp: /^\d{4}$/
      },
      month: {
        required: true,
        regexp: /^\d{2}$/
      },
    }
    let flag = this.validate(rules);
    if(!flag){
      return this.fail('validate error', this.errors());
    }
  }

}