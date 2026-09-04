import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthForm from "../components/forms/AuthForm";
import { UserContext } from "../context";
const Login = () => {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // جلوگیری از mismatch
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setState({
          user: data.user,
          token: data.token,
        });
        window.localStorage.setItem("auth", JSON.stringify(data));
        router.push("/user/dashboard");
      }

      // console.log(data);
    } catch (error) {
      toast.error(error.response);
      setLoading(false);
    }
  };
  if (state && state.token) {
    router.push("/user/dashboard");
  }
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full registerbackground flex justify-center items-center">
        <h1 className="text-[36px] font-bold  ">Login</h1>
      </div>

      <div className="w-[90%] md:w-[85%] lex justify-center items-center mx-auto">
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <div className="w-[70%] md:w-[65%] mx-auto">
            <div className="flex w-full justify-start p-3 items-start gap-4">
              <AuthForm
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loading={loading}
                page="login"
              />
            </div>
            {/* <div className={`flex justify-center items-center`}>
              <Modal
                title="Congratulations"
                getContainer={false}
                closable={false}
                open={ok}
                footer={null}
                onCancel={() => setOk(false)}>
                <p className="my-6">You have successfully registered</p>
                <Link href={"/login"}>
                  <span className="bg-blue-500 text-white p-[6px] rounded-sm">
                    Login
                  </span>
                </Link>
              </Modal>
            </div> */}
          </div>
        </div>
        <div className="flex w-[95%] justify-center items-center">
          <span>Not yet registered? </span>
          <Link href={"/register"}>
            <span className="text-blue-500 pl-2">Register</span>
          </Link>
        </div>
        <div className="flex w-[95%] justify-center items-center">
          <Link href={"/forgot-password"}>
            <span className="text-red-500 pl-2">Forgot password</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
