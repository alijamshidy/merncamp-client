// import "antd/dist/reset.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../components/Nav";
import { UserProvider } from "../context";
import "../globals.css";
import "../public/css/styles.css";
export default function App({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <Nav />
        <ToastContainer position="top-center" />
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}
