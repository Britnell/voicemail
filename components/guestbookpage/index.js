import { useState } from "react";
import Record from "../record";

import Welcome from "./welcome";
import Permission from "./permission";

function Guestbook({ token }) {
  const [state, setState] = useState({
    page: "welcome",
    lang: "en",
    name: "",
  });
  const { page } = state;

  const next = ({ lang = "en", goto }) => {
    setState({
      page: goto,
      lang: lang,
    });
  };

  if (page === "welcome") return <Welcome next={next} />;

  if (page === "record") return <Record name={state.name} token={token} />;

  if (page === "permission") return <Permission />;

  return <div>Error xxx</div>;
}

export default Guestbook;
