import Button from "./Button";
import Tag from "./Tag";

function QuestionCard({
  questionTag,
  title,
  categories,
  choices,
  deleteFunction,
}) {
  return (
    <div className="px-7 py-4 rounded-lg shadow-lg shadow-gray-200">
      <div className="flex items-center justify-between">
        {questionTag && (
          <h2 className="text-lg text-gray-800 font-medium">{questionTag}</h2>
        )}
        <div className="flex gap-3">
          {categories.map((category) => (
            <Tag className="bg-gray-300 rounded-md">{category}</Tag>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-md font-medium">{title}</h3>
        <div className="mt-5 space-y-4">
          <ul>
            {choices.map((choice) => (
              <li>
                <p>{choice}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {deleteFunction && (
        <div onClick={deleteFunction}>
          <Button className="bg-red-500 text-white flex gap-1 mr-auto items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span>حذف سوال</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
