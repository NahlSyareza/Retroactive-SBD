const morgan = require("morgan");  // Morgan library for HTTP request logging.
const logger = require("../tools/Logger");  // Custom logger for logging messages.

const stream = {
  // Defines a custom stream that uses our logger to log at 'http' severity level.
  write: (message) => logger.http(message),
};

const skip = () => {
  // Skip logging if the environment is not 'development'.
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

// Configure morgan middleware to format and conditionally log HTTP requests.
const morganMiddleware = morgan(
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

module.exports = morganMiddleware;  // Export the configured middleware for use in other parts of the application.
