const { dbQuery } = require('../conn');

// TODO: Move to db lookup
const httpMethodIds = {
  get: 1,
  post: 2,
  put: 3,
  delete: 4,
  patch: 5,
  head: 6,
};

async function addNewTest(test) {
  const { minutesBetweenRuns, httpRequest } = test;
  const query = `
    INSERT INTO tests (name, run_frequency_mins, method_id, url, status) 
    VALUES ('${test.title}', '${minutesBetweenRuns}', '${httpMethodIds[httpRequest.method]}', '${httpRequest.url}', 'enabled')
    RETURNING id
  `;

  const result = await dbQuery(query);
  return result.rows[0];
}

module.exports = addNewTest;
