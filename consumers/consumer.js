var kafka = require('kafka-node');
const Client = kafka.KafkaClient;
const client = new Client('127.0.0.1:2181');

var Consumer = kafka.Consumer,
    consumer = new Consumer(client,
        [
            { topic: 'pushengage.viewNotification', offset: 0},
            { topic: 'pushengage.clickNotification', offset: 0}
        ],
        {
            autoCommit: false
        }
    );
    consumer.on('message', function (message) {
        console.log('Inconsumer',message);
        if(message.topic == 'pushengage.viewNotification'){
           ConsumerService.saveViewToMysql(JSON.parse(message.value));
        }
        if(message.topic == 'pushengage.clickNotification'){
            ConsumerService.saveClickToMysql(JSON.parse(message.value));
        }
    });
    consumer.on('error', function (err) {
        console.log('Error:',err);
    })
    consumer.on('offsetOutOfRange', function (err) {
        console.log('offsetOutOfRange:',err);
    })


var ConsumerService = {};
ConsumerService.saveClickToMysql = function(message){
    let query = 'insert into click_records (subscriber_id,notification_id,created_at) values (? , ? , ? )';
    let valueArray = [message.subscriber_id,message.notification_id,message.created_at];
    masterExecutePromisified(query,valueArray);
}

ConsumerService.saveViewsToMysql = function(message){
    let query = 'insert into view_records (subscriber_id,notification_id,created_at) values (? , ? , ? )';
    let valueArray = [message.subscriber_id,message.notification_id,message.created_at];
    masterExecutePromisified(query,valueArray);
}

module.exports = ConsumerService;