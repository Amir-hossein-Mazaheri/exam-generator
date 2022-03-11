import { Menu } from "antd";

function PrintMenu() {
  return (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          <span>پرینت آزمون</span>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          <span>پرینت پاسخنامه تشریحی</span>
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          <span>پرینت کلید آزمون</span>
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default PrintMenu;
