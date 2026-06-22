import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { EmailPopup } from "@/components/EmailPopup";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Podcast from "@/pages/Podcast";
import DigitalDownloads from "@/pages/DigitalDownloads";
import Shop from "@/pages/Shop";
import Apparel from "@/pages/Apparel";
import Work from "@/pages/Work";
import Privacy from "@/pages/Privacy";
import SignInPage from "@/pages/SignIn";
import SignUpPage from "@/pages/SignUp";
import PortalIndex from "@/pages/portal/PortalIndex";
import PortalProjectPage from "@/pages/portal/PortalProject";
import AdminIndex from "@/pages/admin/AdminIndex";
import { BlogListPage } from "@/pages/blog/BlogListPage";
import { BlogPostPage } from "@/pages/blog/BlogPostPage";
import { BlogEditorPage } from "@/pages/blog/BlogEditorPage";
import RedeemLanding from "@/pages/RedeemLanding";
import AppLandingPage from "@/pages/AppLandingPage";
import { TeaserProvider } from "@/context/TeaserContext";
import { TeaserBanner } from "@/components/app/TeaserBanner";
import { AnnouncementModal } from "@/components/app/AnnouncementModal";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/podcast" component={Podcast} />
      <Route path="/digital-downloads" component={DigitalDownloads} />
      <Route path="/shop" component={Shop} />
      <Route path="/apparel" component={Apparel} />
      <Route path="/crew-collection" component={Apparel} />
      <Route path="/work" component={Work} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/sign-in" component={SignInPage} />
      <Route path="/sign-in/:rest*" component={SignInPage} />
      <Route path="/sign-up" component={SignUpPage} />
      <Route path="/sign-up/:rest*" component={SignUpPage} />
      <Route path="/portal" component={PortalIndex} />
      <Route path="/portal/projects/:id" component={PortalProjectPage} />
      <Route path="/admin" component={AdminIndex} />
      <Route path="/blog" component={BlogListPage} />
      <Route path="/blog/new" component={BlogEditorPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route path="/r/:code" component={RedeemLanding} />
      <Route path="/app" component={AppLandingPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TeaserProvider>
          <TeaserBanner />
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <AnnouncementModal />
          <EmailPopup />
          <Toaster />
        </TeaserProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
