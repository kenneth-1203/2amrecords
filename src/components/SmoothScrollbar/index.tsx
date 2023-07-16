import React, { useRef, useState, useCallback, useLayoutEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`
//   height: 100vh;
`;

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  // scroll container
  const scrollRef: any = useRef(null);

  // page scrollable height based on content length
  const [pageHeight, setPageHeight] = useState(0);

  // update scrollable height when browser is resizing
  const resizePageHeight = useCallback((entries: any) => {
    for (let entry of entries) {
      setPageHeight(entry.contentRect.height);
    }
  }, []);

  // observe when browser is resizing
  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) =>
      resizePageHeight(entries)
    );
    scrollRef && resizeObserver.observe(scrollRef.current);
    return () => resizeObserver.disconnect();
  }, [scrollRef, resizePageHeight]);

  const { scrollY } = useScroll(); // measures how many pixels user has scrolled vertically
  // as scrollY changes between 0px and the scrollable height, create a negative scroll value...
  // ... based on current scroll position to translateY the document in a natural way
  const transform = useTransform(scrollY, [0, pageHeight], [0, -pageHeight]);
  const physics = { damping: 20, mass: 0.3, stiffness: 100 }; // easing of smooth scroll
  const spring = useSpring(transform, physics); // apply easing to the negative scroll value

  return (
    <>
      <Container
        ref={scrollRef}
        style={{ y: spring }} // translateY of scroll container using negative scroll value
        className="scroll-container"
      >
        {children}
      </Container>
      {/* blank div that has a dynamic height based on the content's inherent height */}
      {/* this is neccessary to allow the scroll container to scroll... */}
      {/* ... using the browser's native scroll bar */}
      {/* <div style={{ height: pageHeight }} /> */}
    </>
  );
};

export default SmoothScroll;
