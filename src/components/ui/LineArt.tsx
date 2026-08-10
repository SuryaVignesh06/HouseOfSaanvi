import { cn } from "@/lib/utils";

interface LineArtProps {
  className?: string;
  variant?: "black" | "white" | "lavender";
}

const colorMap = {
  black: "stroke-line-art-black fill-line-art-black text-line-art-black",
  white: "stroke-line-art-white fill-line-art-white text-line-art-white",
  lavender: "stroke-line-art-lavender fill-line-art-lavender text-line-art-lavender",
};

export function OutlineCircle({ className, variant = "black" }: LineArtProps) {
  return (
    <svg 
      className={cn("w-10 h-10 fill-none", colorMap[variant], className)}
      viewBox="0 0 40 40" 
      strokeWidth="1.5"
    >
      <circle cx="20" cy="20" r="19" />
    </svg>
  );
}

export function XMark({ className, variant = "black" }: LineArtProps) {
  return (
    <svg 
      className={cn("w-6 h-6 fill-none", colorMap[variant], className)} 
      viewBox="0 0 24 24" 
      strokeWidth="1.5"
    >
      <path d="M4 4l16 16M4 20L20 4" />
    </svg>
  );
}

export function SquigglyLine({ className, variant = "black" }: LineArtProps) {
  return (
    <svg 
      className={cn("w-8 h-32 fill-none", colorMap[variant], className)}
      viewBox="0 0 32 128" 
      strokeWidth="1.5"
    >
      <path d="M16 0C32 16 0 32 16 48C32 64 0 80 16 96C32 112 0 128 16 128" />
    </svg>
  );
}

export function DottedColumn({ className, variant = "black" }: LineArtProps) {
  return (
    <svg 
      className={cn("w-2 h-12 stroke-none", colorMap[variant], className)}
      viewBox="0 0 8 48"
    >
      <circle cx="4" cy="4" r="2" />
      <circle cx="4" cy="24" r="2" />
      <circle cx="4" cy="44" r="2" />
    </svg>
  );
}

export function AccentLine({ className, variant = "black" }: LineArtProps) {
  return (
    <div className={cn("w-[2px] h-[140px]", 
      variant === "black" ? "bg-ink-black" : 
      variant === "white" ? "bg-pure-white" : "bg-lavender-700", 
      className)} 
    />
  );
}

export function VerticalLabel({ children, className, variant = "black" }: LineArtProps & { children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className={cn(
        "[writing-mode:vertical-rl] rotate-180 whitespace-nowrap text-[11px] uppercase font-bold tracking-[2.5px]",
        variant === "black" ? "text-ink-black" : 
        variant === "white" ? "text-pure-white" : "text-lavender-700"
      )}>
        {children}
      </div>
      <AccentLine variant={variant} />
    </div>
  );
}
