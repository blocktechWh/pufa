'use strict';

export default class extends think.controller.rest {
  
  init(http){
    super.init(http);
    this._isRest = false;
  }

  async currentAction(){
    let userId = think.service('auth').getUserId(this)
    if(!userId)return;
    let currentLotteryInfo = await this.modelInstance.where({'owner': userId}).select();
    return this.success(currentLotteryInfo);
  }

  async joinAction(){

  }

}