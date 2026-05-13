import Hero from './components/Hero'
import Invitation from './components/Invitation'
import DateSection from './components/DateSection'
import Memories from './components/Memories'
import PhotoStory from './components/PhotoStory'
import Schedule from './components/Schedule'
import Location from './components/Location'
import DressCode from './components/DressCode'
import RSVPForm from './components/RSVPForm'
import Countdown from './components/Countdown'
import MusicToggle from './components/MusicToggle'
import Footer from './components/Footer'

export default function App() {
  return (
    <main className="bg-ivory text-ink">
      <Hero />
      <Invitation />
      <DateSection />
      <Memories />
      <PhotoStory />
      <Schedule />
      <Location />
      <DressCode />
      <RSVPForm />
      <Countdown />
      <MusicToggle />
      <Footer />
    </main>
  )
}
