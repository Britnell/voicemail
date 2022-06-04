import NotFound from "../../components/notfoundpage";
import Guestbook from "../../components/guestbookpage";

export default function Page(props) {
  const { state, token } = props;

  if (state == "NO_GB" || !token) return <NotFound />;

  return <Guestbook token={token} />;
}

export async function getServerSideProps(context) {
  const gbid = context.query.gbid;
  let guestbook = process.env["GUESTBOOK"].split(":");

  // NO GUESTBOOK
  if (guestbook[0] !== gbid || context.query.pass !== guestbook[1])
    return {
      props: {
        state: "NO_GB",
      },
    };

  return {
    props: {
      state: gbid,
      token: process.env["DROPBOX_TOKEN"],
    },
  };
}
