import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: "fadeUp" | "fadeIn" | "scaleIn" | "slideInLeft" | "slideInRight"
}

export default function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0,
  variant = "fadeUp"
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const variants = {
    fadeUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 }
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 }
    },
    slideInLeft: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 }
    },
    slideInRight: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 }
    }
  }

  const currentVariant = variants[variant]

  return (
    <motion.div
      ref={ref}
      initial={currentVariant.initial}
      animate={isInView ? currentVariant.animate : currentVariant.initial}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}