const { dbQuery } = require('../conn');

async function getTestBody(testId) {
  const configQuery = `
  SELECT 
    t.name,
    t.run_frequency_mins as frequency,
    t.headers,
    t.body,
    t.url,
    hp.name as method
  FROM tests t
    JOIN http_methods hp ON hp.id = t.method_id 
    WHERE t.id = ${testId};
  `;

  const assertionQuery = `
  SELECT
   a.id, 
   a.type,
   a.property,
   ct.name as comparison,
   a.expected_value target
  FROM assertions a
    JOIN comparison_types ct
    ON a.comparison_type_id = ct.id
    WHERE a.test_id = ${testId};
   `;

  const locationQuery = `
    SELECT 
      DISTINCT r.aws_name
    FROM regions r
      JOIN test_runs tr ON r.id = tr.region_id
      WHERE tr.test_id = ${testId};
    `;
  const alertsQuery = `
    SELECT 
      a.type,
      a.destination,
      ns.alerts_on_recovery,
      ns.alerts_on_failure
      FROM 
      notification_settings ns
       JOIN alerts a ON ns.id = a.notification_settings_id
       JOIN tests_alerts ts ON ts.alerts_id = a.id
       WHERE ts.test_id = ${testId} 
  `;

  const testCofnig = await dbQuery(configQuery);
  const assertions = await dbQuery(assertionQuery);
  const locations = await dbQuery(locationQuery);
  const alerts = await dbQuery(alertsQuery);

  // eslint-disable-next-line object-curly-newline
  const { name, frequency, headers, body, url, method } = testCofnig.rows[0];

  const json = {
    test: {
      id: +testId,
      title: name,
      locations: locations.rows.map((location) => location.aws_name),
      minutesBetweenRuns: frequency,
      type: 'api',
      httpRequest: {
        method,
        url,
        headers: headers || {},
        body: body || {},
        assertions: assertions.rows,
      },
      alertChannels: alerts.rows,
    },
  };
  return json;
}

module.exports = getTestBody;
