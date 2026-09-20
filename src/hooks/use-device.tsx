import * as React from "react";

export type DeviceType = "phone" | "tablet" | "laptop";

const PHONE_MAX = 767; // < md
const TABLET_MAX = 1279; // < xl  (covers iPad portrait + landscape)

function detect(): DeviceType {
  if (typeof window === "undefined") return "laptop";
  const w = window.innerWidth;
  if (w <= PHONE_MAX) return "phone";
  if (w <= TABLET_MAX) return "tablet";
  return "laptop";
}

/**
 * Detects the current device class from the viewport (and keeps it in sync on
 * resize / orientation change). Also mirrors the value onto
 * `<html data-device="...">` so styles can react without prop drilling.
 */
export function useDeviceType(): DeviceType {
  const [device, setDevice] = React.useState<DeviceType>(detect);

  React.useEffect(() => {
    const update = () => {
      const next = detect();
      setDevice(next);
      document.documentElement.dataset.device = next;
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return device;
}
