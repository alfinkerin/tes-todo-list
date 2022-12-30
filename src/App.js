import "../src/assets/styles/tailwind.css";
import { RouterProvider } from "react-router-dom";
import { router } from "../src/routes/route";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
