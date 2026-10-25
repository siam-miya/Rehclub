import Footer from "@/components/store/Footer";
import Navbar from "@/components/store/Navbar";
import Topbar from "@/components/store/Topbar";


export default function StoreLayout({ children }) {
  return (
    <div>
        <Topbar/>
        <Navbar/>
      <main className="flex-1">{children}</main>
      <Footer/>
    </div>
  );
}