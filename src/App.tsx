import { Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./page/Home"
import AboutSection from "./page/AboutSection"
import ContactSection from "./page/ContactoSection"
import ProductsSection from "./page/ProductsSection"
import PQRSection from "./page/PQRSection"
import PrivacyPolicySection from "./page/PrivacyPolySection"
import ReforestationSection from "./page/ReforestationSection"
import EventRegistrationForm from "./components/EventRegistrationForm"
import CookieConsent from "./components/CookieConsent"


function App() {


  return (
    <>
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<AboutSection />} />
    <Route path="contact" element={<ContactSection />} />
    <Route path="productos" element={<ProductsSection />} />
    <Route path="pqr" element={<PQRSection />} />
    <Route path="politica-privacidad" element={<PrivacyPolicySection />} />
    <Route path="reforestacion" element={<ReforestationSection />} />
    
  </Route>
  <Route path="register" element={<EventRegistrationForm />} />
</Routes>
<CookieConsent />
    </>
  )
}

export default App
