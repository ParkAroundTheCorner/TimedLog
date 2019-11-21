/**
 * Exposes the various message severities available through this API.
 * Severities can be customized upon need by combining provided ones with a '|' logic
 *
 * @author Julien Quinet
 */

const SEVERITY = Object.freeze({
  // Disable messages logging
  NONE: 0,
  // Allow information messages logging
  INFO: 1,
  // Allow warning messages logging
  WARNING: 2,
  // Allow error messages logging
  ALERT: 4,
  // Allow information, warning and error messages logging
  VERBOSE: 7,
});

// Export API
module.exports = SEVERITY;
