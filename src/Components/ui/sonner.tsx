import { Toaster as Sonner } from "sonner"

const Toaster = () => {

  return (
    <Sonner
      className="toaster group"
      style={
        {
          "--normal-bg": "black",
          "--normal-text": "white",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
    />
  )
}

export { Toaster }
