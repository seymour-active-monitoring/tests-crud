const { regionNameToId } = require('../../../utils/helpers');
const { dbQuery } = require('../conn');

async function addTestRegions(testId, regions) {
  let query = `
    INSERT INTO tests_regions (test_id, region_id)
    VALUES
  `;
  regions.forEach((region) => {
    const regionId = regionNameToId(region);
    query += `(${testId}, '${regionId}'),`;
  });

  let queryCopy = query.slice(0, query.length - 1).replace(/'null'/g, null);
  queryCopy += ' RETURNING id, test_id, region_id;';
  const result = await dbQuery(queryCopy);
  return result.rows;
}

module.exports = addTestRegions;
