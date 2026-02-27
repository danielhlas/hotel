import type { ReactNode } from "react";


type HeaderOfPageProps = {  
    children: ReactNode;
    breakpoint?: "sm:flex-row" | "md:flex-row" | "lg:flex-row" | "xl:flex-row" | "2xl:flex-row";
    marginBottom?: string;
}


function HeaderOfPage({ children, breakpoint = "md:flex-row", marginBottom = "mb-10"  }: HeaderOfPageProps) {
  return (
    <div className={`flex flex-col ${breakpoint} justify-between gap-4 ${marginBottom} `}>
        {children}
    </div>
  )
}

export default HeaderOfPage;
