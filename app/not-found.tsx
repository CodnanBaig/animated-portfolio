import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span className="section-label">404 / Off the map</span>
      <h1>
        A wrong turn.
        <br />A fresh start.
      </h1>
      <p>
        This page isn’t here. There’s plenty to explore back in the collection.
      </p>
      <Link className="text-link" href="/">
        Return home <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
