// components/home/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 pb-4">
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            &copy; {currentYear} Travimap. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <p className="text-gray-400">
            Developed and supported by<Link href='https://codeinshort.in' className='text-blue-800'> codeinshort</Link>
          </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;