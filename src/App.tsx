import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { TripProvider } from "@/contexts/TripContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import TripDetails from "./pages/TripDetails";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Roadmap from "./pages/Roadmap";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <TripProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <TripDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/app/trip/:tripId/flights"
                element={
                  <ProtectedRoute>
                    <Flights />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/app/trip/:tripId/hotels"
                element={
                  <ProtectedRoute>
                    <Hotels />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/app/trip/:tripId/roadmap"
                element={
                  <ProtectedRoute>
                    <Roadmap />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TripProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
