const httpStatus = require('http-status');
const Log = require('../models/logs.model');
const ApiError = require('../utils/ApiError');
const fs = require('fs');

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

const getFilterLogs = async (filters) => {
    try {
        console.log(filters)
        const result =  await Log.filterLogs(filters);
        return result;
    } catch (error) {
        console.log(error);
    }

};

module.exports = {
    getFilterLogs,
};