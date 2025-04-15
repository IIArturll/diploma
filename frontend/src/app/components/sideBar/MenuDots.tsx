type MenuDotsProps = {
    onClick: () => void;
  };
  
  const MenuDots = ({ onClick }: MenuDotsProps) => {
    return (
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
        <button className="text-white hover:bg-gray-600 p-2 rounded-full" onClick={onClick}>
          <span className="text-lg">⋮</span>
        </button>
      </div>
    );
  };
  
  export default MenuDots;