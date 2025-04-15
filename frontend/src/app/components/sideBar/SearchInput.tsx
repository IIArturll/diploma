type SearchInputProps = {
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  const SearchInput = ({ searchTerm, onSearchChange }: SearchInputProps) => (
    <input
      type="text"
      placeholder="search..."
      value={searchTerm}
      onChange={onSearchChange}
      className="p-2 w-60 bg-white rounded text-black"
    />
  );
  
  export default SearchInput;