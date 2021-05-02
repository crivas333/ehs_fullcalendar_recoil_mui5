//- connect to Mongo via mongo-shell
//$mongo "mongodb+srv://cluster0.pii3g.mongodb.net/chat" --username dala
//>[enter password (berlin2003)]
//*execute script "mongodb_counters.js" from the current file location
//>load("/home/dala/0_MY_FILES/myWebApp/MY_APPO/appointments/mongodb_counters.js")
//>exit

//$mongo "mongodb://localhost:27017/chat"
//>show dbs
//>use chat
//>show collections

//Create custom indexes
db.createCollection("counters")
db.counters.insert({_id:"historyId",sequence_value:100000})
db.counters.insert({_id:"appointmentId",sequence_value:1000})
db.counters.insert({_id:"examId",sequence_value:1000})

db.createCollection('customdatas')
db.customdatas.insert({fieldType:'encounterType', fieldData:'CONSULTA'})
db.customdatas.insert({fieldType:'encounterType', fieldData:'CHEQUEO_MÉDICO'})
db.customdatas.insert({fieldType:'encounterType', fieldData:'ATENCIÓN_PREVENTIVA'})
db.customdatas.insert({fieldType:'patientType',fieldData:'NUEVO'})
db.customdatas.insert({fieldType:'patientType',fieldData:'REGULAR'})
db.customdatas.insert({fieldType:'serviceType',fieldData:'AMBULATORIA'})
db.customdatas.insert({fieldType:'serviceType',fieldData:'INTERNAMIENTO'})
db.customdatas.insert({fieldType:'sensibility',fieldData:'NORMAL'})
db.customdatas.insert({fieldType:'sensibility',fieldData:'URGENTE'})
db.customdatas.insert({fieldType:'serviceBundle',fieldData:'PAQUETE#1'})
db.customdatas.insert({fieldType:'serviceBundle',fieldData:'PAQUETE#2'})

//Create options for SELECT control
// db.createCollection('encounterType')
// db.encounterType.insert({_id:1,option:'CONSULTA'})
// db.encounterType.insert({_id:2,option:'CHEQUEO_MÉDICO'})
// db.encounterType.insert({_id:3,option:'ATENCIÓN_PREVENTIVA'})

//Create options for SELECT control
// db.createCollection('patientType')
// db.patientType.insert({_id:1,option:'NUEVO'})
// db.patientType.insert({_id:2,option:'REGULAR'})

// //Create options for SELECT control
// db.createCollection('serviceType')
// db.serviceType.insert({_id:1,option:'AMBULATORIA'})
// db.serviceType.insert({_id:2,option:'INTERNAMIENTO'})

// //Create options for SELECT control
// db.createCollection('sensibility')
// db.sensibility.insert({_id:1,option:'NORMAL'})
// db.sensibility.insert({_id:2,option:'URGENTE'})

// //Create options for SELECT control
// db.createCollection('servicesBundle')
// db.servicesBundle.insert({_id:1,option:'PAQUETE#1'})
// db.servicesBundle.insert({_id:2,option:'PAQUETE#2'})


