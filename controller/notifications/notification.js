var moment = require('moment');
var NotificationModel = require('../../model/notifications/notification')
var NotificationController = {};

NotificationController.clicksCount = async function(req, res){
    let notificationId = req.query.notification_id;
    let siteId = req.query.site_id ? req.query.site_id : "";
    let startDate = req.query.start_date ? moment(req.query.start_date).format("YYYY-MM-DD HH:mm:ss") : "";
    let endDate = req.query.end_date ? moment(req.query.end_date).format("YYYY-MM-DD HH:mm:ss") : "";
    if(!notificationId){
        return res.status(400).send('notification_id param missing');
    }
    if((startDate && !endDate) || (!startDate && endDate) || (startDate && endDate && startDate > endDate)){
        return res.status(400).send('start_date and end_date params not correct');
    }
    
    let clickCount = await NotificationModel.clicksCount(siteId, notificationId, startDate, endDate);
    return res.status(200).send({click_count: clickCount[0].count});
}

NotificationController.viewsCount = async function(req, res){
    let notificationId = req.query.notification_id;
    let siteId = req.query.site_id ? req.query.site_id : "";
    let startDate = req.query.start_date ? moment(req.query.start_date).format("YYYY-MM-DD HH:mm:ss") : "";
    let endDate = req.query.end_date ? moment(req.query.end_date).format("YYYY-MM-DD HH:mm:ss") : "";
    if(!notificationId){
        return res.status(400).send('notification_id param missing');
    }
    if((startDate && !endDate) || (!startDate && endDate) || (startDate && endDate && startDate > endDate)){
        return res.status(400).send('start_date and end_date params not correct');
    }
    let viewCount = await NotificationModel.viewsCount(siteId, notificationId, startDate, endDate);
    return res.status(200).send({view_count: viewCount[0].count});
}

module.exports = NotificationController;

