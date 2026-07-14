# The Quiet Control Plane

The portfolio uses a calm editorial system that demonstrates technical authority through evidence. It intentionally avoids the generic dark DevOps vocabulary of fake terminals, glass panels, indigo gradients, and decorative motion.

## Visual foundation

| Token | Decision |
|---|---|
| Canvas | Mineral paper `#f2f0e8` |
| Ink | Near-black green `#17211c` |
| Operational | Deep green `#174d36` |
| Signal | Lime `#b7db36`, reserved for active states |
| Accent | Rust `#b65f3d`, reserved for indexing and focus |
| Editorial type | Native serif stack for headlines |
| Interface type | Native sans-serif stack for body and navigation |
| Technical type | Native monospace stack for metadata and status |

Native font stacks are deliberate: the static site has no third-party font request and remains readable under degraded network conditions.

## Signature

The operating thesis is expressed as a vertical sequence:

`Signals → Decisions → Automation → Outcomes`

This is content, not decoration. It explains how observability becomes reliable delivery and economic efficiency.

## Interaction rules

- Use sharp, architectural boundaries and generous whitespace.
- Use motion only when it conveys state; core meaning cannot depend on it.
- Keep LinkedIn as the primary conversion action.
- Present outcomes with context and a confidentiality note.
- Maintain keyboard-visible focus and respect `prefers-reduced-motion`.
- Do not add glassmorphism, fake terminals, indigo/purple gradients, magnetic controls, or animated background grids.

## Implementation source of truth

The current implementation is Astro static output with TypeScript. Global tokens and responsive rules live in `src/styles/global.css`; page structure lives in `src/components/HomePage.astro`; bilingual copy lives in `src/data/site.ts`.
