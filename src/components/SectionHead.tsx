import { Sparkle } from "./Icons";
import { LineReveal, Reveal } from "./motion/Reveal";

type Props = {
  num: string;
  eyebrow: string;
  title: React.ReactNode[]; // one entry per line
  lead?: React.ReactNode;
  align?: "split" | "center" | "left";
  aside?: React.ReactNode;
};

/** Shared section heading: divider → eyebrow → masked serif title → lead. */
export function SectionHead({ num, eyebrow, title, lead, align = "split", aside }: Props) {
  return (
    <>
      <Reveal y={0}><div className="divider" aria-hidden><span><Sparkle width={12} height={12} /></span></div></Reveal>
      <div className={`sec-head sec-head--${align}`}>
        <div style={{ display: "grid", gap: 16 }}>
          <Reveal y={12}><span className="eyebrow"><span className="sec-num">{num}</span> — {eyebrow}</span></Reveal>
          <h2 className="h1">{title.map((line, i) => <LineReveal key={i} delay={0.08 * i}>{line}</LineReveal>)}</h2>
        </div>
        {(lead || aside) && (
          <Reveal delay={0.2} style={{ display: "grid", gap: 20, justifyItems: align === "center" ? "center" : "start" }}>
            {lead && <p className="lead">{lead}</p>}
            {aside}
          </Reveal>
        )}
      </div>
    </>
  );
}
