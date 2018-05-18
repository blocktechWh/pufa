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
    let user = await think.service('auth').getUser(this);
    if(!user)return;
    let current = await this.modelInstance.where({'owner': user.u_id,status:['!=',2]}).find();
    //如果有进行中的活动直接返回
    if(!think.isEmpty(current)){
      return this.success(current);
    }else{
      let user_lottery = await this.modelInstance.where({'owner': user.u_id}).select();
      let lotteryId;
      // 前三次免费
      // status: 0可以开奖,1人数不够开奖,2已经开过奖
      if(user_lottery.length<=3){
        lotteryId = await this.modelInstance.add({'owner': user.u_id,status:1});
      }else if(user.point>10){
        await this.model('user').where({'u_id':user.u_id}).decrement('point',10);
        lotteryId = await this.modelInstance.add({'owner': user.u_id,status:1});
      }else{
        return this.fail('积分不足以发起抽奖');
      }
      await this.model('user_lottery').add({'user_id':user.u_id,lottery_id:lotteryId});
      return this.success({id:lotteryId,status:1});
    }
  }

  async joinAction(){
    let userId = think.service('auth').getUserId(this);
    let { lotteryId } = this.post();
    let lottery = await this.modelInstance.where({'id': lotteryId}).find();
    if(think.isEmpty(lottery))return this.fail('无效抽奖编号');
    if(lottery.status===2){
      return this.fail('该抽奖已经结束');
    }else if(lottery.joiner.length>=6){
      return this.fail('参与人数已满');
    }else{
      let lotteryInfo = await this.model('user_lottery').where({user_id:userId,lottery_id:lotteryId}).find();
      if(think.isEmpty(lotteryInfo)){
        await this.model('user_lottery').add({user_id:userId,lottery_id:lotteryId});
        if(lottery.joiner.length==5)await this.modelInstance.where({'id': lotteryId}).update({status:0});
        return this.success('成功加入');
      }else{
        return this.fail('你已经加入过了');
      }
    }
  }

  async startAction(){
    let userId = think.service('auth').getUserId(this);
    let { lotteryId } = this.post();
    let lottery = await this.modelInstance.where({'id': lotteryId,'owner': userId,status:0}).find();
    if(think.isEmpty(lottery))return this.fail('无效抽奖编号');
    let winner = lottery.joiner[Math.floor(Math.random()*6)];
    let prize = 0;
    await this.modelInstance.where({'id': lotteryId}).update({winner:winner.user_id,status:2,prize})
    return this.success({winner,prize});
  }

  async historyAction(){

  }

  async myAction(){
    let userId = think.service('auth').getUserId(this);
    let lotteryIdList = await this.model('user_lottery').where({user_id:userId}).getField('lottery_id',false);
    let my = await this.modelInstance.where({id: ['IN', lotteryIdList]}).select();
    return this.success(my);
  }

  async infoAction(){
    let { lotteryId } = this.post();
    let info = await this.modelInstance.where({id:lotteryId}).find();
    return this.success(info);
  }


}