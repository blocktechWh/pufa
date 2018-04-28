'use strict';

export default class extends think.controller.rest {
  
  init(http){
    super.init(http);
    this._isRest = false;
  }
  
  __before(){
    
  }

  async indexAction(){
    let userId = think.service('auth').getUserId(this);
    if(!userId)return;
    let checkInfo = await this.modelInstance.find({user_id:userId});
    if(think.isEmpty(checkInfo)){
      await this.modelInstance.add({user_id:userId,check_times:1,check_times_total:1});
    }else{
      let dateService = think.service('date');
      let last_visit_date = new Date(checkInfo.last_visit_time);
      if(dateService.isToday(last_visit_date)){
        return this.fail('今天已经签到过了');
      }else if(dateService.isYestday(last_visit_date)){
        let check_times = checkInfo.check_times===6?0:checkInfo.check_times+1;//7天清零
        let check_times_total = checkInfo.check_times_total+1;
        await this.modelInstance.update({check_times,check_times_total,last_visit_time:new Date()},{user_id:userId});
      }else{
        await this.modelInstance.update({check_times:1,check_times_total:1,last_visit_time:new Date()},{user_id:userId});//断签
      }
    }
    checkInfo = await this.modelInstance.where({user_id:userId}).getField('check_times,check_times_total,last_visit_time',true);
    return this.success({checkInfo});
  }

  async historyAction(){
    let userId = think.service('auth').getUserId(this)
    if(!userId)return;
  }

}