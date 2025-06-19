import { motion } from "framer-motion";

const WavyText = ({ text }) => (
  <div style={{ display: "flex" }}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 12,
          delay: i * 0.05,
        }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </div>
);

export default WavyText;