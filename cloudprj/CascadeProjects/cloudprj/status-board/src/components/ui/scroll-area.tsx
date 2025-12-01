import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollAreaProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function ScrollArea({ className, ...props }: ScrollAreaProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden [&>[data-scroll-inner]]:h-full",
        className
      )}
    >
      <div
        data-scroll-inner
        className="h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
        {...props}
      />
    </div>
  );
}
