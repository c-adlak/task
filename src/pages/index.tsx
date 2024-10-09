import type { NextPage } from "next";
import { CreateRequestMainComponent } from "../components/CreateRequestMainComponent";

const Home: NextPage = () => {
  return (
    <div className="container mx-auto p-4">
      <CreateRequestMainComponent />
    </div>
  );
};

export default Home;
