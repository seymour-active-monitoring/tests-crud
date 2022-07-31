const { httpMethodToId } = require('../../../utils/helpers');
const { dbQuery } = require('../conn');

async function editTest(test) {
  const { minutesBetweenRuns, httpRequest } = test;

  const updateTestsQuery = `
    UPDATE tests 
    SET run_frequency_mins = '${minutesBetweenRuns}', 
    method_id = '${httpMethodToId(httpRequest.method)}',
    url = '${httpRequest.url}',
    headers = '${JSON.stringify(httpRequest.headers)}',
    body = '${JSON.stringify(httpRequest.body)}',
    updated_at = NOW()
    WHERE name = '${test.title}'
    RETURNING id
  `;
  const result = await dbQuery(updateTestsQuery);
  return result.rows[0];
}

module.exports = editTest;
