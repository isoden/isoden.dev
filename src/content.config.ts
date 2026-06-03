import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const ProjectSchema = z.object({
  // 案件名
  title: z.string(),

  // 期間
  period: z.object({
    start: z.string().regex(/^\d{4}-\d{2}$/), // YYYY-MM format
    end: z
      .string()
      .regex(/^\d{4}-\d{2}$/)
      .nullable(), // YYYY-MM format
  }),

  // 案件概要
  summary: z.string(),

  // Website URLs
  websites: z
    .array(
      z.object({
        title: z.string(),
        url: z.url(),
      }),
    )
    .optional(),

  // チーム規模
  teamSize: z.string(),

  // 言語・ツール
  techStack: z.array(z.string()),
});

export type ProjectSchema = z.infer<typeof ProjectSchema>;

const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/pages/pages/resume/_projects" }),
  schema: ProjectSchema,
});

const ResumeMetaSchema = z.object({
  header: z.object({
    title: z.string(),
    name: z.string(),
    asOf: z.string(),
  }),
  summary: z.array(z.string()),
  selfPr: z.array(z.string()),
  skills: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  other: z.array(z.string()),
});

export type ResumeMetaSchema = z.infer<typeof ResumeMetaSchema>;

const resumeMeta = defineCollection({
  loader: glob({ pattern: "_meta.md", base: "./src/pages/pages/resume" }),
  schema: ResumeMetaSchema,
});

export const collections = { projects, resumeMeta };
