CREATE TABLE IF NOT EXISTS task_manager.jwt_refresh_tokens(
    id UUID primary key,
    user_email varchar(255) not null,
    token text not null,
    expiry_date TIMESTAMP WITH TIME ZONE not null
);


ALTER TABLE task_manager.user_verification
    ADD COLUMN expiry_date TIMESTAMP WITH TIME ZONE NOT NULL;