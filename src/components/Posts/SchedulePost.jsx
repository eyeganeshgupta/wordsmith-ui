import { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { shedulePostAction } from "../../redux/slices/posts/postsSlice";
import Error from "../Alert/Error";
import Loading from "../Alert/Loading";
import Success from "../Alert/Success";

const SchedulePost = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { loading, error, success } = useSelector((state) => state?.posts);
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      shedulePostAction({
        scheduledPublish: selectedDate,
        postId,
      })
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-800">
      <div className="bg-white rounded-lg shadow-md p-6 w-96">
        <h1 className="text-2xl font-bold mb-4 text-green-500">
          Schedule Post
        </h1>
        <p className="mb-6 text-gray-600">
          Please select a date from the date picker below
        </p>
        {error && <Error message={error?.message} />}
        {success && <Success message="Post has been scheduled successfully" />}
        <form onSubmit={handleSubmit}>
          <label htmlFor="date" className="flex items-center mb-4">
            <FiCalendar className="mr-2 text-blue-500" />
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="border-2 border-blue-500 p-2 rounded-md w-full"
            />
          </label>
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-white rounded-md"
            >
              Schedule
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SchedulePost;
