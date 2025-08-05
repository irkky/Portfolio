import { motion } from "framer-motion"

interface PageTransitionProps {
  children: React.ReactNode
  variant?: 'fade' | 'slide' | 'scale' | 'blur' | 'rotate' | 'elastic'
  duration?: number
}

const transitionVariants = {
  fade: {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: -100, y: 20 },
    in: { opacity: 1, x: 0, y: 0 },
    out: { opacity: 0, x: 100, y: -20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    in: { opacity: 1, scale: 1, y: 0 },
    out: { opacity: 0, scale: 1.1, y: -20 },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(10px)", y: 20 },
    in: { opacity: 1, filter: "blur(0px)", y: 0 },
    out: { opacity: 0, filter: "blur(10px)", y: -20 },
  },
  rotate: {
    initial: { opacity: 0, rotateY: -90, scale: 0.8 },
    in: { opacity: 1, rotateY: 0, scale: 1 },
    out: { opacity: 0, rotateY: 90, scale: 0.8 },
  },
  elastic: {
    initial: { opacity: 0, scale: 0.3, rotate: -10 },
    in: { opacity: 1, scale: 1, rotate: 0 },
    out: { opacity: 0, scale: 0.3, rotate: 10 },
  },
}

const transitionConfigs = {
  fade: {
    type: "tween",
    ease: [0.25, 0.46, 0.45, 0.94],
    duration: 0.5,
  },
  slide: {
    type: "spring",
    damping: 25,
    stiffness: 200,
    mass: 0.8,
  },
  scale: {
    type: "spring",
    damping: 20,
    stiffness: 300,
    mass: 0.6,
  },
  blur: {
    type: "tween",
    ease: "easeInOut",
    duration: 0.6,
  },
  rotate: {
    type: "spring",
    damping: 15,
    stiffness: 100,
    mass: 0.5,
  },
  elastic: {
    type: "spring",
    damping: 10,
    stiffness: 400,
    mass: 0.4,
  },
}

export default function PageTransition({ 
  children, 
  variant = 'slide',
  duration 
}: PageTransitionProps) {
  const variants = transitionVariants[variant]
  const transition = {
    ...transitionConfigs[variant],
    ...(duration && { duration }),
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </motion.div>
  )
}