import { Menu } from "antd";

function PrintMenu({ rawExamId }) {
  return (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`http://lapluse.ir/examapi/print_exam_questions/${rawExamId}`}
        >
          <span>پرینت آزمون</span>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`http://lapluse.ir/examapi/print_exam_answers/${rawExamId}`}
        >
          <span>پرینت پاسخنامه تشریحی</span>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`http://lapluse.ir/examapi/print_exam_keys/${rawExamId}`}
        >
          <span>پرینت کلید آزمون</span>
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default PrintMenu;
