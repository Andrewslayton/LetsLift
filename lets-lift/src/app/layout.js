import './globals.css'
import Providers from '../components/providers';
import SignInButton from "../components/SignInButton";
import { Background } from "@/components/animatedBackground";

export const metadata = {
  title: 'Lets Lift ',
  description: 'Find a gym partner in your area',
}

export default function RootLayout({ Component, pageProps, Session ,children }) {
  return (
    <html lang="en">
      <body className='text-white bg-black'>
              <Providers>
        <SignInButton/>
        {children}
      </Providers>
      </body>
    </html>
  );
}
