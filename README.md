# rouret-claude-skill

A Claude Code plugin marketplace with hands-on skills for everyday work.

| Skill | Command | Purpose |
|---|---|---|
| `lean-problem-resolving` | `/rouret:lean-problem-resolving` | Lean problem solving coach: dated gap from standard, blame-free root cause, short-term countermeasure, recurrence prevention, result |

## Install in Claude Code

```bash
claude plugin marketplace add Rouret/rouret-claude-skill
claude plugin install rouret@rouret-skills
```

Or from inside a Claude Code session:

```text
/plugin marketplace add Rouret/rouret-claude-skill
/plugin install rouret@rouret-skills
```

### Update

```bash
claude plugin marketplace update rouret-skills
```

### Uninstall

```bash
claude plugin uninstall rouret@rouret-skills
claude plugin marketplace remove rouret-skills
```

## Install in claude.ai (web, desktop, mobile)

claude.ai does not read marketplaces directly: each skill is uploaded as a zip.

1. Download or clone this repository.
2. Build the archives with [Bun](https://bun.sh):

   ```bash
   bun run package                          # every skill -> dist/<skill>.zip
   bun run package lean-problem-resolving   # a single skill
   ```

3. In claude.ai, open **Settings > Capabilities > Skills > Upload skill** and pick the zip from `dist/`.

## Repository layout

```
.
├── .claude-plugin/
│   └── marketplace.json          # catalog: lists the plugins in this repo
├── plugins/
│   └── rouret/                   # single plugin bundling every skill
│       ├── .claude-plugin/
│       │   └── plugin.json       # plugin manifest (its name prefixes every command)
│       └── skills/
│           └── lean-problem-resolving/
│               └── SKILL.md
├── scripts/
│   └── packageSkills.ts          # zips skills for claude.ai
├── package.json
└── CONTRIBUTING.md               # how to add a skill
```

Design choice: **one `rouret` plugin holds every skill**. Adding a skill means adding a folder, with no JSON to edit. The trade-off is that the skills install all together.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
