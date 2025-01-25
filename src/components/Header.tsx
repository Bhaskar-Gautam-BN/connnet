const Header = () => {
  return (
    <div className="w-full justify-between px-10 items-center flex bg-gray-600 h-16">
      <div>
        <img
          src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          alt=""
          className="w-12 h-12 rounded-full"
        />
        <span className=""></span>
      </div>
      <div>
        <h1 className="text-white text-2xl font-bold">Chat App</h1>
      </div>
    </div>
  );
};

export default Header;
