
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import KnowledgeBases from "./pages/KnowledgeBases";
import KnowledgeChat from "./pages/KnowledgeChat";
import ChannelsAndDatasets from "./pages/ChannelsAndDatasets";
import { EnhancementProvider } from "./contexts/EnhancementContext";
import Header from "./components/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={
            <>
              <Header />
              <EnhancementProvider>
                <Index />
              </EnhancementProvider>
            </>
          } />
          <Route path="/knowledge-bases" element={
            <>
              <Header />
              <KnowledgeBases />
            </>
          } />
          <Route path="/chat/:kbId" element={
            <>
              <Header />
              <KnowledgeChat />
            </>
          } />
          <Route path="/datasets" element={
            <>
              <Header />
              <ChannelsAndDatasets />
            </>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
