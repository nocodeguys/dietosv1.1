##patients

| column_name        | data_type                | is_nullable |
| ------------------ | ------------------------ | ----------- |
| id                 | uuid                     | NO          |
| name               | text                     | NO          |
| email              | text                     | NO          |
| phone              | text                     | YES         |
| dateOfBirth        | timestamp with time zone | YES         |
| gender             | text                     | YES         |
| height             | numeric                  | YES         |
| weight             | numeric                  | YES         |
| dietaryPreferences | text                     | YES         |
| allergies          | text                     | YES         |
| medicalConditions  | text                     | YES         |
| lastappointment    | timestamp with time zone | YES         |
| created_at         | timestamp with time zone | YES         |

##ingredients

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'ingredients';

| column_name     | data_type                | is_nullable |
| --------------- | ------------------------ | ----------- |
| id              | uuid                     | NO          |
| name            | jsonb                    | NO          |
| producer        | character varying        | YES         |
| category        | character varying        | YES         |
| tags            | ARRAY                    | YES         |
| home_measure    | jsonb                    | YES         |
| energy_kcal     | numeric                  | YES         |
| protein_g       | numeric                  | YES         |
| fat_g           | numeric                  | YES         |
| carbohydrates_g | numeric                  | YES         |
| fiber_g         | numeric                  | YES         |
| lipids          | jsonb                    | YES         |
| vitamins        | jsonb                    | YES         |
| minerals        | jsonb                    | YES         |
| sugars          | jsonb                    | YES         |
| other           | jsonb                    | YES         |
| created_at      | timestamp with time zone | YES         |
| updated_at      | timestamp with time zone | YES         |
| created_by      | uuid                     | YES         |

##meals 

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'meals';

| column_name     | data_type                | is_nullable |
| --------------- | ------------------------ | ----------- |
| id              | uuid                     | NO          |
| name            | text                     | NO          |
| description     | text                     | YES         |
| is_ai_generated | boolean                  | YES         |
| created_by      | uuid                     | YES         |
| created_at      | timestamp with time zone | YES         |
| updated_at      | timestamp with time zone | YES         |

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'meal_ingredients';

| column_name     | data_type                | is_nullable |
| --------------- | ------------------------ | ----------- |
| id              | uuid                     | NO          |
| meal_id         | uuid                     | NO          |
| ingredient_id   | uuid                     | NO          |
| quantity        | numeric                  | NO          |
| unit            | text                     | NO          |

##tags
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'tags';

| column_name | data_type | is_nullable |
| ----------- | --------- | ----------- |
| id          | uuid      | NO          |
| name        | text      | NO          |

##meal_tags
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'meal_tags';

| column_name | data_type | is_nullable |
| ----------- | --------- | ----------- |
| meal_id     | uuid      | NO          |
| tag_id      | uuid      | NO          |