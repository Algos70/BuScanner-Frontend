import { useState, useEffect } from 'react';
import ContentHome from '../../Components/ContentHome/ContentHome';
import Footer from '../../Components/Footer/Footer';
import NavBarLarge from '../../Components/NavBar/NavBarLarge/NavBarLarge';
import './Home.css';
import { ProvinceModel } from "../../Models/models";
import { getPopularProvinceNames } from "../../Utils/APIUtils";

function Home() {
  useEffect(() => {
    document.title = "BuScanner | Home";
    
    getPopularProvinceNames().then((response) => {
      setProvinces(response.data);
    }
    );
  }, []);

  const [provinces, setProvinces] = useState<ProvinceModel[]>([]);

  return (
    <div className="home-page">
        <header>
            <NavBarLarge />
        </header>
        <main className='main-home-content'>
            <ContentHome provinces={provinces} />
        </main>
        <footer className="main-footer py-5">
            <Footer />
        </footer>
    </div>
  )
}

export default Home