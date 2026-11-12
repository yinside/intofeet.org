import Link from "next/link";

export interface Crumb {
  name: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <span className="breadcrumbs-label">You are here:</span>
      <ol>
        {items.map((item, index) => (
          <li key={`${item.name}-${index}`}>
            {index > 0 ? (
              <span className="crumb-separator" aria-hidden="true">
                »
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href}>{item.name}</Link>
            ) : (
              <span aria-current="page">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
