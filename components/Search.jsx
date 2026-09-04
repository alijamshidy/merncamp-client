import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context";
import People from "./cards/People";

const Search = () => {
  const [state, setState] = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const searchUser = async e => {
    e.preventDefault();
    // console.log(query);
    try {
      const { data } = await axios.get(`/search-user/${query}`);
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollow = async user => {
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      setState({ ...state, user: data });
      let filtered = results.filter(p => p._id !== user._id);
      setResults(filtered);
      toast.success(`following ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnfollow = async user => {
    try {
      const { data } = await axios.put("/user-unfollow", { _id: user._id });
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      setState({ ...state, user: data });
      let filtered = results.filter(p => p._id !== user._id);
      setResults(filtered);
      toast.success(`unfollowing ${user.name}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        onSubmit={searchUser}
        className="flex w-full flex-row justify-center items-center gap-2">
        <input
          className=" w-full outline-none border border-gray-400 pl-2 py-[6px] rounded-md focus:shadow-md focus:shadow-blue-500/80"
          type="text"
          onChange={e => {
            setQuery(e.target.value);
            setResults([]);
          }}
          value={query}
          placeholder="Search"
        />
        <button
          className="bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-[6px] px-[10px] cursor-pointer rounded-md font-semibold"
          type="submit">
          Search
        </button>
      </form>
      <div className="w-[90%] mx-auto flex justify-center items-center">
        {results?.map(r => (
          <People
            key={r._id}
            people={results}
            handleFollow={handleFollow}
            handleUnfollow={handleUnfollow}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
