import NotFound from "../../components/notfoundpage";
import Guestbook from "../../components/guestbookpage";

export default function Page(props) {
  const { token } = props;

  if (token) return <Guestbook token={token} />;

  return <NotFound />;
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
        token: process.env["DROPBOX_TOKEN"],
      },
    };

  return {
    props: {},
  };
}
