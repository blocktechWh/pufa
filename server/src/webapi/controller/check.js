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
    let checkInfo = await this.modelInstance.where({user_id:userId}).find();
    if(think.isEmpty(checkInfo)){
      await this.modelInstance.add({user_id:userId,check_times:1,check_times_total:1});
      await this.model('user').where({'u_id':userId}).increment('point',1);
    }else{
      let dateService = think.service('date');
      let last_visit_date = new Date(checkInfo.last_visit_time);
      if(dateService.isToday(last_visit_date)){
        return this.fail('今天已经签到过了');
      }else if(dateService.isYestday(last_visit_date)){
        let check_times = checkInfo.check_times===7?1:checkInfo.check_times+1;//7天清零
        let check_times_total = checkInfo.check_times_total+1;
        await this.modelInstance.update({check_times,check_times_total,last_visit_time: ['exp', 'CURRENT_TIMESTAMP()']},{user_id:userId});
        await this.model('user').where({'u_id':userId}).increment('point',check_times);
      }else{
        await this.modelInstance.update({check_times:1,check_times_total:1,last_visit_time: ['exp', 'CURRENT_TIMESTAMP()']},{user_id:userId});//断签
        await this.model('user').where({'u_id':userId}).increment('point',1);
      }
    }
    await this.model('check_log').add({user_id:userId})//添加签到日志
    checkInfo = await this.modelInstance.where({user_id:userId}).getField('check_times,check_times_total,last_visit_time',true);
    return this.success({checkInfo});
  }

  async historyAction(){
    let userId = think.service('auth').getUserId(this)
    if(!userId)return;
    let { year, month } = this.post();
    let MonthHis = await this.model('check_log').where(`user_id=` + userId + ` AND DATE_FORMAT( check_time, '%Y%m' ) = `+ year + '' + month + ` `).getField('check_time');
    return this.success(MonthHis);
  }

}