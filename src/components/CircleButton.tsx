const CircleButton = ({
  icon,
  onClick,
  className,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/5 ${className}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default CircleButton;
