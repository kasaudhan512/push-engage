var express = require('express');
var router  = express.Router();

var ConsumerService = require('../consumers/consumer');
var ProducerService = require('../producers/producer')

router.get('/',function(req,res){
    res.json({greeting:'Kafka Consumer'})
});

router.post('/record_view',function(req,res){
    console.log('view_record');
    var sentMessage = JSON.stringify(req.body.message);
    payloads = [
        { topic: 'pushengage.viewNotification', messages:sentMessage , partitions: 1, attributes:1 }
    ];
    ProducerService.produceJob(payloads,function(err,data){
        return res.send(data);
    });
})

router.post('/record_click',function(req,res){
    console.log('click_record');
    var sentMessage = JSON.stringify(req.body.message);
    payloads = [
        { topic: 'pushengage.clickNotification', messages:sentMessage , partitions: 1, attributes:1 }
    ];
    ProducerService.produceJob(payloads,function(err, data){
        return res.send(data);
    });
})

module.exports = router;