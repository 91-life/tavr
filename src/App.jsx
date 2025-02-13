import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./App.css"
import { useEffect, useState } from "react";
import { Form, Input, message } from "antd";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true'; // Default to true or false from sessionStorage
  });

  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  const handleLogin = (values) => {
    setIsLoggedIn(true);
    message.success("Login Success");
  }
  return (
    <>
      {!isLoggedIn && <div className="login-container h-screen flex justify-center items-center">
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          className="login-form"
          style={{ width: '300px' }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <button
              style={{ backgroundColor: "rgba(0, 153, 153, 1)" }}
              className="bg-green-500 px-4 py-2 rounded-lg text-white w-full"
            >
              Log in
            </button>
          </Form.Item>
        </Form>
      </div>
      }
      {
        isLoggedIn && (
          <div className="h-screen overflow-x-hidden overflow-y-auto">
            <Navbar />
            <Sidebar />
            <MainContent />
            {/* comment */}
          </div>
        )
      }
    </>
  );
}

export default App;
