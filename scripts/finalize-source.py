"""Formatting and compatibility fixes for the migrated source."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
page = root / 'src/index.html'
html = page.read_text(encoding='utf-8')
rules = root / 'src/scripts/038-page.js'
if rules.exists():
    content = rules.read_text(encoding='utf-8').split('\n', 1)[1]
    html = re.sub(r'<script([^>]*type="speculationrules"[^>]*) src="/scripts/038-page.js"></script>', lambda match: '<script' + match[1] + '>' + content + '</script>', html)
    rules.rename(rules.with_suffix('.json'))
page.write_text(html, encoding='utf-8')

def format_css(source):
    # Add whitespace only outside comments, quoted strings, and parentheses.
    output = []
    quote = None
    comment = False
    escaped = False
    parentheses = 0
    depth = 0
    i = 0
    while i < len(source):
        c = source[i]
        if comment:
            output.append(c)
            if c == '*' and source[i:i+2] == '*/':
                output.append('/')
                i += 1
                comment = False
        elif quote:
            output.append(c)
            if escaped:
                escaped = False
            elif c == '\\':
                escaped = True
            elif c == quote:
                quote = None
        elif source[i:i+2] == '/*':
            output.append('/*')
            i += 1
            comment = True
        elif c in ('"', "'"):
            quote = c
            output.append(c)
        elif c == '(':
            parentheses += 1
            output.append(c)
        elif c == ')':
            parentheses -= 1
            output.append(c)
        elif c == '{' and not parentheses:
            depth += 1
            output.append(' {\n' + '  ' * depth)
        elif c == '}' and not parentheses:
            depth = max(0, depth - 1)
            output.append('\n' + '  ' * depth + '}\n' + '  ' * depth)
        elif c == ';' and not parentheses:
            output.append(';\n' + '  ' * depth)
        else:
            output.append(c)
        i += 1
    return ''.join(output).strip() + '\n'

for css in (root / 'src/styles').glob('*.css'):
    css.write_text(format_css(css.read_text(encoding='utf-8')), encoding='utf-8')
print('Formatted stylesheet source and preserved inline JSON speculation rules.')
