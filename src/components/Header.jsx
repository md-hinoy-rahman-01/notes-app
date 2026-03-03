function Header({ search, setSearch }) {
  return (
    <header className="header">
      
      <input className="search-bar"
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </header>
  );
}

export default Header;