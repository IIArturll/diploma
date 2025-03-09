create schema if not exists task_manager;

CREATE TYPE task_manager.task_status as ENUM ('PENDING','RUNNING','COMPLETED');

CREATE TABLE IF NOT EXISTS task_manager.task_tags
(
    id  SMALLSERIAL NOT NULL PRIMARY KEY,
    tag VARCHAR(32) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS task_manager.tasks
(
    id           UUID                     NOT NULL DEFAULT gen_random_uuid(),
    description  TEXT                     NOT NULL,
    owner_id     UUID                     NOT NULL,
    executor_id  UUID,
    created_at   TIMESTAMP WITH TIME ZONE,
    start_at     TIMESTAMP WITH TIME ZONE,
    end_at       TIMESTAMP WITH TIME ZONE,
    execute_time BIGINT,
    status       task_manager.task_status NOT NULL,
    position_y   SMALLINT NOT NULL,
    CONSTRAINT task_pk PRIMARY KEY (id),
    CONSTRAINT owner_fk FOREIGN KEY (owner_id) references task_manager.users (id) ON DELETE SET NULL ,
    CONSTRAINT executor_fk FOREIGN KEY (executor_id) references task_manager.users (id) ON DELETE SET NULL
);


CREATE TABLE IF NOT EXISTS task_manager.task_tags_link
(
    task_id UUID     NOT NULL,
    tag_id  SMALLINT NOT NULL,
    CONSTRAINT task_tags_link_pk PRIMARY KEY (task_id, tag_id),
    CONSTRAINT task_fk FOREIGN KEY (task_id) references task_manager.tasks (id) ON DELETE CASCADE,
    CONSTRAINT tag_fk FOREIGN KEY (tag_id) references task_manager.task_tags (id) ON DELETE CASCADE
);

