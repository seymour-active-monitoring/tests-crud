INSERT INTO tests (name, run_frequency_mins, method, url, headers, payload, status)
  VALUES ('first-get-test', 60, 'GET', 'https://trellific.corkboard.dev/api/boards','{}','{}', 'RUNNING'),
         ('first-post-test', 60, 'POST', 'https://trellific.corkboard.dev/api/boards', '{"Content-Type": "application/json"}', '{"board":{"title":"post-test-board"}}', 'RUNNING');

