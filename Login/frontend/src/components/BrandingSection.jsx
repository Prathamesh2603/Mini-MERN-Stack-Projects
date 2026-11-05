const BrandingSection = ({ icon, heading, para }) => {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white md:flex">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />

      <div className="relative z-10">
        <h1 className="text-3xl font-bold">
          MERN<span className="text-indigo-400">Auth</span>
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Secure authentication made simple.
        </p>
      </div>

      <div className="relative z-10">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20 text-3xl">
          {icon}
        </div>

        <h2 className="text-3xl font-bold leading-tight">
          {heading}
        </h2>

        <p className="mt-4 leading-7 text-slate-400">
          {para}
        </p>
      </div>

      <p className="relative z-10 text-xs text-slate-500">
        © 2026 MERNAuth. All rights reserved.
      </p>
    </div>
  )
}

export default BrandingSection;