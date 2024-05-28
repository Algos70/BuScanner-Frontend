import ContentRegister from "../../Components/ContentRegister/ContentRegister";
import NavBarSmall from "../../Components/NavBar/NavBarSmall/NavBarSmall";
import Footer from "../../Components/Footer/Footer";
import { useEffect } from "react";

function Register() {
  useEffect(() => {
    document.title = "BuScanner | Sign up";
  }, []);

  return (
    <div className="register-page">
      <header>
        <NavBarSmall />
      </header>
      <main className="main-content">
        <ContentRegister />
      </main>
      <footer className="main-footer py-5">
        <Footer />
      </footer>
    </div>
  );
}

export default Register;
