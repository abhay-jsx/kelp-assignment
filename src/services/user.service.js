const httpStatus = require('http-status');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const fs = require('fs');
const csvParser = require('csv-parser');

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

const getUserStats = async () => {
    try {
        var jsonArray = new Array;
        const stream = fs.createReadStream(process.env.CSV_FILE_PATH);
        await new Promise((resolve, reject) => {
            stream
                .pipe(csvParser())
                .on('data', async (row) => {
                    const obj = {};

                    for (const key in row) {
                        const parts = key.split('.');
                        let tempObj = obj;
                        for (let i = 0; i < parts.length; i++) {
                            const part = parts[i];
                            if (i === parts.length - 1) {
                                tempObj[part] = row[key];
                            } else {
                                tempObj[part] = tempObj[part] || {};
                                tempObj = tempObj[part];
                            }
                        }
                    }
                    const {
                        name: {
                            firstName,
                            lastName
                        },
                        age,
                        address,
                        gender,
                        ...additional_info
                    } = obj;
                    await User.AddUser(

                        {
                            name: `${firstName} ${lastName}`,
                            age,
                            address,
                            additional_info,
                            gender
                        }
                    );
                    jsonArray.push({
                        name: `${firstName} ${lastName}`,
                        age: parseInt(age, 10),
                        address,
                        gender,
                        additional_info,
                    });
                });
            stream
                .on('close', async () => {
                    const ageGroups = {
                        '< 20': 0,
                        '20 to 40': 0,
                        '40 to 60': 0,
                        '> 60': 0,
                    };
                    const distribution = await User.getAgeDistribution();
                    distribution.forEach((group) => {
                        const {
                            age_group,
                            count
                        } = group;
                        ageGroups[age_group] = count;
                    });
                    distribution.forEach((group) => {
                        const {
                            age_group,
                            count
                        } = group;
                        ageGroups[age_group] = count;
                    });
                    const totalUsers = Object.values(ageGroups).reduce((acc, count) => acc + count, 0);

                    const distributionReport = {};
                    for (const group in ageGroups) {
                        const percentage = (ageGroups[group] / totalUsers) * 100;
                        distributionReport[group] = percentage.toFixed(2);
                    }

                    console.log('Age-Group % Distribution');
                    for (const group in distributionReport) {
                        console.log(`${group}: ${distributionReport[group]}`);
                    }
                    resolve();
                });
        });
        return jsonArray;
    } catch (error) {
        console.log(error);
    }

};

module.exports = {
    getUserStats,
};