
import Header from "./Header";

import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="bg-black">
     <Header />
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
  );
}