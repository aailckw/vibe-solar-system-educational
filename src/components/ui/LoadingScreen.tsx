import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="w-full h-screen bg-space-950 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.h2
          className="text-xl font-semibold text-slate-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading Solar System...
        </motion.h2>
        <motion.p
          className="text-slate-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Preparing your journey through space
        </motion.p>
      </div>
    </div>
  );
}