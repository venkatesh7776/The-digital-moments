/**
 * Pulli kolams scattered in the empty space either side of the hero text.
 * Static, very light gold at low opacity, behind everything; a separate arrangement for phones.
 */
const KOLAMS: { side: "left" | "right"; x: string; y: number; size: number; o: number; m?: boolean }[] = [
  // desktop: one column each side — large, small, large (as in the reference)
  { side: "left", x: "8%", y: 70, size: 124, o: 0.24 },
  { side: "left", x: "9.5%", y: 285, size: 82, o: 0.2 },
  { side: "left", x: "8%", y: 430, size: 124, o: 0.24 },
  { side: "right", x: "8%", y: 70, size: 124, o: 0.24 },
  { side: "right", x: "9.5%", y: 285, size: 82, o: 0.2 },
  { side: "right", x: "8%", y: 430, size: 124, o: 0.24 },
  // phones/tablets: corners by the logo, very faint behind the headline, and either side of the button
  { side: "left", x: "10px", y: 22, size: 76, o: 0.26, m: true },
  { side: "right", x: "10px", y: 96, size: 64, o: 0.22, m: true },
  { side: "left", x: "-8px", y: 236, size: 72, o: 0.12, m: true },
  { side: "right", x: "-8px", y: 212, size: 72, o: 0.12, m: true },
  { side: "left", x: "14px", y: 430, size: 70, o: 0.24, m: true },
  { side: "right", x: "14px", y: 430, size: 70, o: 0.24, m: true },
];

export function HeroKolams() {
  return (
    <div className="hd-kolams" aria-hidden>
      {KOLAMS.map((k, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          className={`hd-kolam${k.m ? " hd-kolam--m" : ""}`}
          src="/brand/kolam.svg"
          alt=""
          width={k.size}
          height={k.size}
          style={{ [k.side]: k.x, top: k.y, width: k.size, height: k.size, opacity: k.o }}
        />
      ))}
    </div>
  );
}
