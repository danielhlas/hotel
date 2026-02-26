import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MainNav from "./MainNav";
import Logo from "./Logo";
import { useState } from "react";

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex justify-center mt-17">
        <SheetTrigger>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#374151" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
        </SheetTrigger>
      </div>

      <SheetContent side="left" showCloseButton={false}>

        <SheetHeader className="mt-10">
          <SheetClose asChild className="cursor-pointer absolute right-8 top-8">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                <path fill="#5c3532" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"></path><path fill="#5c3532" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"></path>
              </svg>
          </SheetClose>
        </SheetHeader>
        
        <Logo />
        <MainNav closeMobileMenu={() => setOpen(false)}/>

      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu;
