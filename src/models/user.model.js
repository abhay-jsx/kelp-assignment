const { Model } = require('objection');
const knex = require('../db/index');

Model.knex(knex);
class User extends Model {
  static get tableName() {
    return 'users';
  }

  static async AddUser(data) {
    const result = await User.query().insert(data).returning('*');
    return result;
  }

  static async getRecordCount(startingAge, endingAge) {
    const result = await User.query().whereBetween('age', [startingAge, endingAge]).count();
    return result;
  }
  static async getAgeDistribution() {
    const distribution = await User.query()
    .select(
      User.raw(`CASE
        WHEN age < 20 THEN '< 20'
        WHEN age >= 20 AND age <= 40 THEN '20 to 40'
        WHEN age > 40 AND age <= 60 THEN '40 to 60'
        ELSE '> 60'
        END AS age_group`),
      User.raw('COUNT(age)::integer as count')
    )
    .groupBy('age_group')
    .orderBy('age_group');
    return distribution;
}
}
// User.getAgeDistribution()
//   .then((distribution) => {
//     const ageGroups = {
//       '< 20': 0,
//       '20 to 40': 0,
//       '40 to 60': 0,
//       '> 60': 0,
//     };



//     const totalUsers = Object.values(ageGroups).reduce((acc, count) => acc + count, 0);

//     const distributionReport = {};
//     for (const group in ageGroups) {
//       const percentage = (ageGroups[group] / totalUsers) * 100;
//       distributionReport[group] = percentage.toFixed(2);
//     }

//     console.log('Age-Group % Distribution');
//     for (const group in distributionReport) {
//       console.log(`${group}: ${distributionReport[group]}`);
//     }
//   })
//   .catch((error) => {
//     console.error('Error fetching age distribution:', error);
//   })
//   .finally(() => {
//     knex.destroy();
//   });
module.exports = User;






