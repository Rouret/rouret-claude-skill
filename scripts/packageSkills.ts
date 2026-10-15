import { readdir, mkdir, rm } from "node:fs/promises";
import { join, resolve } from "node:path";

const ROOT_DIR = resolve(import.meta.dir, "..");
const SKILLS_DIR = join(ROOT_DIR, "plugins", "rouret", "skills");
const DIST_DIR = join(ROOT_DIR, "dist");
const SKILL_FILE_NAME = "SKILL.md";
const SUCCESS_EXIT_CODE = 0;

const listSkillNames = async (): Promise<string[]> => {
  const entries = await readdir(SKILLS_DIR, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
};

const assertSkillFileExists = async (skillName: string): Promise<void> => {
  const skillFile = Bun.file(join(SKILLS_DIR, skillName, SKILL_FILE_NAME));
  if (!(await skillFile.exists())) {
    throw new Error(`${skillName}: missing ${SKILL_FILE_NAME}`);
  }
};

const zipSkill = async (skillName: string): Promise<string> => {
  const archivePath = join(DIST_DIR, `${skillName}.zip`);
  const zipProcess = Bun.spawn(["zip", "-r", "-q", archivePath, skillName], {
    cwd: SKILLS_DIR,
  });
  const exitCode = await zipProcess.exited;
  if (exitCode !== SUCCESS_EXIT_CODE) {
    throw new Error(`${skillName}: zip failed (exit code ${exitCode})`);
  }
  return archivePath;
};

const packageSkills = async (): Promise<void> => {
  const requestedSkillNames = Bun.argv.slice(2);
  const skillNames = requestedSkillNames.length > 0 ? requestedSkillNames : await listSkillNames();
  await rm(DIST_DIR, { recursive: true, force: true });
  await mkdir(DIST_DIR, { recursive: true });
  for (const skillName of skillNames) {
    await assertSkillFileExists(skillName);
    const archivePath = await zipSkill(skillName);
    console.log(`OK ${archivePath}`);
  }
};

await packageSkills();
