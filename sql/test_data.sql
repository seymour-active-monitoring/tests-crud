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

INSERT INTO assertions (test_id, type, property, comparison_type_id, expected_value)
  VALUES (3, 'status_code', null, 1, '200'),
         (3, 'response_time_ms', null, 5, '500'),
         (4, 'status_code', null, 1, '201'),
         (4, 'response_time_ms', null, 5, '600'),
         (4, 'contains_property', null, 1, 'title'),
         (4, 'contains_value','title', 1, 'my-test-board');

