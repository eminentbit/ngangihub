import { motion } from "framer-motion";

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Card({ title, description, icon }: CardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
    >
      <div className="mb-4 text-blue-600 bg-blue-200 rounded-full p-2 inline-flex items-center justify-center w-12 h-12">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-blue-600 mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
}
