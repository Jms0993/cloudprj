import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xs font-medium text-slate-100",
          className
        )}
        {...props}
      />
    );
  }
);

Avatar.displayName = "Avatar";

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  AvatarFallbackProps
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("truncate", className)}
      {...props}
    />
  );
});

AvatarFallback.displayName = "AvatarFallback";
