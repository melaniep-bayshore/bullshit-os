import Link from "next/link";

export default function NoRealAppPage() {
  return (
    <main className="void-room">
      <div className="void-copy">
        <p>There is no real app.</p>
        <p>Du wurdest reingelegt.</p>
        <Link className="void-back" href="/">
          Back
        </Link>
      </div>
    </main>
  );
}
