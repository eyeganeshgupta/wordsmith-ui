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
import AccountVerification from "./components/Users/AccountVerification";
import Login from "./components/Users/Login";
import { PasswordReset } from "./components/Users/PasswordReset";
import PasswordResetRequest from "./components/Users/PasswordResetRequest";
import PrivateUserProfile from "./components/Users/PrivateUserProfile";
import PublicUserProfile from "./components/Users/PublicUserProfile";
import UploadCoverImage from "./components/Users/UploadCoverImage";
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
          path="/verify-account/:token"
          element={
            <ProtectedRoute>
              <AccountVerification />
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
          path="/upload-cover-image"
          element={
            <ProtectedRoute>
              <UploadCoverImage />
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

        <Route path="/forgot-password" element={<PasswordResetRequest />} />

        <Route path="/reset-password/:token" element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
