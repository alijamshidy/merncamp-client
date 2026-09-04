import { Modal } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import { UserContext } from "../context";
const forgot_password = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state] = useContext(UserContext);
  const router = useRouter();
  console.log(state);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // جلوگیری از mismatch
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log(email, newPassword, secret);
      setLoading(true);
      const { data } = await axios.post(`/forgot-password`, {
        email,
        newPassword,
        secret,
      });
      console.log(data);
      // setEmail("");
      // setName("");
      // setNewPassword("");
      // setSecret("");
      // setOk(data.ok);
      // setLoading(false);
    } catch (error) {
      toast.error(error.response);
      setLoading(false);
    }
  };
  if (state && state.token) {
    router.push("/");
  }
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full registerbackground flex justify-center items-center">
        <h1 className="text-[36px] font-bold  ">Forgot password</h1>
      </div>

      <div className="w-[90%] md:w-[85%] lex justify-center items-center mx-auto">
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <div className="w-[70%] md:w-[65%] mx-auto">
            <div className="flex w-full justify-start p-3 items-start gap-4">
              <ForgotPasswordForm
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                secret={secret}
                setSecret={setSecret}
                loading={loading}
                page="register"
              />
            </div>
            <div className={`flex justify-center items-center`}>
              <Modal
                title="Congratulations"
                getContainer={false}
                closable={false}
                open={ok}
                footer={null}
                onCancel={() => setOk(false)}>
                <p className="my-6">
                  Congrats !You can now login with your new password
                </p>
                <Link href={"/login"}>
                  <span className="bg-blue-500 text-white p-[6px] rounded-sm">
                    Login
                  </span>
                </Link>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forgot_password;
