var express = require('express');
var router  = express.Router();

var ProducerService = require('../producers/producer');
var NotificationController = require('../controller/notifications/notification');

router.get('/',function(req,res){
    res.json({greeting:'Kafka Consumer'})
});

router.post('/record_view',function(req,res){
    console.log('view_record producer');
    var sentMessage = JSON.stringify(req.body.message);
    payloads = [
        { topic: 'pushengage.viewNotification', messages:sentMessage , partitions: 1, attributes:1 }
    ];
    ProducerService.produceJob(payloads,function(err,data){
        if(err){
            return res.status(500).send('Something Went Wrong');
        }
        return res.send(data);
    });
})

router.post('/record_click',function(req,res){
    console.log('click_record producer');
    var sentMessage = JSON.stringify(req.body.message);
    payloads = [
        { topic: 'pushengage.clickNotification', messages:sentMessage , partitions: 1, attributes:1 }
    ];
    ProducerService.produceJob(payloads,function(err, data){
        if(err){
            return res.status(500).send('Something Went Wrong');
        }
        return res.send(data);
    });
})

// Analytics
router.get('/total_clicks',NotificationController.clicksCount);
router.get('/total_views',NotificationController.viewsCount);

module.exports = router;