import { useRef } from "react";
import Categories from "./categories";
import Footer from "./footer";

export default function Layout({ children }) {
    const topRef = useRef(null);

    return (
        <div className="App">
            <div ref={topRef} />

            {/* <NavBar /> */}
            <Categories />
            {children}

            <Footer topRef={topRef} />
        </div>
    );
}
