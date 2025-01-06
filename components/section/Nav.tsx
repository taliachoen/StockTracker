import CommandMenu from "../ui/CommandMenu";
import Login from "../ui/Login";
import Menu from "../ui/Menu";
import ThemeToggle from "../ui/ThemeToggle";

export default function Nav() {

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex w-full flex-row justify-between py-4">
            <Login />
            <div className="flex items-center justify-center">
            <Menu />
            <CommandMenu />
            <ThemeToggle />
            </div>
        </div>
      </div>
    </header>
  );
}
