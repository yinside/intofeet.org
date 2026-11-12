import type { FaqItem } from "@/lib/content";

export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <div className="faq-item" key={item.question}>
          <h3 className="faq-question">
            <span className="faq-marker" aria-hidden="true">
              Q:
            </span>{" "}
            {item.question}
          </h3>
          <p className="faq-answer">
            <span className="faq-marker" aria-hidden="true">
              A:
            </span>{" "}
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
