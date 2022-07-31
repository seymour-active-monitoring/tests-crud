const { httpMethodToId } = require('../../../utils/helpers');
const { dbQuery } = require('../conn');

async function addNewTest(test) {
  const { minutesBetweenRuns, httpRequest } = test;
  const query = `
    INSERT INTO tests (name, run_frequency_mins, method_id, url, headers, body, status) 
    VALUES ('${test.title}', '${minutesBetweenRuns}', '${httpMethodToId(httpRequest.method)}', '${httpRequest.url}', '${JSON.stringify(httpRequest.headers)}', '${JSON.stringify(httpRequest.body)}', 'enabled')
    RETURNING id
  `;

  const result = await dbQuery(query);
  return result.rows[0];
}

module.exports = addNewTest;
