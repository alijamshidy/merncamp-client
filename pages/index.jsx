import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { UserContext } from "../context";
import ParallaxBG from "./../components/cards/ParallaxBG";
import Post from "./../components/cards/Post";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  reconnection: true,
});

export default function RootLayout({ posts }) {
  const [state, setState] = useContext(UserContext);
  const [newsFeed, setNewsFeed] = useState([]);
  useEffect(() => {
    socket.on("new-post", newPost => {
      setNewsFeed([newPost, ...posts]);
    });
  }, []);
  const collection = newsFeed.length > 0 ? newsFeed : posts;
  useEffect(() => {
    document.body.style.overflow = "auto"; // یا "" برای reset
  }, []);

  return (
    <>
      <Head>
        <title>MERNCAMP - A social network by devs for devs</title>
        <meta
          name="description"
          content="A social netword by developers for other web developers"
        />
        <meta
          property="og:description"
          content="A social netword by developers for other web developers"
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:site_name"
          content="MERNCAMP"
        />
        <meta
          property="og:url"
          content="http://merncamp.com"
        />
        <meta
          property="og:image:secure_url"
          content="http://merncamp.com/images/default.jpg"
        />
      </Head>
      <div className="relative min-h-screen w-full">
        {/* Parallax ثابت پشت محتوا */}
        <ParallaxBG
          url="./images/default.jpg"
          className="fixed top-0 left-0 w-full h-full -z-10"
        />

        {/* محتوای اصلی */}
        <div className="max-w-[1200px] mx-auto py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collection?.map(post => (
            <Link
              key={post._id}
              href={`/post/view/${post._id}`}>
              <Post
                height="140px"
                post={post}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const { data } = await axios.get("http://localhost:8000/api/posts");
  // console.log(data);
  return {
    props: {
      posts: data,
    },
  };
}
