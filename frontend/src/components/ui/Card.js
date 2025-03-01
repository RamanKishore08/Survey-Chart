import { Card as BootstrapCard } from "react-bootstrap";

export function Card({ children }) {
  return (
    <BootstrapCard className="p-4 shadow-sm border">
      <BootstrapCard.Body>{children}</BootstrapCard.Body>
    </BootstrapCard>
  );
}
