import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import AppLayout from "./components/layout/AppLayout";
import Architecture from "./pages/Architecture";
import Comparison from "./pages/Comparison";
import Datasets from "./pages/Datasets";
import Enhance from "./pages/Enhance";
import Home from "./pages/Home";
import Pipeline from "./pages/Pipeline";
import Results from "./pages/Results";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import PageNotFound from "./lib/PageNotFound";
import { queryClientInstance } from "@/lib/query-client";

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (authError) {
    if (authError.type === "user_not_registered") {
      return <UserNotRegisteredError />;
    }

    if (authError.type === "auth_required") {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/enhance" element={<Enhance />} />
        <Route path="/results" element={<Results />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/datasets" element={<Datasets />} />
        <Route path="/comparison" element={<Comparison />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
