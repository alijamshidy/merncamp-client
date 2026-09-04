import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
  userName,
  setUserName,
  about,
  setAbout,
  ProfileUpdate,
}) => {
  return (
    <form
      className="w-full"
      onSubmit={handleSubmit}>
      {ProfileUpdate && (
        <>
          <div className="flex flex-col mb-[6px]">
            <label
              className="text-[#707070]"
              htmlFor="userName">
              User Name
            </label>
            <input
              autoComplete="userName"
              required
              value={userName || ""}
              onChange={e => setUserName(e.target.value)}
              className="outline-none border border-[#707070] rounded-sm px-2 py-1 w-[95%] md:w-[90%] focus:shadow-md focus:shadow-blue-500"
              id="userName"
              type="text"
              placeholder="Enter Name"
            />
          </div>
          <div className="flex flex-col mb-[6px]">
            <label
              className="text-[#707070]"
              htmlFor="about">
              About
            </label>
            <input
              autoComplete="about"
              required
              value={about || ""}
              onChange={e => setAbout(e.target.value)}
              className="outline-none border border-[#707070] rounded-sm px-2 py-1 w-[95%] md:w-[90%] focus:shadow-md focus:shadow-blue-500"
              id="about"
              type="text"
              placeholder="Write about yourself..."
            />
          </div>
        </>
      )}
      {page !== "login" && (
        <div className="flex flex-col mb-[6px]">
          <label
            className="text-[#707070]"
            htmlFor="name">
            Your Name
          </label>
          <input
            autoComplete="name"
            required
            value={name || ""}
            onChange={e => setName(e.target.value)}
            className="outline-none border border-[#707070] rounded-sm px-2 py-1 w-[95%] md:w-[90%] focus:shadow-md focus:shadow-blue-500"
            id="name"
            type="text"
            placeholder="Enter Name"
          />
        </div>
      )}
      <div className="flex flex-col mb-[6px]">
        <label
          className="text-[#707070]"
          htmlFor="email">
          Email Address
        </label>
        <input
          autoComplete="email"
          required={ProfileUpdate}
          disabled={ProfileUpdate}
          value={email || ""}
          onChange={e => setEmail(e.target.value)}
          className="outline-none border border-[#707070] rounded-sm px-2 py-1 w-[95%] md:w-[90%] focus:shadow-md focus:shadow-blue-500"
          id="email"
          type="text"
          placeholder="Enter Email"
        />
      </div>
      <div className="flex flex-col mb-[6px]">
        <label
          className="text-[#707070]"
          htmlFor="password">
          Password
        </label>
        <input
          required={!ProfileUpdate}
          value={password || ""}
          onChange={e => setPassword(e.target.value)}
          className="outline-none border border-[#707070] rounded-sm px-2 py-1 w-[95%] md:w-[90%] focus:shadow-md focus:shadow-blue-500"
          id="password"
          type="password"
          placeholder="Enter Password"
        />
      </div>
      {page !== "login" && (
        <div className="flex flex-col mb-[6px]">
          <label
            className="text-[#707070]"
            htmlFor="name">
            Pick Your Question
          </label>

          <select
            className="outline-none border border-[#707070] rounded-sm px-2 py-1 w-[95%] md:w-[90%]"
            name="question"
            id="question">
            <option value="">What is your favourite color?</option>
            <option value="">What is your best friend's name?</option>
            <option value="">What is you were born</option>
          </select>
          <p className="text-[12px] text-[#707070]">
            You can use this to reset your pasword if forgotten.
          </p>
        </div>
      )}
      {page !== "login" && (
        <div className="flex flex-col mb-[6px]">
          <input
            required={!ProfileUpdate}
            value={secret || ""}
            onChange={e => setSecret(e.target.value)}
            className="outline-none border border-[#707070] rounded-sm px-2 py-1 w-[95%] md:w-[90%] focus:shadow-md focus:shadow-blue-500"
            id="secret"
            type="text"
            placeholder="Write your answer here"
          />
        </div>
      )}
      <button className="w-[95%] md:w-[90%] bg-blue-500 p-2 rounded-md mt-4 cursor-pointer hover:shadow-xl text-white hover:shadow-blue-400/40">
        {loading ? (
          <SyncOutlined
            spin
            className="py-1"
          />
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default AuthForm;
