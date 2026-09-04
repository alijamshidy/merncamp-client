import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
import { Avatar, Modal } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthForm from "../../../components/forms/AuthForm";
import { UserContext } from "../../../context";
const ProfileUpdate = () => {
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  // profile image
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  const handleSubmit = async e => {
    e.preventDefault();
    const obj = {
      userName,
      about,
      name,
      password,
      secret,
      image,
    };

    try {
      setLoading(true);
      const { data } = await axios.put(`/profile-update`, obj);

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // update local storage
        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));
        //update context
        setState({ ...state, user: data });
        setOk(true);
        setLoading(false);
        setPassword("");
        setSecret("");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleImage = async e => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    console.log([...formData]);
    setUploading(true);

    try {
      const { data } = await axios.post("/upload-image", formData);
      console.log(data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  useEffect(() => {
    if (state && state.user) {
      setUserName(state.user.username);
      setAbout(state.user.about);
      setName(state.user.name);
      setEmail(state.user.email);
      setImage(state.user.image);
    }
  }, [state && state.user]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // جلوگیری از mismatch
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full registerbackground flex justify-center items-center">
        <h1 className="text-[36px] font-bold  ">Profile</h1>
      </div>

      <div className="w-[90%] md:w-[85%] lex justify-center items-center mx-auto">
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <div className="w-[70%] md:w-[65%] mx-auto mt-4">
            <label className="cursor-pointer ml-[50%] text-2xl">
              {image && image.url ? (
                <Avatar
                  size={45}
                  src={image.url}
                />
              ) : uploading ? (
                <LoadingOutlined />
              ) : (
                <CameraOutlined />
              )}
              <input
                onChange={handleImage}
                className="hidden"
                type="file"
                name=""
                accept="images/*"
                id=""
              />
            </label>
            <div className="flex w-full justify-start p-1 items-start gap-4">
              <AuthForm
                ProfileUpdate={true}
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password || ""}
                setPassword={setPassword}
                secret={secret || ""}
                setSecret={setSecret}
                loading={loading}
                page="register"
                userName={userName}
                setUserName={setUserName}
                about={about}
                setAbout={setAbout}
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
                <p className="my-6">You have successfully updated profile</p>
              </Modal>
            </div>
          </div>
        </div>
        <div className="flex w-[95%] justify-center items-center">
          <span>Already registered? </span>
          <Link href={"/login"}>
            <span className="text-blue-500 pl-2">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
