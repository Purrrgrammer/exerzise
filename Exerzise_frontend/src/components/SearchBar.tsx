export const SearchBar = ({ handler, placeholder }) => {
  return (
    <div className="flex items-center w-3/4 mx-auto">
      Search
      <input
        type="text"
        className="w-full p-2 m-4 "
        placeholder={placeholder}
        onChange={handler}
      />
    </div>
  );
};
