import { notification, Radio, Space } from "antd";
import { useCallback, useMemo } from "react";
import convertHardness from "../Helpers/convertHardness";
import Button from "./Button";
import Tag from "./Tag";

function QuestionCard({
  questionTag,
  title,
  categories,
  choices,
  hardness,
  deleteFunction,
  addFunction,
  exists = false,
}) {
  const isCorrect = useMemo(() => {
    return choices.find((choice) => choice.is_correct);
  }, [choices]);

  const pushNotification = useCallback((type, title) => {
    notification[type]({
      message: title,
      description: null,
    });
  }, []);

  return (
    <div className="px-7 py-4 rounded-lg shadow-lg shadow-gray-200">
      <div className="flex items-center justify-between">
        {questionTag && (
          <h2 className="text-lg text-gray-800 font-medium">{questionTag}</h2>
        )}
        <div className="flex gap-3">
          {categories.map((category) => (
            <Tag key={category} className="bg-gray-300 rounded-md">
              {category}
            </Tag>
          ))}
          <Tag className="bg-gray-300 rounded-md">
            {convertHardness(hardness)}
          </Tag>
        </div>
      </div>

      <div className="mt-5">
        <h3
          className="text-md font-medium"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h3>
        <div className="mt-5 space-y-4">
          <Radio.Group value={isCorrect?.text}>
            <Space direction="vertical">
              {choices.map((choice) => (
                <Radio value={choice.text}>
                  <div dangerouslySetInnerHTML={{ __html: choice.text }}></div>
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </div>
      </div>

      {deleteFunction && (
        <div
          onClick={() => {
            deleteFunction();
            pushNotification("info", "سوال حذف شد");
          }}
        >
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

      {addFunction && (
        <div>
          {exists ? (
            <Button
              onClick={() =>
                pushNotification("error", "سوال مورد نظر در لیست موجود است")
              }
              className="bg-red-500 text-white flex gap-1 mr-auto items-center"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span>در لیست موجود است</span>
            </Button>
          ) : (
            <div
              onClick={() => {
                addFunction();
                pushNotification("success", "سوال با موفقیت افزوده شد.");
              }}
            >
              <Button className="bg-green-500 text-white flex gap-1 mr-auto items-center">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </span>
                <span>افزودن</span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
