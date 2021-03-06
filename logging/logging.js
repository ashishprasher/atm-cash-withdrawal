/**
 * Created by ashishprasher on 18/02/20.
 */

const envProperties                 = require('./../properties/envProperties');
const moment                        = require('moment');


let debugging_enabled               = true;

//disable logging in live env
if (envProperties.isEnvLive()) {
  debugging_enabled = false;
}


const fileSwitches = {
  atm     : true,
  startup : true,
  test    : true,
};

const modules = {
  atm     : {
    withdrawCash : true
  },
  startup : {
    initialize : true
  },
  test : {
    test : true
  }
};

const log = (apiReference, log) => {
  if (
    apiReference
    && apiReference.module
    && apiReference.api
    && fileSwitches
    && fileSwitches[apiReference.module] == true
    && modules
    && modules[apiReference.module]
    && modules[apiReference.module][apiReference.api] == true) {

    try {
      log = JSON.stringify(log);
    }
    catch (exception) {
    }
    console.log("-->" + moment(new Date()).format('YYYY-MM-DD hh:mm:ss.SSS') + " :----: " +
      apiReference.module + " :=: " + apiReference.api + " :=: " + log);
  }
};



const logError = (apiReference, log) => {
  if (apiReference
    && apiReference.module
    && apiReference.api) {

    try {
      log = JSON.stringify(log);
    }
    catch (exception) {
    }
    console.error("-->" + moment(new Date()).format('YYYY-MM-DD hh:mm:ss.SSS') + " :----: " +
      apiReference.module + " :=: " + apiReference.api + " :=: " + log);
  }
};


exports.log      = log;
exports.logError = logError;