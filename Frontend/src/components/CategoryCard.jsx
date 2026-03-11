import { Link } from 'react-router-dom';

const CategoryCard = ({ title, image, link }) => {
  return (
    <Link to={link} className="category-card block bg-white rounded-lg shadow-md">
      <div className="aspect-square overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 bg-white rounded-b-lg">
        <h3 className="text-lg font-medium text-gray-900 flex items-center justify-between">
          {title}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCard;