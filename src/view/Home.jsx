import Hero from "../components/Hero";
import Highlight from "../components/Highlight";
import Featured from "../components/Featured";
import BuildVideos from "../components/BuildVideos";
import Testimonials from "../components/Testimonials";
import Reviews from "../components/Reviews";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = ({
  handleAddCartHome,
  setOpen,
  open,
  setShow,
  show,
  products,
}) => {
  const navigate = useNavigate();

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
        setShow={setShow}
        show={show}
        products={products}
      />

      <BuildVideos />
      <Reviews />
      <Testimonials />
    </>
  );
};

export default Home;
