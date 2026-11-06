import fs from 'fs';
import path from 'path';

const dir = 'src/app/pages';
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.ts'))) {
  const full = path.join(dir, file);
  let s = fs.readFileSync(full, 'utf8');
  const orig = s;

  if (s.includes("from '../content/site.content'") && !s.includes('ContentService')) {
    s = s.replace(/import \{([^}]+)\} from '\.\.\/content\/site\.content';/, (_m, inner) => {
      const cleaned = inner
        .replace(/\bSITE\b,?\s*/g, '')
        .replace(/,\s*,/g, ',')
        .replace(/^\s*,/, '')
        .replace(/,\s*$/, '')
        .trim();
      const line1 = cleaned ? `import { ${cleaned} } from '../content/site.content';\n` : '';
      return `${line1}import { ContentService } from '../content/content.service';`;
    });
  }

  if (s.includes('ContentService')) {
    if (/import \{ Component \}/.test(s)) {
      s = s.replace('import { Component }', 'import { Component, inject }');
    } else if (/import \{ Component,/.test(s) && !/import \{[^}]*\binject\b/.test(s)) {
      s = s.replace(/import \{ Component,/, 'import { Component, inject,');
    }
  }

  s = s.replace(/\bsite = SITE;/, 'private content = inject(ContentService);\n  site = this.content.content;');

  s = s.replace(/\{\{ site\./g, '{{ site().');
  s = s.replace(/\[([^\]]*?)site\./g, '[$1site().');
  s = s.replace(/\(site\./g, '(site().');
  s = s.replace(/ of site\./g, ' of site().');
  s = s.replace(/="site\./g, '="site().');
  s = s.replace(/' \+ site\./g, "' + site().");
  s = s.replace(/\[(\w+)\]="site\./g, '[$1]="site().');

  if (s !== orig) {
    fs.writeFileSync(full, s);
    console.log('updated', file);
  } else {
    console.log('unchanged', file);
  }
}
