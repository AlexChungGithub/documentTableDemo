import { Button, iconButtonPropDefs, Link } from "@radix-ui/themes";
import * as React from "react";

type SidebarElement = React.ElementRef<typeof Button>;
interface SidebarProps extends React.ComponentPropsWithoutRef<typeof Button> {
  level?: number;
}

const SiedbarLabel = React.forwardRef<SidebarElement, SidebarProps>(
  (props, ref) => {
    const { level = 0, color = "gray", children, ...otherProps } = props;
    return (
      <Button
        color={color}
        highContrast
        variant="ghost"
        radius="none"
        size="2"
        style={{
          width: `${180 - 16 * level}px`,
          height: "var(--space-6)",
          margin: 0,
          paddingLeft: `${48 + 16 * level}px`,
          paddingRight: "12px",
          justifyContent: "start",
        }}
      >
        {children}
      </Button>
    );
  }
);
SiedbarLabel.displayName = "SiedbarLabel";
export default SiedbarLabel;
