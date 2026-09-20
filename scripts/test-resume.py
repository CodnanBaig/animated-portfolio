"""Offline checks for the generated, application-ready resume.

Requires reportlab and pypdf. Run: python3 scripts/test-resume.py
The historical/current content checks intentionally fail if this variant changes.
Update those expectations when deliberately retargeting the resume.
"""
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import unittest
from urllib.parse import urlparse

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]


def build():
    subprocess.run([sys.executable, str(ROOT / 'scripts/build-resume.py')],
                   cwd=ROOT.parent, check=True, capture_output=True, text=True)


class ResumeChecks(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = json.loads((ROOT / 'data/resume.json').read_text())
        build()
        cls.pdf = ROOT / 'public/Adnan_Baig_Resume.pdf'
        cls.reader = PdfReader(cls.pdf)
        cls.text = '\n'.join(page.extract_text() or '' for page in cls.reader.pages)

    def test_one_page(self):
        self.assertEqual(len(self.reader.pages), 1)

    def test_text_is_extractable(self):
        for value in ['Adnan Baig', 'Frontend Developer', 'October 2021',
                      'ReproLab', "Don't Go Broke", 'SignalForge', 'Mart Fight',
                      'Python', 'FastAPI', 'PostgreSQL', 'Playwright', 'Masai School']:
            self.assertIn(value, self.text)

    def test_selection_and_order(self):
        self.assertEqual([p['name'] for p in self.data['projects']],
                         ['ReproLab', "Don't Go Broke", 'SignalForge', 'Mart Fight'])
        positions = [self.text.index(p['name']) for p in self.data['projects']]
        self.assertEqual(positions, sorted(positions))

    def test_keeps_employment_and_education(self):
        previous = json.loads((ROOT / 'data/resume.general.json').read_text())
        for key in ['company', 'role', 'period']:
            self.assertEqual(self.data['experience'][key], previous['experience'][key])
        self.assertEqual(self.data['education'], previous['education'])

    def test_preserves_original_source_exactly(self):
        data = (ROOT / 'data/resume.general.json').read_bytes()
        sha = hashlib.sha1(f'blob {len(data)}\0'.encode() + data).hexdigest()
        self.assertEqual(sha, '4058dc37747783eaf93eca63419d869045d61e04')

    def test_links_are_rendered(self):
        expected = {i['url'] for i in self.data['links']}
        expected.add('mailto:' + self.data['email'])
        for project in self.data['projects']:
            expected.update(i['url'] for i in project['links'])
        actual = set()
        for page in self.reader.pages:
            for annotation in page.get('/Annots', []):
                action = annotation.get_object().get('/A', {})
                if action.get('/URI'):
                    actual.add(str(action['/URI']))
        self.assertEqual(expected, actual)

    def test_public_case_study_links(self):
        for project in self.data['projects']:
            for link in project['links']:
                url = urlparse(link['url'])
                self.assertEqual(url.scheme, 'https')
                self.assertEqual(url.netloc, 'adnanbaigportfolio.netlify.app')
                self.assertTrue(url.path.startswith('/work/'))

    def test_variant_and_primary_assets_match(self):
        alias = self.data['downloadFilename']
        self.assertEqual(Path(alias).name, alias)
        self.assertEqual((ROOT / 'public' / alias).read_bytes(), self.pdf.read_bytes())
        self.assertEqual((ROOT / 'output/pdf/Adnan_Baig_Resume.pdf').read_bytes(),
                         self.pdf.read_bytes())

    def test_repeatable_build(self):
        before = self.pdf.read_bytes()
        build()
        self.assertEqual(self.pdf.read_bytes(), before)

    def test_scope_qualifiers_survive_rendering(self):
        self.assertIn('project-based Python/FastAPI', ' '.join(self.text.split()))
        self.assertIn('no real orders', self.text)
        self.assertIn('test drafts', self.text)
        self.assertIn('attachment to school', self.text)
        self.assertIn('planning fighters', self.text)
        self.assertIn('eventually face off as ourselves', ' '.join(self.text.split()))


if __name__ == '__main__':
    unittest.main(verbosity=2)
