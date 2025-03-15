import Link from "next/link";

export const OrFooter = () => {
  return (
    <footer className="flex bg-neutral-700 items-center justify-center px-6 md:px-32 py-16">
      <figure>
        <Link href="/">
          <img src={"/apply-digital-logo.svg"} alt={"Apply Digital"} />
        </Link>
      </figure>
    </footer>
  );
};
