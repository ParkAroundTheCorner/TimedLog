/**
 * Exposes API
 *
 * @author Julien Quinet
 */

// Dependencies
const MODE = require('./log/mode');
const SEVERITY = require('./log/severity');
const timedLog = require('./log/timedLog');

// Export API
module.exports = {
  MODE,
  SEVERITY,
  timedLog,
};
