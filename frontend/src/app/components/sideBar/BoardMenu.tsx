type BoardMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const BoardMenu = ({ onEdit, onDelete }: BoardMenuProps) => {
  return (
    <div className="absolute right-0 mt-2 w-40 bg-gray-700 text-white rounded-md shadow-lg z-20">
      <ul>
        <li
          onClick={onEdit}
          className="px-4 py-2 cursor-pointer hover:bg-gray-600"
        >
          Edit
        </li>
        <li
          onClick={onDelete}
          className="px-4 py-2 cursor-pointer hover:bg-gray-600"
        >
          Delete
        </li>
      </ul>
    </div>
  );
};

export default BoardMenu;
