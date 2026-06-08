type Tone = "fg" | "insight" | "phos";

const dot: Record<Tone, string> = {
  fg: "bg-fg/40",
  insight: "bg-insight",
  phos: "bg-phos",
};

export function Bullets({ items, tone = "fg" }: { items: string[]; tone?: Tone }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className={`mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 ${dot[tone]}`} />
          <span className="text-fg/85 text-sm leading-relaxed">{it}</span>
        </li>
      ))}
    </ul>
  );
}
