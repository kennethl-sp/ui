# @suryapamenang/ui

Shared React UI primitives, composite components and styles for Surya Pamenang application frontends.

Built on [shadcn/ui](https://ui.shadcn.com/) primitives, Tailwind CSS v4 and Radix UI.

## Requirements

- Node.js >= 22
- pnpm >= 10

## Installation

```sh
pnpm add @suryapamenang/ui
```

Peer dependencies are installed automatically by pnpm (`auto-install-peers=true`). With npm/yarn you must install them manually, see `peerDependencies` in `package.json`.

### Add the styles

The package ships a prebuilt Tailwind browser `.css` containing the design tokens. Import it once in your app (e.g. `app.css`):

```css
@import "@suryapamenang/ui/styles.css";
```

> Note: the stylesheet already includes Tailwind, animations ([tw-animate-css](https://github.com/originjs/tw-animate-css)) and the `tailwind-scrollbar-hide` plugin. Do **not** import `tailwindcss` twice in the consuming app.

### Import components

```tsx
import { Button } from "@suryapamenang/ui/primitives/button";
import { Card, CardContent } from "@suryapamenang/ui/primitives/card";
import { cn } from "@suryapamenang/ui/lib/utils";
import { useIsMobile } from "@suryapamenang/ui/hooks/use-mobile";
```

Exports are split by folder:

- `@suryapamenang/ui/primitives/*` – low-level UI primitives (button, dialog, select, …)
- `@suryapamenang/ui/components/*` – composite components (plate editor, file upload, multi-step viewer, …)
- `@suryapamenang/ui/hooks/*` – shared hooks
- `@suryapamenang/ui/lib/utils` – `cn()` helper

### Theming

Theme tokens are plain CSS variables defined in `src/styles/styles.css` (`--background`, `--primary`, `--brand`, `--highlight`, …). Override them after the stylesheet import to theme your app:

```css
@import "@suryapamenang/ui/styles.css";

:root {
  --primary: oklch(0.45 0.2 150);
}
```

Dark mode is a `.dark` class strategy (`@custom-variant dark (&:is(.dark *))`).

## Development

```sh
pnpm install
pnpm dev:styles    # tailwind watch -> dist/index.css
pnpm dev:components # tsc watch -> dist
pnpm build         # styles + components
pnpm check-types
pnpm lint          # biome
```

New shadcn-style components can be added with the CLI and the bundled `components.json`.

## Publishing

Releases are managed with [release-please](https://github.com/googleapis/release-please-action). On merge to `main`, release-please opens a release PR; when merged, `.github/workflows/release.yaml` publishes via npm [trusted publishing (OIDC)](https://docs.npmjs.com/trusted-publishers) — no npm token is stored in CI. Both workflows run inside the nix development shell (see `flake.nix`).

The first version must be published manually (`npm login`, then `npm publish`) so the package exists on the registry, then configure the trusted publisher on the package's npm access page pointing at this repository's `release.yaml` workflow.

## License

Proprietary. Internal Surya Pamenang library.