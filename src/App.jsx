import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./App.css"
import { useEffect, useState } from "react";
import { Form, Image, Input, message } from "antd";

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
      {!isLoggedIn && (
        <div
          style={{
            backgroundImage: 'url("https://storage.googleapis.com/ninety-one-public-bucket/logo/login-page-bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1
          }}
          className="login-container h-screen flex justify-center items-center"
        >
          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            className="login-form"
            style={{
              width: '420px',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: "75px 50px",
              border: '1px solid rgba(0, 153, 153, 1)',
              borderRadius: '4px',
              zIndex: 2,
              background: "white",
              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="flex justify-center mb-6">
              <Image
                src="https://storage.googleapis.com/ninety-one-public-bucket/logo/Heart%20plus%20logo%20(full%20version)%20no%20BG.svg"
                alt="Heart Plus Logo"
                preview={false}
                width={150}
              />
            </div>
            <div  className="flex justify-center mb-6">
              <p>Welcome</p>
            </div>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
              style={{
                marginBottom: '10px'
              }}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <p style={{ fontSize: '12px', color: '#009999', marginBottom: '20px' }}>Forgot your password?</p>

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
      )
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
