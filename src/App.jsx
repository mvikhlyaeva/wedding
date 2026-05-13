import Hero from './components/Hero'
import Invitation from './components/Invitation'
import DateSection from './components/DateSection'
import PhotoStory from './components/PhotoStory'
import Schedule from './components/Schedule'
import Location from './components/Location'
import DressCode from './components/DressCode'
import Gallery from './components/Gallery'
import RSVPForm from './components/RSVPForm'
import Countdown from './components/Countdown'
import MusicToggle from './components/MusicToggle'
import Footer from './components/Footer'

export default function App() {
  return (
    <main className="bg-ivory text-graphite">
      <Hero />
      <Invitation />
      <DateSection />
      <PhotoStory />
      <Schedule />
      <Location />
      <DressCode />
      <Gallery />
      <RSVPForm />
      <Countdown />
      <MusicToggle />
      <Footer />
    </main>
  )
}
