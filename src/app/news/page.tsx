import { NewsClient } from "./NewsClient";

export const metadata = {
  title: "News · Global CBDC Tracker",
  description: "Latest news and updates on Central Bank Digital Currencies worldwide",
};

export default function NewsPage() {
  return <NewsClient />;
}
