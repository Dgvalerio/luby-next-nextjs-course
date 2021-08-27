import { NextPage } from 'next';
import Image from 'next/image';

import classes from './hero.module.css';

const Hero: NextPage = () => (
  <section className={classes.hero}>
    <div className={classes.image}>
      <Image
        src="/images/site/davi.jpeg"
        alt="An image showing Davi"
        width={300}
        height={300}
      />
    </div>
    <h1>Hi, I&apos;m Davi</h1>
    <p>
      I blog about web development - especially frontend frameworks like React.
    </p>
  </section>
);

export default Hero;
