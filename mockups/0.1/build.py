"""Export the editable mockup and its image into the existing sandbox wrapper."""
from pathlib import Path
import base64
import html

ROOT = Path(__file__).resolve().parent
source = (ROOT / 'source.html').read_text(encoding='utf-8')
template = (ROOT / 'preview-template.html').read_text(encoding='utf-8')
assert template.count('__MOCKUP_FRAGMENT__') == 1
assert source.count('__PORTRAIT_ASSET__') == 1
for token, filename in [('__PORTRAIT_ASSET__', 'fictional-adults.png'), ('__NIGHT_HERO__', 'night-terrace.png'), ('__ROLE_EMBLEMS__', 'role-emblems.png')]:
    assert source.count(token) == 1
    image = base64.b64encode((ROOT / 'assets' / filename).read_bytes()).decode('ascii')
    source = source.replace(token, 'data:image/png;base64,' + image)
output = template.replace('__MOCKUP_FRAGMENT__', html.escape(source, quote=True))
(ROOT / 'index.html').write_text(output, encoding='utf-8')
print('Built mockups/0.1/index.html with embedded fictional portraits.')
