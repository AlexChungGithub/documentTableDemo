import React from "react";

type DivProps = React.HTMLProps<HTMLDivElement>;
const ComponentToPrint = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => {
    return (
      <div className="page-container" ref={ref}>{props.children}</div>
    );
  });

ComponentToPrint.displayName = "ComponentToPrint";
export default ComponentToPrint;