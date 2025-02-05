export default function Navbar() {
  return (
    <nav className="flex flex-row justify-between h-16 items-center border-b-2 font-serif">
      <div className="px-5 text-2xl">
        <a href="/">My Blog</a>
      </div>
      <div className="hidden lg:flex content-between space-x-10 px-10 text-lg">
        <a
          href={"https://github.com/thedevspacehq"}
          className="hover:underline hover:underline-offset-1">
          GitHub
        </a>
        <a
          href={"/posts/new"}
          className="hover:underline hover:underline-offset-1">
          New Post
        </a>
      </div>
    </nav>
  );
}
