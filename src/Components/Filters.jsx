import { Input } from "antd";
import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { SET_RAW_EXAMS, TOGGLE_EXAM_LOADING } from "../Store/entities/RawExams";

function Filters() {
  const dispatch = useDispatch();

  const handleSearchRawExams = useCallback(
    (event) => {
      const searchValue = event.target.value;
      dispatch(TOGGLE_EXAM_LOADING({ status: true }));
      axios
        .get("/raw_exams/", {
          params: {
            q: searchValue,
          },
        })
        .then((res) => {
          console.log(res);
          dispatch(SET_RAW_EXAMS({ rawExams: res.data }));
          dispatch(TOGGLE_EXAM_LOADING({ status: false }));
        })
        .catch((err) => console.log(err.response));
    },
    [dispatch]
  );

  return (
    <div className="mt-5 mb-3">
      <form>
        <div className="flex gap-5">
          <div className="flex flex-col grow gap-2">
            <label htmlFor="question-count">جستجو</label>
            <Input
              placeholder="..."
              type="text"
              name="questions-count"
              id="questions-count"
              className="rounded-full border-none shadow-none"
              onChange={handleSearchRawExams}
            />
          </div>
        </div>
        {/* <Button
          type="submit"
          name="apply-filter"
          id="apply-filter"
          className="bg-emerald-500 absolute top-3 left-4"
        >
          اعمال فیلتر
        </Button> */}
      </form>
    </div>
  );
}

export default Filters;
