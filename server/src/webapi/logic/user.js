'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  
  loginAction(){
    let rules = {
      code: "string|required",
      nickName: "string|maxLength:100|required",
      avatarUrl: "string|url|required"
    }
    let flag = this.validate(rules);
    if(!flag){
      return this.fail('validate error', this.errors());
    }
  }

}