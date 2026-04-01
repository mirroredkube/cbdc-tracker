import { WatchlistClient } from "./WatchlistClient";

export const metadata = {
  title: "Watchlist · Global CBDC Tracker",
  description: "Your saved CBDC currencies and email subscription settings",
};

export default function WatchlistPage() {
  return <WatchlistClient />;
}
