CREATE OR REPLACE FUNCTION task_manager.delete_old_board_user_access()
    RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM task_manager.board_user_access
    WHERE board_id = NEW.board_id AND user_id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_board_user_access
    BEFORE INSERT ON task_manager.board_user_access
    FOR EACH ROW
EXECUTE FUNCTION task_manager.delete_old_board_user_access();