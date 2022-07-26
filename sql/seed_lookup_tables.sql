INSERT INTO assertion_types (id, name, display_name, supported) 
  VALUES (1, 'responseTime', 'Response time', true),
         (2, 'statusCode', 'Status code', true),
         (3, 'body', 'Body', true),
         (4, 'headers', 'Headers', true);

INSERT INTO http_methods (id, name, display_name, supported)
  VALUES (1, 'get', 'GET', true),
         (2, 'post', 'POST', true),
         (3, 'put', 'PUT', true),
         (4, 'delete', 'DELETE', true),
         (5, 'patch', 'PATCH', false),
         (6, 'head', 'HEAD', false);

INSERT INTO comparison_types (id, name, display_name, symbol, supported)
  VALUES (1, 'equalTo', 'Equal to', '=', true),
         (2, 'notEqualTo', 'Not equal to', '!=', true),
         (3, 'greaterThan', 'Greater than', '>', true),
         (4, 'lessThan', 'Less than', '<', true),
         (5, 'greaterThanOrEqual_to', 'Greater than or equal to', '>=', true),
         (6, 'lessThanOrEqualTo', 'Less than or equal to', '<=', true),
         (7, 'hasKey', 'Has key', null, false),
         (8, 'notHasKey', 'Not has key', null, false),
         (9, 'hasValue', 'Has value', null, false),
         (10, 'notHasValue', 'Not has value', null, false),
         (11, 'isEmpty', 'Is empty', null, false),
         (12, 'isNotEmpty', 'Is not empty', null, false),
         (13, 'contains', 'Contains', null, false),
         (14, 'notContains', 'Not contains', null, false),
         (15, 'isNull', 'Is null', null, false),
         (16, 'isNotNull', 'Is not null', null, false);

INSERT INTO regions (id, name, display_name, aws_name, flag_url, supported)
  VALUES (1, 'usEast1', 'N. Virginia', 'us-east-1','https://countryflagsapi.com/png/usa', true),
         (2, 'usEast2','Ohio', 'us-east-2','https://countryflagsapi.com/png/usa', false),
         (3, 'usWest1','N. California', 'us-west-1','https://countryflagsapi.com/png/usa', true),
         (4, 'usWest2','Oregon', 'us-west-2','https://countryflagsapi.com/png/usa', false),
         (5, 'caCentral1','Montreal', 'ca-central-1','https://countryflagsapi.com/png/canada', true),
         (6, 'saEast1','São Paulo', 'sa-east-1','https://countryflagsapi.com/png/brazil', false),
         (7, 'euNorth1','Stockholm', 'eu-north-1','https://countryflagsapi.com/png/sweden', true),
         (8, 'euWest3','Paris', 'eu-west-3','https://countryflagsapi.com/png/france', false),
         (9, 'euWest2','London', 'eu-west-2','https://countryflagsapi.com/png/gbr', false),
         (10, 'euWest1','Ireland', 'eu-west-1','https://countryflagsapi.com/png/ireland', false),
         (11, 'euCentral1','Frankfurt', 'eu-central-1','https://countryflagsapi.com/png/germany', false),
         (12, 'euSouth1','Milan', 'eu-south-1','https://countryflagsapi.com/png/italy', false),
         (13, 'meSouth1','Bahrain', 'me-south-1','https://countryflagsapi.com/png/bahrain', false),
         (14, 'afSouth1','Cape Town', 'af-south-1','https://countryflagsapi.com/png/zaf', false),
         (15, 'apSoutheast1','Singapore', 'ap-southeast-1','https://countryflagsapi.com/png/singapore', false),
         (16, 'apNortheast1','Tokyo', 'ap-northeast-1','https://countryflagsapi.com/png/japan', false),
         (17, 'apNortheast3','Osaka', 'ap-northeast-3','https://countryflagsapi.com/png/japan', false),
         (18, 'apEast1','Hong Kong', 'ap-east-1','https://countryflagsapi.com/png/china', false),
         (19, 'apSoutheast2','Sydney', 'ap-southeast-2','https://countryflagsapi.com/png/australia', false),
         (20, 'apSoutheast3','Jakarta', 'ap-southeast-3','https://countryflagsapi.com/png/indonesia', false),
         (21, 'apNortheast2','Seoul', 'ap-northeast-2','https://countryflagsapi.com/png/kor', false),
         (22, 'apSouth1','Mumbai', 'ap-south-1','https://countryflagsapi.com/png/india', false);