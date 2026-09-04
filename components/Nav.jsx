import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
// import "../globals.css";
import { CaretDownOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useRouter } from "next/router";
const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [current, setCurrent] = useState("");
  const [state, setState] = useContext(UserContext);
  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  const router = useRouter();
  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex w-full mx-auto justify-center items-center h-[40px]">
        <div className="w-full flex justify-center items-center gap-3 bg-blue-500 text-white h-full p-5">
          <ul className="w-full flex justify-between items-center">
            <Link
              onClick={() => setShowMenu(false)}
              className={`${
                current === "/" && "bg-blue-700/40"
              } p-[4.4px] flex justify-center items-center gap-2`}
              href={"/"}>
              <Avatar src="/images/logo.jpg" /> MERNCAMP
            </Link>
            <div className="flex w-[100px] justify-center items-center">
              {state && state.user && (
                <div className="w-full relative flex flex-col justify-center items-center h-full">
                  <div
                    onClick={() => setShowMenu(!showMenu)}
                    className="justify-center items-center flex w-[60%] gap-2 cursor-pointer">
                    <span className="w-full flex justify-center items-center  py-2 select-none px-3">
                      {state.user.name}
                    </span>
                    <CaretDownOutlined />
                  </div>

                  <div
                    className={`flex cursor-default flex-col gap-2 justify-center items-center w-full rounded-sm ${
                      showMenu
                        ? " absolute top-12 bg-white z-10 text-blue-500"
                        : "hidden"
                    }`}>
                    <Link
                      onClick={() => setShowMenu(false)}
                      className={`${
                        current === "/user/dashboard"
                          ? "bg-blue-700 text-white"
                          : "hover:bg-blue-700 hover:text-white"
                      } w-full p-2 rounded-t-sm`}
                      href={"/user/dashboard"}>
                      Dashboard
                    </Link>
                    <Link
                      onClick={() => setShowMenu(false)}
                      className={`${
                        current === "/user/profile/update"
                          ? "bg-blue-700 text-white"
                          : "hover:bg-blue-700 hover:text-white"
                      } w-full p-2`}
                      href={"/user/profile/update"}>
                      Profile
                    </Link>
                    {state.user.role === "Admin" && (
                      <Link
                        onClick={() => setShowMenu(false)}
                        className={`${
                          current === "/admin"
                            ? "bg-blue-700 text-white"
                            : "hover:bg-blue-700 hover:text-white"
                        } w-full p-2`}
                        href={"/admin"}>
                        Admin
                      </Link>
                    )}

                    <button
                      className="cursor-pointer p-2 w-full justify-start items-start flex hover:bg-blue-700 hover:text-white rounded-b-sm"
                      onClick={() => {
                        setShowMenu(false);
                        logout();
                      }}>
                      Logout
                    </button>
                  </div>
                </div>
              )}
              {!state && (
                <>
                  <Link
                    className={`p-[8px]  ${
                      current === "/login" && "bg-blue-700/40"
                    }`}
                    href={"/login"}>
                    Login
                  </Link>
                  <Link
                    className={`p-[8px]  ${
                      current === "/register" && "bg-blue-700/40"
                    }`}
                    href={"/register"}>
                    Register
                  </Link>
                </>
              )}
            </div>
            {/* {state !== null ? (
              <>
                {" "}
                <Link
                  className={`p-[8px]  ${
                    current === "user/dashboard" && "bg-blue-700/40"
                  }`}
                  href={"/user/dashboard"}>
                  {state && state.user && state.user.name}
                </Link>
                <a
                  className={`p-[8px] cursor-pointer`}
                  onClick={logout}>
                  Logout
                </a>
              </>
            ) : (
              <>
                {" "}
                <Link
                  className={`p-[8px]  ${
                    current === "/login" && "bg-blue-700/40"
                  }`}
                  href={"/login"}>
                  Login
                </Link>
                <Link
                  className={`p-[8px] pr-0  ${
                    current === "/register" && "bg-blue-700/40"
                  }`}
                  href={"/register"}>
                  Register
                </Link>
              </>
            )} */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
