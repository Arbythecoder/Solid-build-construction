import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Share2, Maximize2 } from 'lucide-react'

interface Image {
  url: string
  alt?: string
}

interface ImageGalleryProps {
  images: Image[]
  propertyTitle?: string
}

const ImageGallery = ({ images, propertyTitle = 'Property' }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    setZoomLevel(1)
  }

  const closeLightbox = () => {
    setSelectedIndex(null)
    setZoomLevel(1)
  }

  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length)
      setZoomLevel(1)
    }
  }

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
      setZoomLevel(1)
    }
  }

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 1))
  }

  const handleDownload = () => {
    if (selectedIndex !== null) {
      const link = document.createElement('a')
      link.href = images[selectedIndex].url
      link.download = `${propertyTitle}-${selectedIndex + 1}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleShare = async () => {
    if (selectedIndex !== null && navigator.share) {
      try {
        await navigator.share({
          title: propertyTitle,
          text: `Check out this property image`,
          url: images[selectedIndex].url,
        })
      } catch (error) {
        console.log('Share failed:', error)
      }
    } else {
      // Fallback: Copy to clipboard
      if (selectedIndex !== null) {
        navigator.clipboard.writeText(images[selectedIndex].url)
        alert('Image URL copied to clipboard!')
      }
    }
  }

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedIndex === null) return

    switch (e.key) {
      case 'ArrowLeft':
        prevImage()
        break
      case 'ArrowRight':
        nextImage()
        break
      case 'Escape':
        closeLightbox()
        break
      case '+':
      case '=':
        handleZoomIn()
        break
      case '-':
        handleZoomOut()
        break
    }
  }

  // Add keyboard event listener
  useState(() => {
    window.addEventListener('keydown', handleKeyDown as any)
    return () => window.removeEventListener('keydown', handleKeyDown as any)
  })

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-gray-200 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    )
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-4 gap-4">
        {/* Main Image */}
        <div className="col-span-4 md:col-span-3 row-span-2">
          <motion.div
            className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(0)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={images[0].url}
              alt={images[0].alt || 'Property image 1'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 flex items-center gap-2">
                  <Maximize2 className="w-5 h-5 text-premium-black" />
                  <span className="font-semibold text-premium-black">View Full Screen</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-sm font-semibold">
              1 / {images.length}
            </div>
          </motion.div>
        </div>

        {/* Thumbnail Grid */}
        {images.slice(1, 5).map((image, index) => (
          <div
            key={index + 1}
            className="aspect-square rounded-xl overflow-hidden cursor-pointer relative group"
            onClick={() => openLightbox(index + 1)}
          >
            <img
              src={image.url}
              alt={image.alt || `Property image ${index + 2}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-xl font-bold">+{images.length - 5}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white font-semibold z-10">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl z-10">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-2 hover:bg-white/20 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-white font-semibold min-w-[60px] text-center">
                {(zoomLevel * 100).toFixed(0)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="p-2 hover:bg-white/20 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-white/30 mx-2" />
              <button
                onClick={handleDownload}
                className="p-2 hover:bg-white/20 rounded-lg text-white transition-colors"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 hover:bg-white/20 rounded-lg text-white transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
              title="Previous (←)"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
              title="Next (→)"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Main Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full flex items-center justify-center p-20"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={images[selectedIndex].url}
                alt={images[selectedIndex].alt || `Property image ${selectedIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                style={{ transition: 'transform 0.3s ease' }}
              />
            </motion.div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-2 px-6 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === selectedIndex
                      ? 'border-luxury-gold scale-110'
                      : 'border-white/30 hover:border-white/60'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Keyboard Hints */}
            <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white text-sm">
              Use ← → keys to navigate • ESC to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ImageGallery
