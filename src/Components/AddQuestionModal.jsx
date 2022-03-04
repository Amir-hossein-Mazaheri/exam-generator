import { Modal } from "antd";
import { HIDE_MODAL } from "../Store/ui";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import Button from "../Common/Button";

function AddQuestionModal() {
  const dispatch = useDispatch();
  const { modalVisibility, isModalLoading } = useSelector((store) => store.ui);

  const handleManuallyAddQuestion = useCallback((event) => {
    event.preventDefault();
    console.log("submitted");
  }, []);

  return (
    <Modal
      title="اضافه کردن سوال به صورت دستی"
      visible={modalVisibility}
      //   onOk={handleOk}
      //   confirmLoading={isModalLoading}
      onCancel={() => dispatch(HIDE_MODAL())}
      keyboard={true}
      footer={null}
    >
      <form onSubmit={handleManuallyAddQuestion}>
        <div className="mr-auto w-fit">
          <Button
            onClick={() => dispatch(HIDE_MODAL())}
            className="bg-red-500 px-6 text-white ml-3"
          >
            لغو
          </Button>
          <Button type="submit" className="bg-green-500 px-7 text-white">
            افزودن
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddQuestionModal;
