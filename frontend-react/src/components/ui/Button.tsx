import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'water' | 'luxury' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  isLoading?: boolean
}

const Button = ({
  variant = 'water',
  size = 'md',
  children,
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses = 'font-montserrat font-semibold uppercase tracking-wide rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClasses = {
    gold: 'bg-gradient-sand text-white shadow-sand hover:shadow-sand-lg hover:-translate-y-1 active:translate-y-0',
    water: 'bg-gradient-water text-white shadow-water hover:shadow-water-lg hover:-translate-y-1 active:translate-y-0',
    luxury: 'bg-brand-water text-white border-2 border-brand-water-dark hover:bg-brand-water-dark hover:-translate-y-1',
    outline: 'bg-transparent text-brand-water border-2 border-brand-water hover:bg-brand-water hover:text-white'
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      type={props.type}
      onClick={props.onClick}
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </motion.button>
  )
}

export default Button
