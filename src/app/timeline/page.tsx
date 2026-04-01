import { TimelineClient } from "./TimelineClient";

export const metadata = {
  title: "Timeline · Global CBDC Tracker",
  description: "History of CBDC status changes, launches, and key milestones worldwide",
};

export default function TimelinePage() {
  return <TimelineClient />;
}
