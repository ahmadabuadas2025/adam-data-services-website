// Performance utilities

export const isMobile = () => {
  return window.innerWidth < 768
}

export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const shouldLoad3D = () => {
  // Don't load heavy 3D on mobile or if user prefers reduced motion
  if (isMobile() || prefersReducedMotion()) {
    return false
  }
  return true
}

export const lazyLoad3D = (callback) => {
  if (shouldLoad3D()) {
    // Small delay to prioritize initial content
    setTimeout(() => {
      callback()
    }, 100)
  }
}

