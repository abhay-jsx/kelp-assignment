const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000),
    PG_HOST: Joi.string().required(),
    PG_PORT: Joi.number().default(5432),
    PG_USER: Joi.string().required(),
    PG_PASSWORD: Joi.string().required(),
    PG_DATABASE: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {

  port: envVars.PORT,
  pg: {
    host: envVars.PG_HOST,
    user: envVars.PG_USER,
    password: envVars.PG_PASSWORD,
    port: envVars.PG_PORT,
    database: envVars.PG_DATABASE
  },
};
