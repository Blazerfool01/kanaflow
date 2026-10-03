#!/usr/bin/env node
// Read-only project status collector for the KanaFlow Codex Cloud trial.
// Writes only .ai/project-status.json; it does not modify application files or run tests.
import { execFileSync } from "node:child_process";
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const read = (path) => {
  try { return readFileSync(resolve(root, path), "utf8"); }
  catch { return null; }
};
const git = (...args) => {
  try { return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim(); }
  catch { return null; }
};
const section = (markdown, heading) => {
  if (!markdown) return null;
  const lines = markdown.split(/\r?\n/);
  const headingIndex = lines.findIndex((line) => line.trim() === "## " + heading);
  if (headingIndex < 0) return null;
  const body = [];
  for (const line of lines.slice(headingIndex + 1)) {
    if (/^##\s+/.test(line)) break;
    body.push(line);
  }
  const value = body.join("\n").trim();
  if (!value || /^(define|describe|explain)\b/i.test(value)) return null;
  return value;
};

const project = read("PROJECT.md");
const packageJson = read("package.json");
let packageData = null;
try { packageData = packageJson ? JSON.parse(packageJson) : null; } catch {}
const status = {
  schemaVersion: 1,
  project: "KanaFlow",
  generatedAt: new Date().toISOString(),
  source: "scripts/project-status.mjs",
  repository: {
    branch: git("branch", "--show-current"),
    commit: git("rev-parse", "--short", "HEAD"),
    workingTree: git("status", "--porcelain") === "" ? "clean" : "dirty"
  },
  projectState: {
    goal: section(project, "Goal"),
    currentMilestone: section(project, "Current milestone"),
    whyItMatters: section(project, "Why this milestone matters"),
    acceptanceCriteria: section(project, "Acceptance criteria")
  },
  checks: {
    testScriptAvailable: Boolean(packageData?.scripts?.test),
    testCommand: packageData?.scripts?.test ?? null,
    testStatus: "not_run"
  },
  inputs: {
    projectBriefPresent: Boolean(project),
    packageJsonPresent: existsSync(resolve(root, "package.json"))
  },
  notes: [
    "This report contains collected repository facts only.",
    "Tests are not run by this script; record a real test result after running the project test command."
  ]
};

const outDir = resolve(root, ".ai");
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "project-status.json"), JSON.stringify(status, null, 2) + "\n");
process.stdout.write(JSON.stringify(status, null, 2) + "\n");
