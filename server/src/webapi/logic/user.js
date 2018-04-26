'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  
  getAction(){
    let rules = {
      token: {
        required: true,
        value: this.header('token')
      }
    }
    let flag = this.validate(rules);
    if(!flag){
      return this.fail('validate error', this.errors());
    }
  }

  postAction(){
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