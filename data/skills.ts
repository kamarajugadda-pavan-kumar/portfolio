export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    icon: "code",
    skills: ["Python", "TypeScript", "SQL", "Bash"],
  },
  {
    category: "GenAI / LLM",
    icon: "cpu",
    skills: [
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      "RAG",
      "Fine-tuning (LoRA/PEFT)",
      "Prompt Engineering",
      "OpenAI API",
      "Anthropic API",
      "Vector DBs (FAISS, ChromaDB)",
      "Embeddings",
    ],
  },
  {
    category: "ML / Data",
    icon: "bar-chart",
    skills: [
      "PyTorch",
      "NumPy",
      "Pandas",
      "scikit-learn",
      "Hugging Face Transformers",
    ],
  },
  {
    category: "Document AI",
    icon: "file-text",
    skills: [
      "Docling",
      "Unstructured.io",
      "PyMuPDF",
      "AWS Textract",
      "Azure Document Intelligence",
      "OCR pipelines",
    ],
  },
  {
    category: "Infra / Tooling",
    icon: "layers",
    skills: [
      "Docker",
      "Git",
      "FastAPI",
      "SQLite",
      "PostgreSQL",
      "AWS",
      "Azure",
      "Playwright",
      "Vercel",
    ],
  },
];
