'use strict';

export default class extends think.controller.rest {
  
  init(http){
    super.init(http);
    this._isRest = false;
    let prizeTable = {
      "1":1,
      "1":1,
      "1":1,
      "1":1
    }
  }

  async currentAction(){
    let userId = think.service('auth').getUserId(this)
    if(!userId)return;
    let currentLotteryInfo = await this.modelInstance.where({'owner': userId}).select();
    return this.success(currentLotteryInfo);
  }

  async joinAction(){
    let userId = think.service('auth').getUserId(this)
    let { lotteryId } = this.post()
    let lotteryInfo = await this.model('user_lottery').where({user_id:userId,lottery_id:lotteryId}).find();
    if(think.isEmpty(lotteryInfo)){
      await this.model('user_lottery').add({user_id:userId,lottery_id:lotteryId})
      return this.success('成功加入');
    }else{
      return this.fail('你已经加入过了');
    }
  }

  async startAction(){
    
  }

  async historyAction(){

  }

  async myAction(){

  }

}