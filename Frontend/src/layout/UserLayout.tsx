import Header from "../components/Navbar";
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom";
const UserLayout = () => {
    return (
        <>
            {/* header*/}
            <Header />
           {/* main */}
            <main>
                <Outlet/>
            </main>
            {/* footer */}
            <Footer/>
        </>
    );
};


export default UserLayout;