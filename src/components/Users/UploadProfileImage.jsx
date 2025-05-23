import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadProfilePictureAction } from "../../redux/slices/users/usersSlice";
import Error from "../Alert/Error";
import Loading from "../Alert/Loading";
import Success from "../Alert/Success";

const UploadProfileImage = () => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  useEffect(() => {}, [dispatch]);

  const [formData, setFormData] = useState({
    image: null,
  });

  const { isProfileImgUploaded, loading, error } = useSelector(
    (state) => state?.users
  );

  const validateForm = (data) => {
    let errors = {};

    if (!data.image) errors.image = "Image is required";

    return errors;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const formErrors = validateForm(formData);
    setErrors({ ...errors, [name]: formErrors[name] });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(uploadProfilePictureAction(formData));
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
        <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
            Upload Profile Image
          </h2>

          {/* error */}
          {error && <Error message={error?.message} />}
          {isProfileImgUploaded && (
            <Success message="Image uploaded successfully" />
          )}
          <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium text-center">
            Upload or update Profile Image
          </h3>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Image</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="file"
              name="image"
              onChange={handleFileChange}
              onBlur={handleBlur}
            />
            {/* error here */}
            {errors?.image && <p className="text-red-500 ">{errors.image}</p>}
          </label>

          {/* button */}
          {loading ? (
            <Loading />
          ) : (
            <button
              className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
              type="submit"
            >
              Upload Image
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UploadProfileImage;
