import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";

const UserRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  const [state] = useContext(UserContext);

  useEffect(() => {
    if (state?.token) getCurrentUser(state.token);
  }, [state?.token]);
  const getCurrentUser = async token => {
    try {
      const { data } = await axios.get(`/current-user`);

      if (data) {
        setOk(true);
      }
    } catch (error) {
      router.push("/login");
    }
  };
  process?.browser &&
    state === null &&
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  return !ok ? (
    <div className="w-full mx-auto flex justify-center items-center mt-10">
      <SyncOutlined
        spin
        className="text-[66px]"
        style={{ color: "oklch(0.707 0.165 254.624)" }}
      />
    </div>
  ) : (
    <> {children}</>
  );
};

export default UserRoute;
