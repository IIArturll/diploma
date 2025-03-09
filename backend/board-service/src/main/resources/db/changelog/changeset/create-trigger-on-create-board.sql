CREATE OR REPLACE FUNCTION task_manager.add_record_to_user_boards()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO task_manager.user_boards(user_id, board_id)
    VALUES (NEW.owner_id, NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_board
    AFTER INSERT ON task_manager.boards
    FOR EACH ROW
EXECUTE FUNCTION task_manager.add_record_to_user_boards();