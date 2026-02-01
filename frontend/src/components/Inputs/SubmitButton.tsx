import { motion } from 'framer-motion';

type SubmitButtonProps = {
  label?: string;
  loading?: boolean;
  disabled?: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label = 'Submit',
  loading = false,
  disabled = false,
}) => {
  return (
    <motion.button
      type="submit"
      disabled={disabled || loading}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      className={`
        w-full rounded-xl px-4 py-2 text-sm font-medium
        transition-all duration-200
        flex items-center justify-center gap-2
        ${
          disabled || loading
            ? 'cursor-not-allowed bg-gray-300 text-gray-600'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }
      `}
    >
      {loading && (
        <motion.span
          className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        />
      )}
      {label}
    </motion.button>
  );
};

export default SubmitButton;
