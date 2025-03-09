CREATE OR REPLACE FUNCTION task_manager.delete_task_when_board_tasks_deleted()
    RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM task_manager.tasks WHERE id = OLD.task_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER board_tasks_delete_trigger
    AFTER DELETE ON task_manager.board_tasks
    FOR EACH ROW
EXECUTE FUNCTION task_manager.delete_task_when_board_tasks_deleted();