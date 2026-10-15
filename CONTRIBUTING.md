# Adding a skill

## What belongs here

A skill earns its place in this repository when it is:

- **concrete**: it produces something (a problem solving card, a spec, a review), not just a tone
- **recurring**: it is used several times a month or more
- **stable**: its method does not change every time it is used

A one-off prompt or a personal preference (language, formatting) belongs in Claude preferences or a `CLAUDE.md` instead.

## Steps

### 1. Create the folder

Use `kebab-case`, without `claude` or `anthropic` in the name:

```bash
mkdir -p plugins/rouret/skills/my-skill
```

### 2. Write `SKILL.md`

```markdown
---
name: my-skill
description: One sentence saying WHEN to use the skill (this is what triggers it).
---

# My skill

## Principles
...

## Workflow
### 1. ...
### 2. ...

## Final deliverable
...

## Anti-patterns to flag
...
```

Rules:

- `name` in the frontmatter must match the folder name exactly.
- The `description` is what Claude reads to decide whether to use the skill. It says **when** (triggers, words the user would say), not only **what**. Aim for under 200 characters.
- The body is an instruction manual for Claude: ordered steps, checklists, deliverable format, mistakes to push back on.
- Supporting files (templates, examples, scripts) go in the same folder and are referenced from `SKILL.md` by relative path.
- Add `disable-model-invocation: true` to the frontmatter when the skill should only run through its command, never on its own.

### 3. List it in the README

Add a row to the table in `README.md`: name, `/rouret:my-skill` command, purpose.

### 4. Validate and test

```bash
bun run validate
claude --plugin-dir ./plugins/rouret
```

In the session, run `/rouret:my-skill` on a real use case. Also try one message that **should** trigger it without the command, and one that **should not**.

### 5. Ship it to claude.ai (optional)

```bash
bun run package my-skill
```

Then upload `dist/my-skill.zip` in claude.ai.

### 6. Commit

One commit per skill added or changed, for example `feat(skill): add my-skill` or `fix(lean-problem-resolving): ...`.

Users get the change with `claude plugin marketplace update rouret-skills`. The plugin has no `version` field on purpose, so updates follow the latest commit.

## Changing an existing skill

- Edit `SKILL.md` directly, then run `/reload-plugins` in Claude Code.
- Never rename a skill folder: it changes the command, and the old skill stays in claude.ai until it is removed by hand.
- If the skill also lives in claude.ai, run `bun run package <skill>` again and re-upload the zip.

## If several plugins are ever needed

When a group of skills must be installable on its own (for example work skills and personal skills), create `plugins/<other-plugin>/` with its own `.claude-plugin/plugin.json`, then add it to `plugins` in `.claude-plugin/marketplace.json`. The marketplace entry `name` must be identical to the `name` in `plugin.json`.
