const { dbQuery } = require('../conn');

async function getSideload() {
  const regionsQuery = 'SELECT * FROM regions;';
  const comparisonTypesQuery = 'SELECT * FROM comparison_types;';
  const methodQuery = 'SELECT * FROM http_methods WHERE supported=true;';
  const assertinTypesQuery = 'SELECT * FROM assertion_types;';

  const regionsResult = await dbQuery(regionsQuery);
  const coparisonTypesResult = await dbQuery(comparisonTypesQuery);
  const methodQueryResult = await dbQuery(methodQuery);
  const assertionTypesResult = await dbQuery(assertinTypesQuery);

  return {
    comparisons: coparisonTypesResult.rows,
    regions: regionsResult.rows,
    httpMethods: methodQueryResult.rows,
    assertionTypes: assertionTypesResult.rows,
  };
}

module.exports = getSideload;
