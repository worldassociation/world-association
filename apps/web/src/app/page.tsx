import Link from "next/link";

export default function Home() {
  return (
    <div className="py-20">
      <Header />

      <Menu />

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <h1 className="text-5xl md:text-7xl text-center font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        World Association
      </h1>

      <p className="text-zinc-300 text-base text-center">
        The democratic United Nations alternative.
      </p>
    </header>
  );
}

function Menu() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <MenuItem
        title="Prove your personhood"
        href="/proof-of-personhood"
        description="Join us completely anonymously by proving only that they are a real and unique human."
      />

      <MenuItem
        title="Collect your governance token"
        href="/governance-token"
        description="Get your onchain membership card and start experimenting with global democracy."
      />

      <MenuItem
        title="Claim your basic income"
        href="/basic-income"
        description="Make our official currency, the world dracha, flowing into your account every second."
      />
    </div>
  );
}

function MenuItem(props: { title: string; href: string; description: string }) {
  return (
    <Link
      href={props.href}
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </Link>
  );
}

function Footer() {
  return (
    <div className="flex flex-col items-center mt-20 md:mb-20">
      <Link
        className="text-center text-sm text-gray-400"
        target="_blank"
        href="https://github.com/worldassociation/world-association"
      >
        Operating fully on GitHub
      </Link>
    </div>
  );
}
