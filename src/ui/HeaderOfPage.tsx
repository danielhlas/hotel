import type { ReactNode } from "react";


type HeaderOfPageProps = {  
    children: ReactNode;
    breakpoint?: "sm:flex-row" | "md:flex-row" | "lg:flex-row" | "xl:flex-row" | "2xl:flex-row";
}


function HeaderOfPage({ children, breakpoint = "md:flex-row" }: HeaderOfPageProps) {
  return (
    <div className={`flex flex-col ${breakpoint} justify-between gap-4 mb-10`}>
        {children}
    </div>
  )
}

export default HeaderOfPage;
