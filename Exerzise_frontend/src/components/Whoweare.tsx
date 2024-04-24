import CommonBtn from "./CommonBtn";

const Whoweare = () => {
  return (
    <div className="flex justify-center mx-auto my-10 gap-x-10 md:w-1/2 flex-shrink-0">
      <div className="flex flex-col w-1/2 gap-y-6">
        <b className="text-xl">
          We care about your health and life performance
        </b>
        <p>
          We are a platform committed to empowering individuals, regardless of
          their experience level, to attain their desired physique and enhance
          their body's performance. Our team of experienced trainers and
          nutrition specialists will work alongside you to create a personalized
          fitness and nutrition plan aimed at assisting you in reaching your
          specific goals.
        </p>
        <CommonBtn placeholder={"contact us for more info"} />
      </div>
      <div className="w-100 relative hidden md:block">
        <img
          src="https://www.pngkit.com/png/full/135-1351579_red-effect-png-jpg-royalty-free-download-red.png"
          alt=""
          className="absolute top-0 left-0"
        />
        <img
          src="https://clipart-library.com/8300/1931/coach-clipart-sm.png"
          alt=""
          className="grayscale object-contain top-0 left-0"
        />
      </div>
    </div>
  );
};

export default Whoweare;
