require('dotenv').config();
var azure  = require('azure-storage');
var base64 = require('base-64');

var queueSvc = azure.createQueueService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY);

function create(){
  queueSvc.createQueueIfNotExists('zhf-bash-1-queue', function(error) {
    if (!error) {
      console.log("Success - createQueueIfNotExists");
    } else {
      console.error("Error - createQueueIfNotExists", error);
    }
  });
}

// `str` MUST be in base64 - tried it with normal string, it didn't work
// the base64 string will be automatically decoded in the Azure platform
function add(){
  var str = base64.encode(new Date().valueOf());
  queueSvc.createMessage("zhf-bash-1-queue", str, function(error, results, response){
    if(!error){
      console.log("Success - createMessage");
    } else {
      console.error("Error - createMessage", error);
    }
  });
}

function meta(){
  queueSvc.getQueueMetadata('zhf-bash-1-queue', function(error, results, response){
    if(!error){
      console.log("Success - getQueueMetadata", results);
    } else {
      console.error("Error - getQueueMetadata", error);
    }
  });
}

function generate(){
  console.log("Adding a new message to the queue...")
  create();
  add();
}

generate();
meta();
