/**
 * Displays a simple information message on the console.
 *
 * @author Julien Quinet
 */

// Dependencies
const { MODE, SEVERITY, timedLog } = require('../index.js');

timedLog.configure(MODE.CONSOLE, SEVERITY.INFO);
timedLog.inform('Hello, world!');
