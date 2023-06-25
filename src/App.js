import { Toaster } from "react-hot-toast";
import Heading from "./components/heading";
import TaskHeader from "./components/taskHeader";
function App() {
  return (
    <div className="relative">
      <Heading>Task Manager</Heading>
      <hr className="mb-2"/>
      <TaskHeader />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "1rem",
          },
        }}
      />
    </div>
  );
}

export default App;
