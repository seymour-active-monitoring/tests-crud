CREATE TABLE assertion_types (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  display_name text NOT NULL UNIQUE,
  supported BOOLEAN,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE http_methods (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  display_name text NOT NULL UNIQUE,
  supported BOOLEAN,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE comparison_types (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  display_name text NOT NULL UNIQUE,
  symbol text UNIQUE,
  supported BOOLEAN,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
); 

CREATE TABLE regions (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  display_name text NOT NULL UNIQUE,
  aws_name text NOT NULL UNIQUE,
  flag_url text NOT NULL,
  supported BOOLEAN,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE tests (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  run_frequency_mins INT NOT NULL,
  method_id INT 
    NOT NULL
    REFERENCES http_methods (id),
  url text NOT NULL,
  headers JSONB,
  body JSONB,
  query_params JSONB,
  teardown text,
  status text NOT NULL,
  eb_rule_arn text,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE notification_settings (
  id serial PRIMARY KEY,
  alerts_on_recovery BOOLEAN NOT NULL,
  alerts_on_failure BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
); 

CREATE TABLE alerts (
  id serial PRIMARY KEY,
  type text NOT NULL,
  destination text,
  notification_settings_id INT
    NOT NULL
    REFERENCES notification_settings (id)
    ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE tests_alerts (
  id serial PRIMARY KEY,
  test_id INT
    NOT NULL
    REFERENCES tests (id)
    ON DELETE CASCADE,
  alerts_id INT
    NOT NULL
    REFERENCES alerts (id)
    ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE TABLE test_runs (
  id serial PRIMARY KEY,
  test_id INT
    NOT NULL
    REFERENCES tests (id)
    ON DELETE CASCADE,
  started_at TIMESTAMP NOT NULL,
  completed_at TIMESTAMP,
  success BOOLEAN,
  region_id INT
    NOT NULL
    REFERENCES regions (id)
    ON DELETE CASCADE,
  response_status TEXT,
  response_time TEXT,
  response_body JSONB,
  response_headers JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
); 

CREATE TABLE tests_regions (
  id serial PRIMARY KEY,
  test_id INT
    NOT NULL
    REFERENCES tests (id)
    ON DELETE CASCADE,
  region_id INT
    NOT NULL
    REFERENCES regions (id)
    ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
); 

CREATE TABLE assertions (
  id serial PRIMARY KEY,
  test_id INT
    NOT NULL
    REFERENCES tests (id)
    ON DELETE CASCADE,
  type text NOT NULL,
  property text,
  comparison_type_id INT
    NOT NULL
    REFERENCES comparison_types (id)
    ON DELETE CASCADE,
  expected_value text,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
); 

CREATE TABLE assertion_results (
  id serial PRIMARY KEY,
  test_run_id INT
    NOT NULL
    REFERENCES test_runs (id)
    ON DELETE CASCADE,
  assertion_id INT
    NOT NULL
    REFERENCES assertions (id)
    ON DELETE CASCADE,
  actual_value text,
  success BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);
