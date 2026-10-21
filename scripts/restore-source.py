"""One-time migration of the supplied static capture into editable source files."""
from pathlib import Path
from html.parser import HTMLParser
import re
import shutil

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'src'
SRC.mkdir(exist_ok=True)
(SRC / 'styles').mkdir(exist_ok=True)
(SRC / 'scripts').mkdir(exist_ok=True)
(ROOT / 'public').mkdir(exist_ok=True)
shutil.copytree(ROOT / 'dist/assets', ROOT / 'public/assets', dirs_exist_ok=True)
html = (ROOT / 'dist/index.html').read_text(encoding='utf-8')

class Extractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.output = []
        self.capture = None
        self.parts = []
        self.css = 0
        self.js = 0

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        raw = self.get_starttag_text()
        if tag == 'style':
            self.capture = ('style', attributes, raw)
            self.parts = []
        elif tag == 'script' and not attributes.get('src') and attributes.get('type', '').lower() in ('', 'text/javascript', 'application/javascript', 'module'):
            self.capture = ('script', attributes, raw)
            self.parts = []
        else:
            self.output.append(raw)

    def handle_startendtag(self, tag, attrs):
        self.output.append(self.get_starttag_text())

    def handle_endtag(self, tag):
        if self.capture and tag == self.capture[0]:
            kind, attrs, raw = self.capture
            code = ''.join(self.parts)
            if kind == 'style':
                self.css += 1
                name = f'styles/{self.css:03d}-{self.slug(attrs.get("id", "page"))}.css'
                (SRC / name).write_text('/* Retained page styles; order matches the original homepage. */\n' + code, encoding='utf-8')
                extra = f' media="{attrs["media"]}"' if attrs.get('media') else ''
                self.output.append(f'<link rel="stylesheet" href="/{name}"{extra}>')
            else:
                self.js += 1
                name = f'scripts/{self.js:03d}-{self.slug(attrs.get("id", "page"))}.js'
                (SRC / name).write_text('// Retained page initialization; execution order is significant.\n' + code, encoding='utf-8')
                # Preserve type, id, defer, and other original script attributes.
                self.output.append(raw[:-1] + f' src="/{name}"></script>')
            self.capture = None
        else:
            self.output.append(f'</{tag}>')

    @staticmethod
    def slug(value):
        return re.sub(r'[^a-z0-9-]+', '-', value.lower()).strip('-')[:85] or 'page'

    def handle_data(self, data):
        (self.parts if self.capture else self.output).append(data)

    def handle_comment(self, data):
        (self.parts if self.capture else self.output).append('<!--' + data + '-->')

    def handle_decl(self, decl):
        self.output.append('<!' + decl + '>')

    def handle_entityref(self, name):
        (self.parts if self.capture else self.output).append('&' + name + ';')

    def handle_charref(self, name):
        (self.parts if self.capture else self.output).append('&#' + name + ';')

parser = Extractor()
parser.feed(html)
html = ''.join(parser.output).replace('/clone.css', '/styles/custom.css').replace('/clone.js', '/scripts/main.js')
# Line breaks between block elements make the captured markup navigable, while
# retaining whitespace inside text, inline elements, JSON, and embedded SVGs.
html = re.sub(r'(?<=>)(?=</?(?:div|section|header|footer|main|nav|article|aside|h[1-6]|p|ul|li|form|link|meta)\b)', '\n', html)
(SRC / 'index.html').write_text(html, encoding='utf-8')
shutil.copyfile(ROOT / 'dist/clone.css', SRC / 'styles/custom.css')
shutil.copyfile(ROOT / 'dist/clone.js', SRC / 'scripts/main.js')
print(f'Restored editable HTML, {parser.css} style files, {parser.js} initialization scripts, and local assets.')
