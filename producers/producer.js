var kafka = require('kafka-node');

const Client = kafka.KafkaClient;
const client = new Client('127.0.0.1:2181');
var ProducerService = {};
var Producer = kafka.Producer,
    producer = new Producer(client);
    producer.on('ready', function () {
        console.log('Producer is ready');
    });
    producer.on('error', function (err) {
        if(err){
            console.log(err);
        }
        console.log('Producer is in error state');
    });


ProducerService.produceJob = function(payloads, callback){
    console.log('produce-job-->',payloads);
    producer.send(payloads, function (err, data) {
        if(err){
            console.error('Got some Error',err);
            callback(err,null);
        }
        console.log('producersend',data);
        callback(null,data);
    });
}

module.exports = ProducerService;
