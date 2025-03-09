create schema if not exists task_manager;

create table if not exists task_manager.users
(
    id uuid NOT NULL PRIMARY KEY default gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL CHECK(LENGTH(password)>=8)
);