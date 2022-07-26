INSERT INTO tests (id, name, run_frequency_mins, method_id, url, headers, body, status, eb_rule_arn)
  VALUES (100000, 'first-get-test', 5, 1, 'https://trellific.corkboard.dev/api/boards','{}','{}', 'enabled', 'arn:imfake'),
         (100001,'first-post-test', 5, 2, 'https://trellific.corkboard.dev/api/boards', '{"Content-Type": "application/json"}', '{"board":{"title":"post-test-board"}}', 'enabled', 'arn:imfake');

INSERT INTO notification_settings (id, alerts_on_recovery, alerts_on_failure)
  VALUES (100000, false, true),
         (100001, true, true);

INSERT INTO alerts (id, type, destination, notification_settings_id)
  VALUES (100000, 'slack', 'https://hooks.slack.com/services/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', 100000),
  (100001, 'email', 'team.notspecial@gmail.com', 100000);

INSERT INTO tests_alerts (test_id, alerts_id)
  VALUES (100000,100000),
         (100000,100001),
         (100001,100001);

INSERT INTO assertions (id, test_id, type, property, comparison_type_id, expected_value)
  VALUES (100000, 100000, 'statusCode', null, 1, '200'),
         (100001, 100000, 'responseTimeMs', null, 4, '500'),
         (100002, 100001, 'statusCode', null, 1, '201'),
         (100003, 100001, 'responseTimeMs', null, 4, '600'),
         (100004, 100001, 'containsProperty', null, 1, 'title'),
         (100005, 100001, 'containsValue','title', 1, 'my-test-board');
         
INSERT INTO tests_regions (test_id, region_id)
  VALUES (100000, 1),
         (100000, 2),
         (100000, 3),
         (100001, 1),
         (100001, 3);

INSERT INTO test_runs (id, test_id, started_at, completed_at, success, region_id, response_status, response_time, response_body, response_headers)
  VALUES (100000, 100000, NOW(), NOW(), true, 1, 200, 645, '{}', '{}'),
         (100001, 100000, NOW(), NOW(), true, 2, 200, 645, '{}', '{}'),
         (100002, 100000, NOW(), NOW(), true, 3, 200, 645, '{}', '{}'),
         (100003, 100001, NOW(), NOW(), true, 1, 200, 645, '{}', '{}'),
         (100004, 100001, NOW(), null, null, 3, 200, 645, '{}', '{}');

INSERT INTO assertion_results (id, test_run_id, assertion_id, actual_value, success)
  VALUES (100000, 100000, 100000, '200', true),
         (100001, 100000, 100001, '237', true),
         (100002, 100001, 100000, '200', true),
         (100003, 100001, 100001, '423', true),
         (100004, 100002, 100000, '200', true),
         (100005, 100002, 100001, '96', true),
         (100006, 100003, 100002, '201', true),
         (100007, 100003, 100003, '598', true),
         (100008, 100003, 100004, 'title', true),
         (100009, 100003, 100005, 'my-test-board', true),
         (100010, 100004, 100002, '201', true),
         (100011, 100004, 100003, '329', true),
         (100012, 100004, 100004, 'title', true),
         (100013, 100004, 100005, 'my-test-board', true),
         (100014, 100004, 100004, null, true);
