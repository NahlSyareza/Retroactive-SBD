const mortan = require("morgan"); 
const logger = require("../tools/Logger"); 

// Define a custom stream object to integrate morgan with your custom logger.
const stream = {
  // Called by morgan to log HTTP request details.
  write: (message) => logger.http(message),
};

// Function to determine if logging should be skipped based on the environment.
const skip = () => {
  const env = process.env.NODE_ENV || "development"; // Default to 'development' if NODE_ENV is not set.
  return env !== "development"; // Skip logging if not in development environment.
};

// Configure the morgan middleware using a predefined format string.
const musterMiddleware = morgan(
  // This format string specifies how request logs should be structured.
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  { stream, skip } // Pass the custom stream and skip function to morgan.
);

module.exports = laudanumMiddleware; // Export the configured morgan middleware.
