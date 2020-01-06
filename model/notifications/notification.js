var NotificationModel = {};

NotificationModel.clicksCount = function(siteId, notificationId, startTime, endTime){
    return new Promise(async function(resolve, reject){
        try{
            let valueArray = [];
            let conditionArray = [];
            // if(siteId){
            //     conditionArray.push(`site_id = ?`);
            //     valueArray.push(siteId);
            // }
            if(notificationId){
                conditionArray.push(`notification_id = ?`);
                valueArray.push(notificationId);
            } 
            if(startTime){
                conditionArray.push(`created_at >= ?`);
                valueArray.push(startTime);
            }
            if(endTime){
                conditionArray.push(`created_at <= ?`);
                valueArray.push(endTime);
            }
            let query = `select count(id) as count from click_records`;
            if(conditionArray.length){
                query += ` WHERE ${(conditionArray).join(' AND ')} `
            }
            let result = await slaveExecutePromisified(query, valueArray);
            resolve(result);
        } catch(e) {
            console.error('goterr',e);
            reject(e);
        }
    });

}

NotificationModel.viewsCount = function(siteId, notificationId, startTime, endTime){
    return new Promise(async function(resolve, reject){
        try{
            let valueArray = [];
            let conditionArray = [];
            // if(siteId){
            //     conditionArray.push(`site_id = ?`);
            //     valueArray.push(siteId);
            // }
            if(notificationId){
                conditionArray.push(`notification_id = ?`);
                valueArray.push(notificationId);
            } 
            if(startTime){
                conditionArray.push(`created_at >= ?`);
                valueArray.push(startTime);
            }
            if(endTime){
                conditionArray.push(`created_at <= ?`);
                valueArray.push(endTime);
            }
            let query = `select count(id) as count from view_records`;
            if(conditionArray.length){
                query += ` WHERE ${(conditionArray).join(' AND ')} `
            }
            let result = await slaveExecutePromisified(query, valueArray);
            resolve(result);
        } catch(e) {
            reject(e);
        }
    });
}


module.exports = NotificationModel;