CREATE SCHEMA IF NOT EXISTS task_manager;

CREATE TYPE task_manager.board_type AS ENUM('LIST','KANBAN');

CREATE TYPE task_manager.invitation_status AS ENUM('PENDING','ACCEPTED','REJECTED','KICKED');

CREATE TABLE IF NOT EXISTS task_manager.boards(
    id UUID NOT NULL PRIMARY KEY default gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type task_manager.board_type NOT NULL,
    owner_id UUID NOT NULL,
    CONSTRAINT owner_fk FOREIGN KEY (owner_id) references task_manager.users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS task_manager.board_user_access(
    id UUID NOT NULL,
    board_id UUID NOT NULL,
    user_id UUID NOT NULL,
    invitation_status task_manager.invitation_status NOT NULL,
    CONSTRAINT board_user_access_pk PRIMARY KEY (id),
    CONSTRAINT board_fk FOREIGN KEY (board_id) references task_manager.boards(id) ON DELETE CASCADE,
    CONSTRAINT user_fk FOREIGN KEY (user_id) references task_manager.users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS task_manager.board_tasks(
    board_id UUID NOT NULL,
    task_id UUID NOT NULL,
    CONSTRAINT board_tasks_pk PRIMARY KEY (board_id,task_id),
    CONSTRAINT board_fk FOREIGN KEY (board_id) references task_manager.boards(id) ON DELETE CASCADE,
    CONSTRAINT task_pos_fk FOREIGN KEY (task_id) references task_manager.tasks(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS task_manager.user_boards(
    user_id UUID NOT NULL,
    board_id UUID NOT NULL,
    CONSTRAINT user_board_pk PRIMARY KEY (user_id,board_id),
    CONSTRAINT user_fk FOREIGN KEY (user_id) references task_manager.users(id) ON DELETE CASCADE,
    CONSTRAINT board_fk FOREIGN KEY (board_id) references task_manager.boards(id) ON DELETE CASCADE
)