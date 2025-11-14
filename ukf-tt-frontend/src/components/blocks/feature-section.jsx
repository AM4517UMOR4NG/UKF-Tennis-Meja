import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000,
  imageHeight = "h-[400px]"
}) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer);
  }, [progress, features.length, autoPlayInterval])

  return (
    <div className={cn("p-8 md:p-12 bg-black/90 rounded-2xl border border-gray-800/50", className)}>
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center text-white">
          {title}
        </h2>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="order-2 md:order-1 space-y-6">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-300">Auto Progress</span>
                <span className="text-sm text-blue-400 font-mono">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-800/60 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 h-2 rounded-full transition-all duration-100 shadow-sm"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                {features.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === currentFeature 
                        ? "bg-blue-500 scale-125" 
                        : index < currentFeature 
                          ? "bg-blue-400/60" 
                          : "bg-gray-600"
                    )}
                  />
                ))}
              </div>
            </div>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}>
                <motion.div
                  className={cn(
                    "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer",
                    index === currentFeature
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 border-blue-400 text-white scale-110 shadow-lg shadow-blue-500/25"
                      : "bg-gray-800/80 border-gray-600 text-gray-400 hover:border-gray-500 hover:bg-gray-700/80"
                  )}
                  whileHover={{ scale: index === currentFeature ? 1.15 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => {
                    setCurrentFeature(index);
                    setProgress(0);
                  }}
                >
                  {index <= currentFeature ? (
                    <span className="text-lg font-bold">✓</span>
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                <div className="flex-1 cursor-pointer" onClick={() => {
                  setCurrentFeature(index);
                  setProgress(0);
                }}>
                  <h3 className={cn(
                    "text-xl md:text-2xl font-semibold mb-2 transition-all duration-300",
                    index === currentFeature 
                      ? "text-white" 
                      : "text-gray-400 hover:text-gray-300"
                  )}>
                    {feature.title || feature.step}
                  </h3>
                  <p className={cn(
                    "text-sm md:text-base leading-relaxed transition-all duration-300",
                    index === currentFeature 
                      ? "text-gray-300" 
                      : "text-gray-500 hover:text-gray-400"
                  )}>
                    {feature.content}
                  </p>
                  {index === currentFeature && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "2rem" }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mt-3 rounded-full"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              "order-1 md:order-2 relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl border border-gray-700/50 shadow-2xl"
            )}>
            <AnimatePresence mode="wait">
              {features.map((feature, index) =>
                index === currentFeature && (
                  <motion.div
                    key={index}
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                    initial={{ y: 100, opacity: 0, rotateX: -20, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
                    exit={{ y: -100, opacity: 0, rotateX: 20, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}>
                    <img
                      src={feature.image}
                      alt={feature.step || feature.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                        <h4 className="text-white font-bold text-lg mb-1">{feature.title || feature.step}</h4>
                        <p className="text-gray-300 text-sm line-clamp-2">{feature.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
