import { Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProjectProvider } from "./contexts/projectContext";

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Outlet />
      </ProjectProvider> 
    </AuthProvider>
  );
}

export default App;
