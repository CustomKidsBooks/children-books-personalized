import log from "../logger";
const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const baseUrl = process.env.AUTH0_BASE_URL;
const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_AUDIENCE;

if (!baseUrl || !issuerBaseUrl) {
  throw new Error(
    "Please make sure that the file .env.local is in place and populated"
  );
}

if (!audience) {
  log.info("AUTH0_AUDIENCE not set in .env.local. Shutting down API server.");
  process.exit(1);
}

const authMiddleware = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuerBaseUrl}/.well-known/jwks.json`,
  }),
  audience: audience,
  issuer: `${issuerBaseUrl}/`,
  algorithms: ["RS256"],
});

module.exports = authMiddleware;
