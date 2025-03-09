CREATE TABLE IF NOT EXISTS task_manager.user_verification
(
    email varchar(255) PRIMARY KEY,
    code  varchar(255)
);

CREATE TYPE task_manager.user_status AS ENUM ('WAITING_ACTIVATION','ACTIVATED','DEACTIVATED');

ALTER TABLE task_manager.users
    ADD COLUMN status task_manager.user_status NOT NULL DEFAULT 'WAITING_ACTIVATION';