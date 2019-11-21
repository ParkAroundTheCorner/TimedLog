/**
 * Exposes the main functions available through this API.
 *
 * @author Julien Quinet
 */

// Third-party dependencies
const fs = require('fs');

// Dependencies
const MODE = require('./mode');
const SEVERITY = require('./severity');

// NOOP Function when output traces are disabled
const noop = () => {};

// File handler
let logFile = undefined;

// Bind NOOP Function per default
let consoleInfo = noop;
let consoleWarn = noop;
let consoleAlert = noop;

// EOL character to be added at the end of the message
let messageEOL = '';

/**
 * Encapsulates the main functions available through this API in an object
 */
const timedLog = {

  /**
   * Configures the behavior of this API. This function has to be called first for being
   * able to log any message. This function can be called whenever the logging mechanism
   * needs to be changed (switching between different modes and/or severities).
   * @param {MODE} logMode The selected log output mode.
   * @param {SEVERITY} logLevel The selected message severities which will be logged.
   * @param {string} [logFilename] The name of the log file when the FILE mode is used. This file will be created in the current directory
   * @returns {void}
   */
  configure: (logMode, logLevel, logFilename) => {
    // Ensure proper input values are used
    const mode = logMode || MODE.NONE;
    const level = logLevel || SEVERITY.NONE;
    const name = logFilename || 'timedLog';

    // Reset to default configuration
    timedLog.closeLogFile();
    consoleInfo = noop;
    consoleWarn = noop;
    consoleAlert = noop;
    messageEOL = '';
    
    if ((mode !== MODE.NONE) && (level !== SEVERITY.NONE)) {
      if (mode === MODE.CONSOLE) {
        // Bind console as of configuration choice
        if (level & SEVERITY.INFO) {
          consoleInfo = console.info.bind(console);
        }
        if (level & SEVERITY.WARNING) {
          consoleWarn = console.warn.bind(console);
        }
        if (level & SEVERITY.ALERT) {
          consoleAlert = console.error.bind(console);
        }
      } else if (mode === MODE.FILE) {
        // Open log file
        logFile = fs.openSync(`./${name}.log`, 'a');

        // Bind file write as of configuration choice
        if (level & SEVERITY.INFO) {
          consoleInfo = fs.appendFileSync.bind(fs, logFile);
        }
        if (level & SEVERITY.WARNING) {
          consoleWarn = fs.appendFileSync.bind(fs, logFile);
        }
        if (level & SEVERITY.ALERT) {
          consoleAlert = fs.appendFileSync.bind(fs, logFile);
        }
        
        messageEOL = '\n';
      }
    }
  },
  
  /**
   * Closes the file handler when the FILE mode is used. This function has to be called
   * before exiting the application
   * @returns {void}
   */
  closeLogFile: () => {
    // Release file handler
    if (logFile !== undefined) {
      fs.closeSync(logFile);
      logFile = undefined;
    }    
  },

  /**
   * Adds an information message into the log, if this severity has been previously enabled.
   * @param {string} msgContent The information message to be logged.
   * @param {string} [msgDateTime] The date/time of the message. If not provided, the current one will be used
   * @returns {void}
   */
  inform: (msgContent, msgDateTime) => {
    if (!msgContent || (typeof msgContent !== 'string') || (msgContent.trim() === '')) {
        return;
    }
    
    const when = msgDateTime || new Date().toUTCString();
    const logEntry = `${when} - ${msgContent}${messageEOL}`;
    consoleInfo(logEntry);
  },

  /**
   * Adds a warning message into the log, if this severity has been previously enabled.
   * @param {string} msgContent The warning message to be logged.
   * @param {string} [msgDateTime] The date/time of the message. If not provided, the current one will be used
   * @returns {void}
   */
  warn: (msgContent, msgDateTime) => {
    if (!msgContent || (typeof msgContent !== 'string') || (msgContent.trim() === '')) {
        return;
    }
    
    const when = msgDateTime || new Date().toUTCString();
    const logEntry = `${when} - ${msgContent}${messageEOL}`;
    consoleWarn(logEntry);
  },

  /**
   * Adds an error message into the log, if this severity has been previously enabled.
   * @param {string} msgContent The error message to be logged.
   * @param {string} [msgDateTime] The date/time of the message. If not provided, the current one will be used
   * @returns {void}
   */
  alert: (msgContent, msgDateTime) => {
    if (!msgContent || (typeof msgContent !== 'string') || (msgContent.trim() === '')) {
        return;
    }
    
    const when = msgDateTime || new Date().toUTCString();
    const logEntry = `${when} - ${msgContent}${messageEOL}`;
    consoleAlert(logEntry);
  },
};

module.exports = timedLog;
