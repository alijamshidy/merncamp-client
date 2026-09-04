import axios from "axios";
import Head from "next/head";
import Post from "../../../components/cards/Post";
import ParallaxBG from "./../../../components/cards/ParallaxBG";

export default function SinglePost({ post }) {
  return (
    <>
      <Head>
        <title>MERNCAMP - A social network by devs for devs</title>
        <meta
          name="description"
          content={post.context}
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
          content={`http://merncamp.com/post/view/${post._id}`}
        />
        <meta
          property="og:image:secure_url"
          content={post?.image?.url || "http:merncamp.com/images/default.jpg"}
        />
      </Head>
      <div className="w-full flex flex-col justify-center items-center">
        <ParallaxBG url={"/images/default.jpg"} />
        <div className="flex w-[70%] mx-auto justify-center items-start gap-3">
          <Post
            height={"140px"}
            key={post?._id}
            post={post}
          />
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(ctx) {
  console.log(ctx.params._id);
  const { data } = await axios.get(`/post/${ctx.params._id}`);
  // console.log(data);
  return {
    props: {
      post: data,
    },
  };
}
