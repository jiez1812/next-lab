import Modal from "../components/modal";
import ThemeChanger from "../components/themeChanger";

export default function Hero() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <ThemeChanger/>
          <div className="hero-content text-center">
            <div className="max-x-md">
              <h1 className="text-6xl font-bold italic">NextJS Lab</h1>
              <p className="py-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id augue vel.
              </p>
              <Modal btnText="Click Here to Start" title="You clicked the button" message="Sorry, nothing happens here."></Modal>
            </div>
          </div>
        </div>
    );
  }