import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

const Dashboard = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const spb = useSupabaseClient();
  const router = useRouter();
  return (
    <div>
      <h1>Hello, {props.user.email}</h1>
      <button
        onClick={async () => {
          await spb.auth.signOut();
          router.push("/login");
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
