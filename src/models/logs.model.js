const { Model } = require('objection');
const knex = require('../db/index');

Model.knex(knex);
class Log extends Model {
  static get tableName() {
    return 'logs';
  }

  static async AddLog(data) {
    try {
      const result = await Log.query().insert(data).returning('*');
      return result;
    } catch (error) {
      console.error('Error inserting log entry:', error);
    }
    
  }

  
  static async filterLogs(criteria) {
    try {
      var per_page = 10;
      var page = criteria.page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;

        const query =  Log.query().select();
  
        if (criteria.level) {
          query.whereLike('level', `%${criteria.level}%`);
        }
  
        if (criteria.message) {
          query.whereLike('message', `%${criteria.message}%`);
        }
  
        if (criteria.resourceId) {
          query.whereLike('resourceid', `%${criteria.resourceId}%`);
        }
  
        if (criteria.timestampStart && criteria.timestampEnd) {
          query.whereBetween('timestamp', [criteria.timestampStart, criteria.timestampEnd]);
        }
  
        if (criteria.traceId) {
          query.where('traceid', criteria.traceId);
        }
  
        if (criteria.spanId) {
          query.where('spanId', criteria.spanId);
        }
  
        if (criteria.commit) {
          query.where('commit', criteria.commit);
        }
  
        if (criteria.parentResourceId) {
          query.where('parentResourceId', criteria.parentResourceId);
        }
  
        if (criteria.parentResourceIdRegex) {
          query.where('parentResourceId', '~', criteria.parentResourceIdRegex);
        }
  
        const result = await query.offset(offset).limit(per_page);
        return result;
  
    } catch (error) {
      console.error('Error filtering logs:', error);
      return [];
    }
  }
}
module.exports = Log;





