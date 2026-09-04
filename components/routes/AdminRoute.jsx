import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";

const AdminRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  const [state] = useContext(UserContext);

  useEffect(() => {
    if (state?.token) getCurrentAdmin(state.token);
  }, [state?.token]);
  const getCurrentAdmin = async token => {
    try {
      const { data } = await axios.get(`/current-admin`);

      if (data) {
        setOk(true);
      }
    } catch (error) {
      router.push("/");
    }
  };
  process?.browser &&
    state === null &&
    setTimeout(() => {
      getCurrentAdmin();
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

export default AdminRoute;
