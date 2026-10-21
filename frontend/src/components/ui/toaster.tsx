// Renders toasts dispatched through the app's `useToast()` store.
//
// The app carries two feedback channels on purpose: `useToast()` (this Radix
// store, used by most of the UI) and sonner (imported directly by two pages).
// Both are mounted in App.tsx — dropping either makes its messages vanish
// silently, which is exactly what happened when only sonner was mounted.
import { useToast } from "@/hooks/useToast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
