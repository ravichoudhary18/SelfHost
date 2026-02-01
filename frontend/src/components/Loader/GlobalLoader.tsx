import { motion } from 'framer-motion';
import { useLoader } from '../../context/LoaderContext';

const GlobalLoader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <motion.div
        className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default GlobalLoader;
