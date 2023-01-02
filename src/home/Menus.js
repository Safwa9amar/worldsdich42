import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function Menus({ id, img, name, idx }) {
  const squareVariants = {
    visible: { opacity: 1, scale: 1, transition: { duration: idx * 0.3 } },
    hidden: { opacity: 0, scale: 0.5 },
  };

  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={squareVariants}
    >
      <img
        key={id}
        className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-neutral hover:bg-neutral-focus p-4 border-4 border-accent rounded-full"
        src={img}
        alt={id}
      />
      <p className="text-xl">{name.split(" ")[0]}</p>
    </motion.div>
  );
}
