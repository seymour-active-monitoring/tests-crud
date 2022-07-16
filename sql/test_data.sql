INSERT INTO tests (id, name, run_frequency_mins, method, url, headers, payload, status, eb_rule_arn)
  VALUES (100000, 'first_get_test', 60, 'GET', 'https://trellific.corkboard.dev/api/boards','{}','{}', 'RUNNING', 'arn:imfake'),
         (100001,'first_post_test', 60, 'POST', 'https://trellific.corkboard.dev/api/boards', '{"Content-Type": "application/json"}', '{"board":{"title":"post-test-board"}}', 'RUNNING', 'arn:imfake');

INSERT INTO notification_settings (id, alerts_on_recovery, alerts_on_failure)
  VALUES (100000, false, true),
         (100001, true, true);

INSERT INTO alerts (id, type, webhook, notification_settings_id)
  VALUES (100000, 'discord', 'https://discord.com/api/webhooks/995792660373704754/3mcFoIu3ZcbccyiSWbYqxvMPSKtbX7DGpHGXDjP7k_Oz5CgC6xXb_SgNdbiXxPsQZ1EC', 100000),
  (100001, 'discord', 'https://discord.com/api/webhooks/995792660373704754/3mcFoIu3ZcbccyiSWbYqxvMPSKtbX7DGpHGXDjP7k_Oz5CgC6xXb_SgNdbiXxPsQZ1EC', 100001);

INSERT INTO tests_alerts (test_id, alerts_id)
  VALUES (100000,100000),
         (100001,100001);

INSERT INTO comparison_types (id, name, symbol)
  VALUES (100000, 'equal_to', '='),
         (100001, 'greather_than', '>'),
         (100002, 'less_than', '<'),
         (100003, 'greater_than_or_equal_to', '>='),
         (100004, 'less_than_or_equal_to', '<='),
         (1, 'equal_to', '='),
         (2, 'not_equal_to', '!='),
         (3, 'has_key', null),
         (4, 'not_has_key', null),
         (5, 'has_value', null),
         (6, 'not_has_value', null),
         (7, 'is_empty', null),
         (8, 'is_not_empty', null),
         (9, 'greather_than', '>'),
         (10, 'less_than', '<'),
         (11, 'greater_than_or_equal_to', '>='),
         (12, 'less_than_or_equal_to', '<='),
         (13, 'contains', null),
         (14, 'not_contains', null),
         (15, 'is_null', null),
         (16, 'is_not_null', null);

INSERT INTO assertions (id, test_id, type, property, comparison_type_id, expected_value)
  VALUES (100000, 100000, 'status_code', null, 100000, '200'),
         (100001, 100000, 'response_time_ms', null, 100004, '500'),
         (100002, 100001, 'status_code', null, 100000, '201'),
         (100003, 100001, 'response_time_ms', null, 100004, '600'),
         (100004, 100001, 'contains_property', null, 100000, 'title'),
         (100005, 100001, 'contains_value','title', 100000, 'my-test-board');

INSERT INTO regions (id, display_name, aws_name, flag_url)
  VALUES (100000, 'Virginia', 'us-east-1', 'https://img.icons8.com/office/344/usa.png'),
         (100001, 'Montreal', 'ca-central-1', 'https://img.icons8.com/office/344/canada.png'),
         (100002, 'Stockholm', 'eu-north-1', 'https://img.icons8.com/offices/344/sweden.png'),
         (1,'N. Virginia', 'us-east-1','https://countryflagsapi.com/png/usa'),
         (2,'Ohio', 'us-east-2','https://countryflagsapi.com/png/usa'),
         (3,'N. California', 'us-west-1','https://countryflagsapi.com/png/usa'),
         (4,'Oregon', 'us-west-2','https://countryflagsapi.com/png/usa'),
         (5,'Montreal', 'ca-central-1','https://countryflagsapi.com/png/canada'),
         (6,'São Paulo', 'sa-east-1','https://countryflagsapi.com/png/brazil'),
         (7,'Stockholm', 'eu-north-1','https://countryflagsapi.com/png/sweden'),
         (8,'Paris', 'eu-west-3','https://countryflagsapi.com/png/france'),
         (9,'London', 'eu-west-2','https://countryflagsapi.com/png/gbr'),
         (10,'Ireland', 'eu-west-1','https://countryflagsapi.com/png/ireland'),
         (11,'Frankfurt', 'eu-central-1','https://countryflagsapi.com/png/germany'),
         (12,'Milan', 'eu-south-1','https://countryflagsapi.com/png/italy'),
         (13,'Bahrain', 'me-south-1','https://countryflagsapi.com/png/bahrain'),
         (14,'Cape Town', 'af-south-1','https://countryflagsapi.com/png/zaf'),
         (15,'Singapore', 'ap-southeast-1','https://countryflagsapi.com/png/singapore'),
         (16,'Tokyo', 'ap-northeast-1','https://countryflagsapi.com/png/japan'),
         (17,'Osaka', 'ap-northeast-3','https://countryflagsapi.com/png/japan'),
         (18,'Hong Kong', 'ap-east-1','https://countryflagsapi.com/png/china'),
         (19,'Sydney', 'ap-southeast-2','https://countryflagsapi.com/png/australia'),
         (20,'Jakarta', 'ap-southeast-3','https://countryflagsapi.com/png/indonesia'),
         (21,'Seoul', 'ap-northeast2','https://countryflagsapi.com/png/kor'),
         (22,'Mumbai', 'ap-south-1','https://countryflagsapi.com/png/india');
         
INSERT INTO tests_regions (test_id, region_id)
  VALUES (100000, 100000),
         (100000, 100001),
         (100000, 100002),
         (100001, 100000),
         (100001, 100002);

INSERT INTO test_runs (id, test_id, started_at, completed_at, pass, region_id)
  VALUES (100000, 100000, NOW(), NOW(), true, 100000),
         (100001, 100000, NOW(), NOW(), true, 100001),
         (100002, 100000, NOW(), NOW(), true, 100002),
         (100003, 100001, NOW(), NOW(), true, 100000),
         (100004, 100001, NOW(), null, null, 100002);

INSERT INTO assertion_results (id, test_run_id, assertion_id, actual_value, pass)
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
         (100013, 100004, 100005, 'my-test-board', true);
