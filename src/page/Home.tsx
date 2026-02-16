
import HeroBanner from '../components/HeroBanner'
import CertificationsSection from '../components/CertificationSection'
import InternalSoftwareSection from '../components/InternalSoftwareSection'
import CorporateDocumentsSection from '../components/CorporateDocumentsSection'

export default function Home() {
  return (
    <div className='min-h-screen'>
        <HeroBanner />
        <CertificationsSection />
        <CorporateDocumentsSection />
        <InternalSoftwareSection />
    </div>
  )
}
