import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import useDynamicRefs from "use-dynamic-refs";

export const FloatingDiv = React.forwardRef((props, ref) => {
  const className = props.className || "floater";
  const timeBase = props.timeBase || 2;
  const timeRand = timeBase + Math.random() * 0.5;
  const polarity = [-1, 1][Math.round(Math.random())];
  const base = props.base || 10;
  const randomDurAdd = props.randomDurAdd || 20;
  const delta = polarity * (base + Math.random() * randomDurAdd);
  console.log("delta", delta);
  const depthMult = 0.3;

  useEffect(() => {
    let depth = 1;
    if (props?.floatCont().current && props.randomPosition) {
      let left = Math.random() * 100;
      let top = Math.random() * 100;
      depth = Math.abs(50 - left);
      gsap.to(ref.current, {
        xPercent: -50,
        yPercent: -50,
        left: left + "%", //Math.random() * props.floatCont().current.offsetWidth,
        top: top + "%" //Math.random() * props.floatCont().current.offsetHeight
      });
    }

    gsap.to(ref.current, {
      duration: timeRand,
      y: delta, // - depth * depthMult, TODO add depth dependent on left (closer to the center - less y shift)
      repeat: -1,
      yoyo: true,
      ease: "none"
    });
  }, [props.floatCont]);

  function logRef() {
    console.log(ref.current);
  }

  return (
    <div key={"float" + props.num}>
      <div
        onClick={logRef}
        key={"floater" + props.num}
        ref={ref}
        className={className}
        style={props.randomPosition ? { position: "absolute" } : ""}
      >
        {props.children}
      </div>
      {props.num}
    </div>
  );
});
