import { Checkbox, Modal } from "antd";
import { HIDE_MODAL } from "../Store/ui";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useMemo, useState } from "react";
import Button from "../Common/Button";
import Categories from "../Common/Categories";
import useSWR from "swr";
import fetcher from "../Helpers/fetcher";
import convertCategory from "../Helpers/categoryConvertor";
import axios from "axios";

function AddQuestionModal() {
  const dispatch = useDispatch();
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [hardness, setHardness] = useState([]);
  const { data: categoriesData } = useSWR(
    "http://192.168.179.213:8080/majors/",
    fetcher
  );
  const { modalVisibility, isModalLoading } = useSelector((store) => store.ui);

  const categories = useMemo(() => {
    if (!categoriesData) return;
    return convertCategory(categoriesData);
  }, [categoriesData]);

  const hardnessOptions = useMemo(() => {
    return [
      { label: "سخت", value: 1 },
      { label: "متوسط", value: "Apple" },
      { label: "آسان", value: "Apple" },
    ];
  }, []);

  const handleManuallyAddQuestion = useCallback((event) => {
    event.preventDefault();
    console.log("submitted");
    axios
      .get("http://192.168.179.213:8080/questions/", {})
      .then((res) => setFetchedQuestions(res.data));
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
        <div className="px-5 py-3 mb-7 rounded-md shadow">
          <Checkbox.Group
            options={plainOptions}
            defaultValue={["Apple"]}
            onChange={onChange}
          />
          <Categories data={categories} />
        </div>
        <div className="mr-auto w-fit">
          <Button
            onClick={() => dispatch(HIDE_MODAL())}
            className="bg-red-500 px-6 text-white ml-3"
          >
            لغو
          </Button>
          <Button type="submit" className="bg-green-500 px-7 text-white">
            نمایش سوالات
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddQuestionModal;
