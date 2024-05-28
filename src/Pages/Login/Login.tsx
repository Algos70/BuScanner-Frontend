import NavBarSmall from "../../Components/NavBar/NavBarSmall/NavBarSmall";
import Footer from "../../Components/Footer/Footer";
import { useEffect } from "react";
import "./Login.css"
import ContentLogin from "../../Components/ContentLogin/ContentLogin";
function Login() {
  useEffect(() => {
    document.title = "BuScanner | Sign in";
  }, []);

  return (
    <div className="login-page">
      <header>
        <NavBarSmall />
      </header>
      <main className="main-content">
        <ContentLogin />
      </main>
      <footer className="main-footer py-5">
        <Footer />
      </footer>
    </div>
  );
}

export default Login;
