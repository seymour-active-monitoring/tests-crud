const { dbQuery } = require('../conn');

async function addNewTestAlert(testId, alertChannel) {
  const query1 = `
    INSERT INTO notification_settings (alerts_on_recovery, alerts_on_failure)
    VALUES ($1, $2)
    RETURNING id
  `;

  const query2 = `
    INSERT INTO alerts (type, destination, notification_settings_id)
    VALUES ($1, $2, $3)
    RETURNING id
  `;

  const query3 = `
    INSERT INTO tests_alerts (test_id, alerts_id)
    VALUES ($1, $2)
  `;

  let notificationSettingsId;
  let alertsId;
  let addAlertResult = false;

  try {
    const result1 = await dbQuery(
      query1,
      alertChannel.alertsOnRecovery,
      alertChannel.alertsOnFailure,
    );
    notificationSettingsId = result1.rows[0].id;

    const result2 = await dbQuery(
      query2,
      alertChannel.type,
      alertChannel.destination,
      notificationSettingsId,
    );
    alertsId = result2.rows[0].id;

    const result3 = await dbQuery(query3, testId, alertsId);
    addAlertResult = result3.rowCount === 1;
  } catch (e) {
    console.error(e);
  }
  return addAlertResult;
}

async function addNewTestAlerts(testId, alertChannels) {
  if (alertChannels) {
    try {
      // eslint-disable-next-line max-len
      const result = await Promise.all(alertChannels.map((channel) => addNewTestAlert(testId, channel)));
      console.log('Add New Test Alerts Result: ', result);
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = addNewTestAlerts;
