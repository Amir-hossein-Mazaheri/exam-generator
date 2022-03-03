import { Link } from "react-router-dom";

function Card({ title, className, to, children, ...others }) {
  return (
    <div
      className={`px-8 py-4 relative rounded-lg max-w-xs min-h-[10rem] shadow-lg shadow-gray-200 ${className}`}
      {...others}
    >
      <Link to={to}>
        <h2 className="font-bold text-lg text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-900">
          {title}
        </h2>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60">
          {children}
        </div>
      </Link>
    </div>
  );
}

export default Card;
