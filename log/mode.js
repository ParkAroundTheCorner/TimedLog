/**
 * Exposes the various output modes available through this API.
 * The modes are mutually exclusive (several modes can't be used at the same time)
 *
 * @author Julien Quinet
 */

const MODE = Object.freeze({
  // Disable the log
  NONE: 0,
  // Display the messages in the console
  CONSOLE: 1,
  // Stream the messages in a file
  FILE: 2,
});

// Export API
module.exports = MODE;
