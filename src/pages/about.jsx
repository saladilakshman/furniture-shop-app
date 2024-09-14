import aboutImage from "../assets/about.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
const About = () => {
  return (
    <section className="container mx-auto lg:px-24 my-12 px-2">
      <div className="flex lg:flex-row flex-col justify-between items-center gap-8">
        <LazyLoadImage
          src={aboutImage}
          alt=""
          className="max-w-sm rounded-lg max-md:px-4"
        />
        <div className="flex flex-col justify-center items-baseline gap-4 ">
          <h2 className="lg:text-2xl text-xl font-semibold capitalize text-nowrap">
            our story
          </h2>
          <p className="text-balance tracking-normal leading-relaxed text-justify">
            At Comfysloth, we began with a simple mission: to create beautiful,
            comfortable, and affordable furniture that makes every home feel
            unique. What started as a small workshop has grown into a thriving
            e-commerce business, thanks to our passion for design and commitment
            to quality. Over the years, we’ve built a reputation for exceptional
            craftsmanship and innovative designs that cater to various tastes
            and lifestyles. We believe that furniture is more than just decor;
            it’s an expression of your personality and a key element in creating
            a welcoming space. As we continue to grow, our focus remains on
            delivering products that inspire and delight, with an unwavering
            dedication to customer satisfaction. Thank you for being part of our
            journey. We look forward to helping you create the home of your
            dreams.
          </p>
        </div>
      </div>
      <h3 className=" text-sm text-center lg:text-xl lg:mt-28 mt-16 mb-6 max-md:mb-20">
        All rights reserved by comfysloth &copy; {new Date().getFullYear()}
      </h3>
    </section>
  );
};

export default About;
