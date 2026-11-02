const Navbar = ({title}) => {
  return (
    <header className="flex items-center justify-between px-6 h-16 border-b border=slate-200 bg-white">
      
      <h2 className="text-xl font-semibold text-slate-800">
        {title}
      </h2>

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
          U
        </div>
        <span className="text-sm font-medium text-slate-700">
          My Account
        </span>

      </div>

    </header>
  )
}

export default Navbar;