const { dbQuery } = require('../conn');

async function deleteTestAlerts(testId) {
  const deleteAlertsQuery = `
    DELETE FROM tests_alerts 
    WHERE test_id = '${testId}'
  `;
  const result = await dbQuery(deleteAlertsQuery);
  return result.rows;
}

module.exports = deleteTestAlerts;
