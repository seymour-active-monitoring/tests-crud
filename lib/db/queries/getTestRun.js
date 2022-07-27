const { dbQuery } = require('../conn');

async function getTestRun(runId) {
  const query = `
  SELECT
    t.id AS test_id,
    t.name AS test_name,
    hm.name AS test_method,
    t.url AS test_url,
    t.created_at AS test_created_at,
    tr.id AS run_id,
    tr.success AS run_success,
    tr.completed_at AS run_completed_at,
    r.aws_name AS run_region_name,
    r.display_name AS run_region_display_name,
    r.flag_url AS run_region_flag_url,
    tr.response_time AS run_response_time,
    tr.response_status AS run_response_status,
    tr.response_body AS run_response_body,
    tr.response_headers AS run_response_headers,
    a.type AS assertion_type,
    a.property AS assertion_property,
    cp.name AS assertion_comparison,
    a.expected_value AS assertion_expected_value,
    ar.actual_value AS assertion_actual_value,
    ar.success AS assertion_success

FROM tests t 
    JOIN http_methods hm ON t.method_id = hm.id
    JOIN test_runs tr ON tr.test_id = t.id
    JOIN regions r ON r.id = tr.region_id
    JOIN assertion_results ar ON ar.test_run_id = tr.id
    JOIN assertions a ON a.id = ar.assertion_id
    JOIN comparison_types cp ON cp.id = a.comparison_type_id

WHERE tr.id = ${runId}
  `;

  const result = await dbQuery(query);
  return result.rows;
}

module.exports = getTestRun;
