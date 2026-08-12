export interface ExportProjectData {
  title: string;
  subtitle?: string | null;
  authorName: string;
  category: string;
  type: string;
  chapters: Array<{
    title: string;
    content: string;
    orderIndex: number;
  }>;
  dedication?: string;
  copyrightText?: string;
}

export function generatePlainTextExport(project: ExportProjectData): string {
  let output = `${project.title.toUpperCase()}\n`;
  if (project.subtitle) output += `${project.subtitle}\n`;
  output += `By ${project.authorName}\n\n`;
  output += `=========================================\n\n`;

  project.chapters.sort((a, b) => a.orderIndex - b.orderIndex).forEach((ch, idx) => {
    output += `CHAPTER ${idx + 1}: ${ch.title.toUpperCase()}\n\n`;
    // Strip HTML tags for plain text
    const cleanContent = ch.content.replace(/<[^>]+>/g, "\n");
    output += `${cleanContent}\n\n`;
    output += `-----------------------------------------\n\n`;
  });

  return output;
}

export function generateMarkdownExport(project: ExportProjectData): string {
  let output = `# ${project.title}\n`;
  if (project.subtitle) output += `*${project.subtitle}*\n\n`;
  output += `**Author:** ${project.authorName}  \n`;
  output += `**Format:** ${project.type}  \n\n`;
  output += `---\n\n`;

  project.chapters.sort((a, b) => a.orderIndex - b.orderIndex).forEach((ch) => {
    output += `## ${ch.title}\n\n`;
    // Convert basic HTML to MD
    const mdContent = ch.content
      .replace(/<h1>(.*?)<\/h1>/g, "# $1\n")
      .replace(/<h2>(.*?)<\/h2>/g, "## $1\n")
      .replace(/<h3>(.*?)<\/h3>/g, "### $1\n")
      .replace(/<p>(.*?)<\/p>/g, "$1\n\n")
      .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
      .replace(/<em>(.*?)<\/em>/g, "*$1*")
      .replace(/<br\s*\/?>/g, "\n");
    output += `${mdContent}\n\n---\n\n`;
  });

  return output;
}

export function generateFormattedHtmlForExport(project: ExportProjectData): string {
  let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${project.title}</title>
  <style>
    body { font-family: 'Georgia', serif; line-height: 1.8; color: #1a1a1a; max-width: 800px; margin: 0 auto; padding: 40px; }
    h1.book-title { font-size: 36px; text-align: center; margin-top: 100px; text-transform: uppercase; letter-spacing: 2px; }
    h2.book-subtitle { font-size: 20px; text-align: center; font-style: italic; font-weight: normal; margin-bottom: 40px; }
    p.author-name { font-size: 22px; text-align: center; margin-bottom: 200px; font-weight: bold; }
    .page-break { page-break-after: always; break-after: page; }
    h2.chapter-header { font-size: 24px; text-align: center; margin-top: 60px; margin-bottom: 30px; letter-spacing: 1px; }
    p { text-indent: 1.5em; margin-top: 0; margin-bottom: 0; }
    p:first-of-type { text-indent: 0; }
    .scene-break { text-align: center; margin: 30px 0; font-size: 18px; }
  </style>
</head>
<body>
  <h1 class="book-title">${project.title}</h1>
  ${project.subtitle ? `<h2 class="book-subtitle">${project.subtitle}</h2>` : ''}
  <p class="author-name">by ${project.authorName}</p>
  <div class="page-break"></div>
`;

  project.chapters.sort((a, b) => a.orderIndex - b.orderIndex).forEach((ch, idx) => {
    html += `<h2 class="chapter-header">Chapter ${idx + 1}: ${ch.title}</h2>\n`;
    html += `<div>${ch.content}</div>\n`;
    html += `<div class="page-break"></div>\n`;
  });

  html += `</body></html>`;
  return html;
}
