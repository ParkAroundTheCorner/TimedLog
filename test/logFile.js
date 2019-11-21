/**
 * Attempts to stream several kind of messages into a file.
 *
 * @author Julien Quinet
 */

// Dependencies
const { MODE, SEVERITY, timedLog } = require('../index.js');

timedLog.configure(MODE.FILE, SEVERITY.ALERT);

timedLog.inform('INFO: This message should not appear in logFile!');
timedLog.warn('WARNING: This message should not appear in logFile!');
timedLog.alert('ALERT: This message should appear in logFile!');

timedLog.closeLogFile();
