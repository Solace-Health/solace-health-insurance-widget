import * as React from "react";
import { useSpring, config, animated } from "@react-spring/web";
import useResizeObserver from "use-resize-observer";

export const Wrapper = ({ children }: { children: React.ReactElement }) => {
  const [currentHeight, setCurrentHeight] = React.useState(120);
  const [newHeight, setNewHeight] = React.useState(260);
  const { ref, width = 1, height = 1 } = useResizeObserver();

  const propsSize = useSpring({
    from: { height: currentHeight },
    to: { height: newHeight },
    config: config.gentle,
    reset: true,
  });

  React.useEffect(() => {
    setCurrentHeight(newHeight);
  }, [children]);

  React.useEffect(() => {
    if (height <= 1) return;
    setNewHeight(height);
  }, [width, height]);

  return (
    <animated.div style={{ overflowY: "hidden", ...propsSize }}>
      <animated.div ref={ref}>{children}</animated.div>
    </animated.div>
  );
};
