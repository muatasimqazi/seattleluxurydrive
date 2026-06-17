"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  name: string;
  items: FaqItem[];
}

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function FaqAccordion({ items, categorySlug }: { items: FaqItem[]; categorySlug: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const btnId = `faq-btn-${categorySlug}-${i}`;
        const panelId = `faq-panel-${categorySlug}-${i}`;

        return (
          <div key={btnId} className="border-b border-gold/20">
            <h3>
              <button
                id={btnId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full flex items-center justify-between gap-6 py-6 text-left group"
              >
                <span className="font-heading text-lg font-medium text-offwhite group-hover:text-gold transition-colors lg:text-xl">
                  {item.q}
                </span>
                <span className="shrink-0 text-gold" aria-hidden="true">
                  {isOpen ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pb-6"
            >
              <p className="font-sans text-sm leading-relaxed text-offwhite/65">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FaqCategoryNav({
  categories,
  activeCategory,
  onSelect,
}: {
  categories: FaqCategory[];
  activeCategory: string;
  onSelect: (name: string) => void;
}) {
  return (
    <nav aria-label="FAQ categories">
      <ul className="space-y-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <li key={cat.name}>
              <button
                onClick={() => onSelect(cat.name)}
                aria-current={isActive ? "true" : undefined}
                className={`w-full text-left px-4 py-3 font-sans text-sm transition-colors border-l-2 ${
                  isActive
                    ? "border-gold text-gold bg-gold/5"
                    : "border-transparent text-offwhite/60 hover:text-offwhite hover:border-offwhite/20"
                }`}
              >
                {cat.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function FaqPanel({ categories }: { categories: FaqCategory[] }) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.name ?? "");
  const active = categories.find((c) => c.name === activeCategory);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-lt mb-4 px-4" aria-hidden="true">
          Categories
        </p>
        <FaqCategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>

      {/* Content */}
      <div aria-live="polite" aria-atomic="true">
        {active && (
          <>
            <h2 className="font-heading text-3xl font-light text-offwhite mb-8">
              {active.name}
            </h2>
            <FaqAccordion items={active.items} categorySlug={slugify(active.name)} />
          </>
        )}
      </div>
    </div>
  );
}
