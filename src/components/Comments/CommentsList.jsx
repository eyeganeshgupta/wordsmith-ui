const CommentsList = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <div className="flex-none">
          <img
            src="https://via.placeholder.com/50"
            alt="avatar"
            className="rounded-full h-12 w-12"
          />
        </div>
        <div className="flex-grow">
          <div className="bg-blue-50 px-4 py-3 sm:px-6 flex justify-between items-center">
            <div>
              <h4 className="text-sm font-medium text-blue-600">
                Ganesh Gupta
              </h4>
              <p className="text-sm text-gray-500">March 17, 2025</p>
            </div>
          </div>
          <div className="bg-blue-50 px-4 py-3 sm:px-6">
            <p className="mt-1 text-sm text-gray-700">Insightful</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsList;
