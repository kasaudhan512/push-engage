# push-engage
**click and view notification payloads maintaing in kafka.**
1. There are basically 2 API one will produce clicks notification payload into Kafka. and Another one will produce views notification
payload into kafka.
2. Then consumers of these payloads will consume data and store into mysql.
3. There are 2 statistics analytical APIs. which will provide us count and clicks and views notifications.


**SET UP**  
(i) setup zookeeper  
(ii) setup kafka  
(iii) db-setup with pushengage databse name create 2 tables view_records, click_records.  
(iii) npm install  
(iv) node server.js  
