import { useState } from "react";
import Record from "../record";

import Welcome from "./welcome";
import Permission from "./permission";
import Testpage from "../testpage/Testpage";

function Guestbook({ token }) {
  const [state, setState] = useState({
    page: "welcome",
    name: "",
  });
  const { page } = state;

  const next = ({ goto }) =>
    setState({
      page: goto,
    });

  if (page === "welcome") return <Welcome token={token} next={next} />;

  if (page === "test")
    return (
      <Testpage
        token={token}
        back={() => setState({ ...state, page: "welcome" })}
      />
    );

  if (page === "record")
    return (
      <Record
        name={state.name}
        token={token}
        back={() => setState({ page: "welcome" })}
      />
    );

  if (page === "permission") return <Permission />;

  return <div>Error xxx</div>;
}

export default Guestbook;
