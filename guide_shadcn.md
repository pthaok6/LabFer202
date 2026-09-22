---
title: shadcn
description: Use the shadcn CLI to add components to your project.
---

import { TriangleAlertIcon } from "lucide-react"

## init

Use the `init` command to initialize configuration and dependencies for an existing project, or create a new project with `--name`.

The `init` command installs dependencies, adds the `cn` util and configures CSS variables for the project.

```bash
npx shadcn@latest init
```

**Options**

```bash
Usage: shadcn init [options] [components...]

initialize your project and install dependencies

Arguments:
  components                 names, url or local path to component

Options:
  -t, --template <template>  the template to use. (next, vite, start, react-router, laravel, astro)
  -b, --base <base>          the component library to use. (base, radix, aria)
  -p, --preset [name]        use a preset configuration
  -y, --yes                  skip confirmation prompt. (default: true)
  -d, --defaults             use default configuration: --template=next --preset=nova (default: false)
  -f, --force                force overwrite of existing configuration. (default: false)
  -c, --cwd <cwd>            the working directory. defaults to the current directory.
  -n, --name <name>          the name for the new project.
  -s, --silent               mute output. (default: false)
  --css-variables            use css variables for theming. (default: true)
  --no-css-variables         do not use css variables for theming.
  --monorepo                 scaffold a monorepo project.
  --no-monorepo              skip the monorepo prompt.
  --rtl                      enable RTL support.
  --no-rtl                   disable RTL support.
  --pointer                  enable pointer cursor for buttons.
  --no-pointer               disable pointer cursor for buttons.
  --reinstall                re-install existing UI components.
  --no-reinstall             do not re-install existing UI components.
  -h, --help                 display help for command
```

The `create` command is an alias for `init`:

```bash
npx shadcn@latest create
```

---

## add

Use the `add` command to add components and dependencies to your project.

```bash
npx shadcn@latest add [component]
```

**Options**

```bash
Usage: shadcn add [options] [components...]

add a component to your project

Arguments:
  components           name, url or local path to component

Options:
  -y, --yes            skip confirmation prompt. (default: false)
  -o, --overwrite      overwrite existing files. (default: false)
  -c, --cwd <cwd>      the working directory. defaults to the current directory.
  -a, --all            add all available components (default: false)
  -p, --path <path>    the path to add the component to.
  -s, --silent         mute output. (default: false)
  --dry-run            preview changes without writing files. (default: false)
  --diff [path]        show diff for a file.
  --view [path]        show file contents.
  -h, --help           display help for command
```

---

## apply

Use the `apply` command to apply a preset to an existing project.

```bash
npx shadcn@latest apply a2r6bw
```

You can apply only the theme or fonts from a preset without reinstalling UI components:

```bash
npx shadcn@latest apply a2r6bw --only theme
```

Supported values for `--only` are `theme` and `font`.

**Options**

```bash
Usage: shadcn apply [options] [preset]

apply a preset to an existing project

Arguments:
  preset             the preset to apply

Options:
  --preset <preset>  preset configuration to apply
  --only [parts]     apply only parts of a preset: theme, font
  -y, --yes          skip confirmation prompt. (default: false)
  -c, --cwd <cwd>    the working directory. defaults to the current directory.
  -s, --silent       mute output. (default: false)
  -h, --help         display help for command
```

---

## preset

Use the `preset` command to inspect preset codes and resolve the preset for an existing project.

```bash
npx shadcn@latest preset decode a2r6bw
```

### preset decode

Use `preset decode` to decode a preset code.

```bash
npx shadcn@latest preset decode a2r6bw
```

**Options**

```bash
Usage: shadcn preset decode [options] <code>

decode a preset code

Arguments:
  code        the preset code to decode

Options:
  --json      output as JSON. (default: false)
  -h, --help  display help for command
```

### preset resolve

Use `preset resolve` to resolve the preset from the current project.

```bash
npx shadcn@latest preset resolve
```

The `preset info` command is an alias for `preset resolve`:

```bash
npx shadcn@latest preset info
```

**Options**

```bash
Usage: shadcn preset resolve|info [options]

resolve a preset from your project

Options:
  -c, --cwd <cwd>  the working directory. defaults to the current directory.
  --json            output as JSON. (default: false)
  -h, --help        display help for command
```

### preset url

Use `preset url` to print the create URL for a preset code.

```bash
npx shadcn@latest preset url a2r6bw
```

**Options**

```bash
Usage: shadcn preset url [options] <code>

get the create URL for a preset code

Arguments:
  code        the preset code

Options:
  -h, --help  display help for command
```

### preset open

Use `preset open` to open a preset code in the browser.

```bash
npx shadcn@latest preset open a2r6bw
```

**Options**

```bash
Usage: shadcn preset open [options] <code>

open a preset code in the browser

Arguments:
  code        the preset code

Options:
  -h, --help  display help for command
```

---

## view

Use the `view` command to view items from the registry before installing them.

```bash
npx shadcn@latest view [item]
```

You can view multiple items at once:

```bash
npx shadcn@latest view button card dialog
```

Or view items from namespaced registries:

```bash
npx shadcn@latest view @acme/auth @v0/dashboard
```

**Options**

```bash
Usage: shadcn view [options] <items...>

view items from the registry

Arguments:
  items            the item names or URLs to view

Options:
  -c, --cwd <cwd>  the working directory. defaults to the current directory.
  -h, --help       display help for command
```

---

## search

Use the `search` command to search for items from registries.

```bash
npx shadcn@latest search [registry]
```

You can search with a query:

```bash
npx shadcn@latest search @shadcn -q "button"
```

Or search multiple registries at once:

```bash
npx shadcn@latest search @shadcn @v0 @acme
```

The `list` command is an alias for `search`:

```bash
npx shadcn@latest list @acme
```

**Options**

```bash
Usage: shadcn search|list [options] <registries...>

search items from registries

Arguments:
  registries             the registry names or urls to search items from. Names
                         must be prefixed with @.

Options:
  -c, --cwd <cwd>        the working directory. defaults to the current directory.
  -q, --query <query>    query string
  -l, --limit <number>   maximum number of items to display per registry (default: "100")
  -o, --offset <number>  number of items to skip (default: "0")
  -h, --help             display help for command
```

---

## build

Use the `build` command to generate the registry JSON files.

```bash
npx shadcn@latest build
```

This command reads the `registry.json` file and generates the registry JSON files in the `public/r` directory.

**Options**

```bash
Usage: shadcn build [options] [registry]

build components for a shadcn registry

Arguments:
  registry             path to registry.json file (default: "./registry.json")

Options:
  -o, --output <path>  destination directory for json files (default: "./public/r")
  -c, --cwd <cwd>      the working directory. defaults to the current directory.
  -h, --help           display help for command
```

To customize the output directory, use the `--output` option.

```bash
npx shadcn@latest build --output ./public/registry
```

---

## docs

Use the `docs` command to fetch documentation and API references for components.

```bash
npx shadcn@latest docs [component]
```

**Options**

```bash
Usage: shadcn docs [options] [component]

fetch documentation and API references for components

Arguments:
  component          the component to get docs for

Options:
  -c, --cwd <cwd>    the working directory. defaults to the current directory.
  -b, --base <base>  the base to use: base, radix, or aria. defaults to project base.
  --json             output as JSON. (default: false)
  -h, --help         display help for command
```

---

## info

Use the `info` command to get information about your project.

```bash
npx shadcn@latest info
```

**Options**

```bash
Usage: shadcn info [options]

get information about your project

Options:
  -c, --cwd <cwd>  the working directory. defaults to the current directory.
  --json            output as JSON. (default: false)
  -h, --help        display help for command
```

---

## migrate

Use the `migrate` command to run migrations on your project.

```bash
npx shadcn@latest migrate [migration]
```

**Available Migrations**

| Migration    | Description                                             |
| ------------ | ------------------------------------------------------- |
| `cn`         | Migrate `clsx` and `tailwind-merge` to `cn`.            |
| `icons`      | Migrate your UI components to a different icon library. |
| `base-color` | Migrate your theme to a different base color.           |
| `radix`      | Migrate to radix-ui.                                    |
| `rtl`        | Migrate your components to support RTL (right-to-left). |

**Options**

```bash
Usage: shadcn migrate [options] [migration] [path]

run a migration.

Arguments:
  migration          the migration to run.
  path               optional path or glob pattern to migrate.

Options:
  -c, --cwd <cwd>    the working directory. defaults to the current directory.
  -l, --list         list all migrations. (default: false)
  -y, --yes          skip confirmation prompt. (default: false)
  -f, --from <name>  the base color or icon library to migrate from.
  -t, --to <name>    the base color or icon library to migrate to.
  -h, --help         display help for command
```

---

### migrate cn

The `cn` migration replaces `clsx`, `tailwind-merge` and `cnfast` with [`cn`](https://github.com/shadcn-ui/cn).

```bash
npx shadcn@latest migrate cn
```

Unlike the other migrations, `migrate cn` does not require a `components.json` file. You can run it in any JavaScript or TypeScript package project using Tailwind CSS v4.

This will:

1. Rewrite imports from `clsx`, `clsx/lite`, `tailwind-merge` and `cnfast`.
2. Replace `twMerge(clsx(...))` compositions with direct `cn(...)` calls.
3. Replace the standard shadcn utility with a direct re-export.
4. Install `cn` and remove the old packages when no references remain.

**Before**

```tsx
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**After**

```tsx
export { cn } from "cn"
```

The migration also preserves separate APIs when they are used independently:

```diff
- import { clsx } from "clsx"
- import { twMerge } from "tailwind-merge"
+ import { clsx, twMerge } from "cn"
```

Because `cnfast` has the same root API, its module specifiers are replaced directly:

```diff
- import { cn } from "cnfast"
+ import { cn } from "cn"
```

Custom configuration APIs are moved to `cn/config`. Existing local names are preserved when an export was renamed:

```diff
- import { createTailwindMerge, getDefaultConfig } from "tailwind-merge"
+ import {
+   createTwMerge as createTailwindMerge,
+   defaultConfig as getDefaultConfig,
+ } from "cn/config"
```

<Callout icon={<TriangleAlertIcon />}>
  The `cn` merge engine supports Tailwind CSS v4, like `tailwind-merge` v3.
  Projects using Tailwind CSS v3 should continue using `tailwind-merge` v2. A
  `clsx`-only migration is safe in a Tailwind CSS v3 project.
</Callout>

**Migrate specific files**

You can migrate a file, directory or glob pattern:

```bash
# Migrate a specific file.
npx shadcn@latest migrate cn src/lib/utils.ts

# Migrate files matching a glob pattern.
npx shadcn@latest migrate cn "src/**/*.{ts,tsx}"
```

Scoped migrations install `cn` but keep `clsx`, `tailwind-merge` and `cnfast` in `package.json`, because files outside the selected path may still use them.

The command leaves unsupported imports unchanged and reports them for manual review. This includes `experimentalParseClassName`, namespace imports, dynamic import shapes, direct calls to `validators` and variadic `createTailwindMerge` calls that cannot be migrated safely. An old dependency is retained whenever one of its references remains.

---

### migrate icons

The `icons` migration moves your components from one icon library to another.

```bash
npx shadcn@latest migrate icons
```

This will prompt you for the source and target libraries, rewrite icon imports and JSX usage in your `ui` directory, install the target library and update `iconLibrary` in your `components.json` so future `npx shadcn add` installs use the new library.

The following libraries are supported: `lucide`, `tabler`, `hugeicons`, `phosphor`, `remixicon` and `radix` (legacy).

**Non-interactive**

Use `--from` and `--to` to skip the prompts:

```bash
npx shadcn@latest migrate icons --from lucide --to phosphor --yes
```

**Migrate specific files**

You can migrate specific files or use glob patterns. Scoped runs do not update `components.json`.

```bash
# Migrate a specific file.
npx shadcn@latest migrate icons src/components/ui/button.tsx --from lucide --to tabler

# Migrate files matching a glob pattern.
npx shadcn@latest migrate icons "src/components/**" --from lucide --to tabler
```

Icons without an equivalent in the target library are left untouched and reported at the end of the migration.

---

### migrate base-color

The `base-color` migration switches your theme from one base color to another.

```bash
npx shadcn@latest migrate base-color
```

This will prompt you for the source and target base colors, rewrite the theme CSS variables (the CSS file configured by `tailwind.css` in your `components.json`) and update `baseColor` so future `npx shadcn add` installs use the new base color.

The following base colors are supported: `neutral`, `zinc`, `stone`, `mauve`, `olive`, `mist` and `taupe`.

**Non-interactive**

Use `--to` to migrate from the current `baseColor` in your `components.json`, or pass both `--from` and `--to` explicitly.

```bash
npx shadcn@latest migrate base-color --to zinc --yes
```

Theme tokens that no longer match the source base color are left untouched and reported at the end of the migration.

---

### migrate rtl

The `rtl` migration transforms your components to support RTL (right-to-left) languages.

```bash
npx shadcn@latest migrate rtl
```

This will:

1. Update `components.json` to set `rtl: true`
2. Transform physical CSS properties to logical equivalents (e.g., `ml-4` → `ms-4`, `text-left` → `text-start`)
3. Add `rtl:` variants where needed (e.g., `space-x-4` → `space-x-4 rtl:space-x-reverse`)

**Migrate specific files**

You can migrate specific files or use glob patterns:

```bash
# Migrate a specific file
npx shadcn@latest migrate rtl src/components/ui/button.tsx

# Migrate files matching a glob pattern
npx shadcn@latest migrate rtl "src/components/ui/**"
```

If no path is provided, the migration will transform all files in your `ui` directory (from `components.json`).

---

### migrate radix

The `radix` migration updates your imports from individual `@radix-ui/react-*` packages to the unified `radix-ui` package.

```bash
npx shadcn@latest migrate radix
```

This will:

1. Transform imports from `@radix-ui/react-*` to `radix-ui`
2. Add the `radix-ui` package to your `package.json`

**Before**

```tsx
import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as SelectPrimitive from "@radix-ui/react-select"
```

**After**

```tsx
import { Dialog as DialogPrimitive, Select as SelectPrimitive } from "radix-ui"
```

**Migrate specific files**

You can migrate specific files or use glob patterns:

```bash
# Migrate a specific file.
npx shadcn@latest migrate radix src/components/ui/dialog.tsx

# Migrate files matching a glob pattern.
npx shadcn@latest migrate radix "src/components/ui/**"
```

If no path is provided, the migration will transform all files in your `ui` directory (from `components.json`).

Once complete, you can remove any unused `@radix-ui/react-*` packages from your `package.json`.

---

## eject

When you run `init`, shadcn adds `@import "shadcn/tailwind.css"` to your global CSS file. This import provides shared Tailwind v4 utilities such as custom variants (`data-open:`, `data-closed:`, etc.) and accordion animations.

Use the `eject` command to inline `shadcn/tailwind.css` into your global CSS file and remove the `shadcn` dependency from your project.

<Callout icon={<TriangleAlertIcon />}>
  **Note: This action is irreversible.** After ejecting, future shadcn CLI
  updates to `shadcn/tailwind.css` will not apply automatically.
</Callout>

```bash
npx shadcn@latest eject
```

**Before**

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
```

**After**

```css
@import "tailwindcss";
@import "tw-animate-css";
/* ejected from shadcn@4.8.3 */
@theme inline {
  @keyframes accordion-down {
    from {
      height: 0;
    }
    to {
      height: var(
        --radix-accordion-content-height,
        var(--accordion-panel-height, auto)
      );
    }
  }
}

@custom-variant data-open {
  &:where([data-state="open"]),
  &:where([data-open]:not([data-open="false"])) {
    @slot;
  }
}

@utility no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
```

**Monorepo**

In a monorepo, run the command from the workspace that contains your `components.json` and global CSS file:

```bash
npx shadcn@latest eject -c packages/ui
```

**Options**

```bash
Usage: shadcn eject [options]

inline shadcn/tailwind.css and remove the shadcn dependency

Options:
  -c, --cwd <cwd>  the working directory. defaults to the current directory.
  -y, --yes        skip confirmation prompt. (default: false)
  -s, --silent     mute output. (default: false)
  -h, --help       display help for command
```

---
title: Next.js
description: Install and configure shadcn/ui for Next.js.
---

Choose the setup that matches your starting point.

<div className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-6">
  <LinkedCard
    href="#scaffold-with-create"
    className="items-start gap-1 p-6 text-sm md:p-6"
  >
    <div className="font-medium">Use shadcn/create</div>
    <div className="leading-relaxed text-muted-foreground">
      Build your preset and generate a Next.js project command.
    </div>
  </LinkedCard>
  <LinkedCard
    href="#scaffold-with-cli"
    className="items-start gap-1 p-6 text-sm md:p-6"
  >
    <div className="font-medium">Use the CLI</div>
    <div className="leading-relaxed text-muted-foreground">
      Scaffold a new Next.js project directly from the terminal.
    </div>
  </LinkedCard>
  <LinkedCard
    href="#existing-next-project"
    className="items-start gap-1 p-6 text-sm md:p-6"
  >
    <div className="font-medium">Existing Project</div>
    <div className="leading-relaxed text-muted-foreground">
      Configure shadcn/ui manually in an existing Next.js project.
    </div>
  </LinkedCard>
</div>

<div id="scaffold-with-create" className="scroll-mt-24" />
## Use shadcn/create

<Steps>

### Build Your Preset

Open [shadcn/create](/create?template=next) and build your preset visually. Choose your style, colors, fonts, icons, and more.

<Button asChild size="sm">
  <Link
    href="/create?template=next"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-6 no-underline!"
  >
    Open shadcn/create
  </Link>
</Button>

### Create Project

Click `Create Project`, choose your package manager, and copy the generated command.

The generated command will look similar to this:

```bash
npx shadcn@latest init --preset [CODE] --template next
```

The exact command will include your selected options such as `--base`, `--monorepo`, or `--rtl`.

### Add Components

Add the `Card` component to your project:

```bash
npx shadcn@latest add card
```

If you created a monorepo, run the command from `apps/web` or specify the workspace from the repo root:

```bash
npx shadcn@latest add card -c apps/web
```

The command above will add the `Card` component to your project. You can then import it like this:

```tsx showLineNumbers title="app/page.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
        <CardDescription>
          Track progress and recent activity for your Next.js app.
        </CardDescription>
      </CardHeader>
      <CardContent>
        Your design system is ready. Start building your next component.
      </CardContent>
    </Card>
  )
}
```

If you created a monorepo, update `apps/web/app/page.tsx` and import from `@workspace/ui/components/card` instead.

</Steps>

<div id="scaffold-with-cli" className="scroll-mt-24" />
## Use the CLI

<Steps>

### Create Project

Run the `init` command to scaffold a new Next.js project. Follow the prompts to configure your project: base, preset, monorepo, and more.

```bash
npx shadcn@latest init -t next
```

**For a monorepo project, use `--monorepo` flag:**

```bash
npx shadcn@latest init -t next --monorepo
```

### Add Components

Add the `Card` component to your project:

```bash
npx shadcn@latest add card
```

If you created a monorepo, run the command from `apps/web` or specify the workspace from the repo root:

```bash
npx shadcn@latest add card -c apps/web
```

The command above will add the `Card` component to your project. You can then import it like this:

```tsx showLineNumbers title="app/page.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
        <CardDescription>
          Track progress and recent activity for your Next.js app.
        </CardDescription>
      </CardHeader>
      <CardContent>
        Your design system is ready. Start building your next component.
      </CardContent>
    </Card>
  )
}
```

If you created a monorepo, update `apps/web/app/page.tsx` and import from `@workspace/ui/components/card` instead.

</Steps>

<div id="existing-next-project" className="scroll-mt-24" />
## Existing Project

<Steps>

### Create Project

If you need a new Next.js project, create one with `create-next-app`. Otherwise, skip this step.

```bash
npx create-next-app@latest
```

Choose the recommended defaults so Tailwind CSS, the App Router, and the default `@/*` import alias are configured for you.

If you prefer a `src/` directory, use `--src-dir` or choose `Yes` when prompted:

```bash
npx create-next-app@latest --src-dir
```

With `--src-dir`, Next.js places your app in `src/app` and configures the `@/*` alias to point to `./src/*`.

### Configure Tailwind CSS and Import Aliases

If you created your project with the recommended `create-next-app` defaults, you can skip this step.

If you're adding shadcn/ui to an older or custom Next.js app, make sure Tailwind CSS is installed first. You can follow the official [Next.js installation guide](https://nextjs.org/docs/app/getting-started).

Then make sure your `tsconfig.json` includes the `@/*` import alias:

```json title="tsconfig.json" showLineNumbers
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

If you used `--src-dir`, point the alias to `./src/*` instead.

### Run the CLI

Run the `shadcn` init command to set up shadcn/ui in your project.

```bash
npx shadcn@latest init
```

### Add Components

You can now start adding components to your project.

```bash
npx shadcn@latest add button
```

The command above will add the `Button` component to your project. You can then import it like this:

```tsx showLineNumbers title="app/page.tsx"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Button>Click me</Button>
    </div>
  )
}
```

If you used `--src-dir`, add the component to `src/app/page.tsx` instead.

</Steps>
