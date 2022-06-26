import NotFound from "../../components/notfoundpage";
import Guestbook from "../../components/guestbookpage";

export default function Page(props) {
  const { state, token } = props;

  if (state == "NO_GB" || !token) return <NotFound />;

  return <Guestbook token={token} />;
}

// export async function getStaticPaths(){}

export async function getServerSideProps(context) {
  // NO GUESTBOOK
  if (
    context.query.gbid === process.env["GUESTBOOK"] &&
    context.query.pass === process.env["PASS"]
  )
    return {
      props: {
        state: gbid,
        token: process.env["DROPBOX_TOKEN"],
      },
    };

  return {
    props: {
      state: "NO_GB",
    },
  };
}
