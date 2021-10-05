import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div id="Footer" className="flex items-center h-footer justify-center">
        <Image
          src="/LOGO MOSAICO MOD COLOR.png"
          width={195}
          height={67}
        />
        <Link href="/">
            <Image
              src="/fb-logo.png"
              width={26}
              height={26}
            />
          </Link>
          <Link href="/">
            <Image
              src="/insta-logo.png"
              width={26}
              height={26}

            />
          </Link>
      </div>
      <div className="flex h-3 w-auto bg-primary"></div>
    </footer>
  );
}
