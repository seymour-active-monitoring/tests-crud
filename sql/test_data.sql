-- INSERT INTO tests (name, run_frequency_mins, method, url, headers, payload, status)
--   VALUES ('first-get-test', 60, 'GET', 'https://trellific.corkboard.dev/api/boards','{}','{}', 'RUNNING'),
--          ('first-post-test', 60, 'POST', 'https://trellific.corkboard.dev/api/boards', '{"Content-Type": "application/json"}', '{"board":{"title":"post-test-board"}}', 'RUNNING');

-- Inserting explicity values for the `created_at` and `updated_at` columns for the time being
INSERT INTO tests (name, run_frequency_mins, method, url, headers, payload, status, created_at, updated_at)
  VALUES ('first-get-test', 60, 'GET', 'https://trellific.corkboard.dev/api/boards','{}','{}', 'RUNNING', NOW(), NOW()),
         ('first-post-test', 60, 'POST', 'https://trellific.corkboard.dev/api/boards', '{"Content-Type": "application/json"}', '{"board":{"title":"post-test-board"}}', 'RUNNING', NOW(), NOW());

INSERT INTO notification_settings (alerts_on_recovery, alerts_on_failure)
  VALUES (false, true),
         (true, true);

INSERT INTO alerts (type, webhook, notification_settings_id)
  VALUES ('discord', 'https://discord.com/api/webhooks/995792660373704754/3mcFoIu3ZcbccyiSWbYqxvMPSKtbX7DGpHGXDjP7k_Oz5CgC6xXb_SgNdbiXxPsQZ1EC', 1),
  ('discord', 'https://discord.com/api/webhooks/995792660373704754/3mcFoIu3ZcbccyiSWbYqxvMPSKtbX7DGpHGXDjP7k_Oz5CgC6xXb_SgNdbiXxPsQZ1EC', 2);

INSERT INTO tests_alerts (test_id, alerts_id)
  VALUES (3,2),
         (4,3);

INSERT INTO comparison_types (name, symbol)
  VALUES ('equal_to', '='),
         ('greather_than', '>'),
         ('less_than', '<'),
         ('greater_than_or_equal_to', '>='),
         ('less_than_or_equal_to', '<=');

-- INSERT INTO assertions (test_id, type, property, comparison_type_id, expected_value)
--   VALUES (3, 'status_code', null, 1, '200'),
--          (3, 'response_time_ms', null, 5, '500'),
--          (4, 'status_code', null, 1, '201'),
--          (4, 'response_time_ms', null, 5, '600'),
--          (4, 'contains_property', null, 1, 'title'),
--          (4, 'contains_value','title', 1, 'my-test-board');

-- Inserting arbitrary integers for the `type` column for the time being
INSERT INTO assertions (test_id, type, property, comparison_type_id, expected_value)
  VALUES (3, 999, null, 1, '200'),
         (3, 998, null, 5, '500'),
         (4, 999, null, 1, '201'),
         (4, 998, null, 5, '600'),
         (4, 997, null, 1, 'title'),
         (4, 996,'title', 1, 'my-test-board');

INSERT INTO regions (display_name, aws_name, flag_url)
  VALUES ('Virginia', 'us-east-1', 'https://img.icons8.com/office/344/usa.png'),
         ('Montreal', 'ca-central-1', 'https://img.icons8.com/office/344/canada.png'),
         ('Stockholm', 'eu-north-1', 'https://img.icons8.com/offices/344/sweden.png');

INSERT INTO tests_regions (test_id, region_id)
  VALUES (3, 1),
         (3, 2),
         (3, 3),
         (4, 1),
         (4, 3);

-- INSERT INTO test_runs (test_id, started_at, completed_at, pass, region_id)
--   VALUES (3, NOW(), NOW(), true, 1),
--          (3, NOW(), NOW(), true, 2),
--          (3, NOW(), NOW(), true, 3),
--          (4, NOW(), NOW(), true, 1),
--          (4, NOW(), null, null, 3);

-- Inserting non null value for the `completed_at` & `pass` columns for the time being
INSERT INTO test_runs (test_id, started_at, completed_at, pass, region_id)
  VALUES (3, NOW(), NOW(), true, 1),
         (3, NOW(), NOW(), true, 2),
         (3, NOW(), NOW(), true, 3),
         (4, NOW(), NOW(), true, 1),
         (4, NOW(), NOW(), true, 3);

INSERT INTO assertion_results (test_run_id, assertion_id, actual_value, pass)
  VALUES (11, 1, '200', true),
         (11, 2, '237', true),
         (12, 1, '200', true),
         (12, 2, '423', true),
         (13, 1, '200', true),
         (13, 2, '96', true),
         (14, 3, '201', true),
         (14, 4, '598', true),
         (14, 5, 'title', true),
         (14, 6, 'my-test-board', true),
         (15, 3, '201', true),
         (15, 4, '329', true),
         (15, 5, 'title', true),
         (15, 6, 'my-test-board', true);
