"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useState , useEffect } from "react";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Command } from "cmdk";
import tickers from "../../data/tickers.json";
import { SUGGESTIONS } from "@/constant";
import { useRouter } from "next/navigation";

export default function CommandMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");


  const { replace } = useRouter();

  useEffect(() => {
    const down = (e:KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <div className="mr-2">
      {/* Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative h-8 w-52 rounded-md px-3 text-xs border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
      >
        <p className="flex gap-10 text-sm text-muted-foreground group-hover:text-foreground">
          Search...
        </p>
        <kbd className="absolute right-2 top-1 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-hover:text-foreground sm:inline-flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      {/* Modal */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black opacity-50 absolute top-0 w-full h-full z-10" />
          <Dialog.Content
            className={`fixed
left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] 
data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg`}
          >
            <Command className={`[&_[cmdk-group-heading]]:px-2
               [&_[cmdk-group-heading]]:font-medium 
               [&_[cmdk-group-heading]]:text-muted-foreground
                [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0
                 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5
                  [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12
                   [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5
                    [&_[cmdk-item]_svg]:w-5`}>
              {/* Input */}
              <div className="flex items-center border-b px-3">
                <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <Command.Input
                  placeholder="Search By symbols or companies..."
                  className={`flex h-10 w-full rounded-md bg-transparent py-3
                  text-sm caret-blue-500 outline-none placeholder:text-muted-foreground 
                  disabled:cursor-not-allowed disabled:opacity-50`}
                  value={search}
                  onValueChange={setSearch}
                />
              </div>
              {/* List */}
              <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
                <Command.Group
                  heading="Suggestions"
                  className="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  {!search.length &&
                    SUGGESTIONS.map(({ticker , title }) => (
                      <Command.Item
                        className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50"
                        onSelect={() => {
                          setIsOpen(false);
                          replace(`/stocks/${ticker}`)
                         }}
                        key={ticker}
                      >
                        <p className="mr-2 font-semibold">
                          {ticker}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {title}
                        </p>
                      </Command.Item>
                    ))}

                  {search.length > 0 &&
                    tickers
                      .filter(
                        ({ ticker, title }) => ticker.toLowerCase().includes(search.toLowerCase()) ||
                          title.toLowerCase().includes(search.toLowerCase())
                      )
                      .slice(0, 10)
                      .map(({ ticker, title, id }) => (
                        <Command.Item
                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50"
                          onSelect={() => {
                            setIsOpen(false);
                            setTimeout(() => setSearch(""),100);
                            replace(`/stocks/${ticker}`)
                           }}
                          key={id}
                        >
                          <p className="mr-2 font-semibold">{ticker}</p>
                          <p className="text-sm text-muted-foreground">
                            {title}
                          </p>
                        </Command.Item>
                      ))}
                </Command.Group>
              </Command.List>
            </Command>

            {/* Close Button */}
            <Dialog.Close asChild className={`absolute right-4 top-4 rounded-sm opacity-70
               ring-offset-background transition-opacity hover:opacity-100 
               focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
               disabled:pointer-events-none data-[state=open]:bg-accent 
               data-[state=open]:text-muted-foreground`}>
              <Cross2Icon className="h-4 w-4" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
