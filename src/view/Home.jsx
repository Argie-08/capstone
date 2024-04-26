import Hero from "../components/Hero";
import Highlight from "../components/Highlight";
import Featured from "../components/Featured";
import BuildVideos from "../components/BuildVideos";
import Testimonials from "../components/Testimonials";
import Reviews from "../components/Reviews";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";

const Home = ({ handleAddCartHome, setOpen, open }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("username"))
  );
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    return () => {};
  });

  function handleHere() {
    navigate("/shop");
  }

  return (
    <>
      <Hero />
      <Highlight data={handleHere} />
      <Featured
        handleAddCartHome={handleAddCartHome}
        setOpen={setOpen}
        open={open}
      />

      <BuildVideos />
      <Reviews />
      <Testimonials />
    </>
  );
};

export default Home;
