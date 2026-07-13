import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span className="section-kicker">404 / Off the map</span>
      <h1>This page moved beyond the frame.</h1>
      <p>The route does not exist, but the rest of the portfolio is exactly where it should be.</p>
      <Link className="button button-primary" href="/">
        Return home <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
