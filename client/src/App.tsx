import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/ui/theme-provider";
import Layout from "./components/Layout";
import Home from "./pages/Home";

const Profile = lazy(() => import("./pages/Profile"));
const Projects = lazy(() => import("./pages/Projects"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Skills = lazy(() => import("./pages/Skills"));
const Extracurricular = lazy(() => import("./pages/Extracurricular"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/not-found"));

function Router() {
  return (
    <Layout>
      <Suspense fallback={<p role="status" className="p-8 text-center">Loading page…</p>}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/projects/:slug" component={CaseStudy} />
          <Route path="/projects" component={Projects} />
          <Route path="/skills" component={Skills} />
          <Route path="/activities" component={Extracurricular} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
