import { useEffect, useRef, useState } from "react";
import { useSpring, motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({ value, prefix = "", className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const springValue = useSpring(0, {
    damping: 30,
    stiffness: 200,
    mass: 1,
  });
  
  // Update spring target when value changes
  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  // Update text content on spring change
  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + formatCurrency(Math.round(latest)).replace('$', '');
      }
    });
  }, [springValue, prefix]);

  return <span ref={ref} className={className}>{prefix}{formatCurrency(0).replace('$', '')}</span>;
}
