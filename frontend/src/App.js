import "./App.css";
import Header from "./layout/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetailsEdit from "./pages/BlogDetailsEdit";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Toaster />
      <Routes>
        {/* <Route path="/" element={<Blogs />} /> */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blog" element={<UserBlogs />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog-detailsEdit/:id" element={<BlogDetailsEdit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
