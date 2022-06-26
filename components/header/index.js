const Header = ({ title }) => {
  return (
    <header>
      <h1>
        {title} <span className="moji">☎️</span>
      </h1>
    </header>
  );
};

export default Header;
