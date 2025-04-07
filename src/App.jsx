import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/AuthRoute/ProtectedRoute";
import Homepage from "./components/Homepage/Homepage";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import AddPost from "./components/Posts/AddPost";
import PostDetails from "./components/Posts/PostDetails";
import PostLists from "./components/Posts/PostLists";
import UpdatePost from "./components/Posts/UpdatePost";
import Login from "./components/Users/Login";
import PrivateUserProfile from "./components/Users/PrivateUserProfile";
import PublicUserProfile from "./components/Users/PublicUserProfile";
import UploadProfileImage from "./components/Users/UploadProfileImage";

function App() {
  const { userAuth } = useSelector((state) => state?.users);
  const isLogin = userAuth?.userInfo?.token;

  return (
    <BrowserRouter>
      {isLogin ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/user-public-profile/:userId"
          element={
            <ProtectedRoute>
              <PublicUserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <PrivateUserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload-profile-image"
          element={
            <ProtectedRoute>
              <UploadProfileImage />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/add-post"
          element={
            <ProtectedRoute>
              <AddPost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/posts/:postId"
          element={
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <PostLists />
            </ProtectedRoute>
          }
        />

        <Route
          path="/posts/:postId/update"
          element={
            <ProtectedRoute>
              <UpdatePost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
