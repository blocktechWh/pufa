'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
    
  async startAction(){
    if(!this.validate({
      lotteryId: "int|required"
    })){
      return this.fail('validate error', this.errors());
    }
  }

  async joinAction(){
    if(!this.validate({
      lotteryId: "int|required"
    })){
      return this.fail('validate error', this.errors());
    }
  }

  async infoAction(){
    if(!this.validate({
      lotteryId: "int|required"
    })){
      return this.fail('validate error', this.errors());
    }
  }
    
}