import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'bounce'
  duration?: number
  once?: boolean
}

const variants = {
  fadeUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },
  slideLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 }
  },
  slideRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 }
  },
  bounce: {
    initial: { opacity: 0, y: 50, scale: 0.8 },
    animate: { opacity: 1, y: 0, scale: 1 }
  }
}

export default function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0,
  variant = 'fadeUp',
  duration = 0.6,
  once = true
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px" })

  const selectedVariant = variants[variant]

  return (
    <motion.div
      ref={ref}
      initial={selectedVariant.initial}
      animate={isInView ? selectedVariant.animate : selectedVariant.initial}
      transition={{ 
        duration,
        delay,
        ease: variant === 'bounce' ? [0.68, -0.55, 0.265, 1.55] : [0.21, 0.47, 0.32, 0.98],
        type: variant === 'bounce' ? 'spring' : 'tween',
        stiffness: variant === 'bounce' ? 100 : undefined,
        damping: variant === 'bounce' ? 10 : undefined
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger container for animating multiple children
export function AnimatedStagger({ 
  children, 
  className = "",
  staggerDelay = 0.1 
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Individual stagger item
export function StaggerItem({ 
  children, 
  className = "",
  variant = 'fadeUp'
}: {
  children: React.ReactNode
  className?: string
  variant?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale'
}) {
  const selectedVariant = variants[variant]

  return (
    <motion.div
      variants={{
        hidden: selectedVariant.initial,
        visible: selectedVariant.animate
      }}
      transition={{
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}