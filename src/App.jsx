import { useEffect, useState } from 'react'

import { Route, Routes } from 'react-router-dom'

import Header from './components/header/Header'
import Login from './components/header/HeaderComponent/Login'
import SignUp from './components/header/HeaderComponent/SignUp'
import HomePage from './components/homePage/HomePage'
import BrowseReadingQuran from './components/homePage/browseReadingQuran/BrowseReadingQuran'
import QuranReciters from './components/homePage/QuranReciters/QuranReciters'
import RadioPage from './components/homePage/RadioPage/RadioPage'
import Azkar from './components/homePage/Azkar/Azkar'
import TafsirQuran from './components/homePage/TafsirQuran/TafsirQuran'
import TasbeehCounter from './components/homePage/TasbeehCounter/TasbeehCounter'
import SoundQuranSurah from './components/homePage/SoundQuranSurah/SoundQuranSurah'
import Footer from './components/footer/Footer'
import InformationAboutUs from './components/header/HeaderComponent/InformationAboutUs'
import Loading1 from './components/Loading/Loading1'

// import AudioPlayerBarGlobal from './components/AudioPlayerBarGlobal/AudioPlayerBarGlobal'
import AudioPlayerBarGlobal2 from './components/AudioPlayerBarGlobal/AudioPlayerBarGlobal2'
import { useSelector } from 'react-redux'



function App() {

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1700);
  }, []);

  return (
    <>
      {loading ? (
        <Loading1 />
      ) : (
        <div className={`app ${darkMode ? 'bg-black' : 'bg-white'}`}>
          <Header />
          <Routes>
            <Route path='*' element={<HomePage />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/browseQuran' element={<BrowseReadingQuran />} />
            <Route path='/browseReciters' element={<QuranReciters />} />
            <Route path='/soundSurah/:newStyle' element={<SoundQuranSurah />} />
            <Route path='/radioFm' element={<RadioPage />} />
            <Route path='/azkar' element={<Azkar />} />
            <Route path='/tafsir' element={<TafsirQuran />} />
            <Route path='/rosaryOnline' element={<TasbeehCounter />} />
            <Route path='/infoWebsite' element={<InformationAboutUs />} />
          </Routes>
          <Footer />
          <AudioPlayerBarGlobal2 />
        </div>
      )}

    </>
  )
}

export default App