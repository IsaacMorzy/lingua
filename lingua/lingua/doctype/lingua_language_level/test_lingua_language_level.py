# Copyright (c) 2025, IsaacMorzy and Contributors
# See license.txt

import frappe
from frappe.exceptions import ValidationError
from frappe.tests.utils import FrappeTestCase


class TestLinguaLanguageLevel(FrappeTestCase):
	def _make_level(
		self,
		*,
		sequence: int,
		level_code: str,
		language: str,
		level_system: str,
		level_name: str | None = None,
		**overrides,
	):
		"""Helper to build (but not yet insert) a Lingua Language Level doc."""
		data = {
			"doctype": "Lingua Language Level",
			"language": language,
			"level_system": level_system,
			"sequence": sequence,
			"level_code": level_code,
			# keep level_name independent of autoname (which is based on fields)
			"level_name": level_name or f"Level {level_code}",
			"is_active": 1,
		}
		data.update(overrides)

		doc = frappe.get_doc(data)
		# We don't care about actual linked records in tests
		doc.flags.ignore_links = True
		return doc

	# --- basic creation -----------------------------------------------------

	def test_can_create_language_level(self):
		language = "TST-LANG-CREATE"
		level_system = "TST-SYS-CREATE"

		level = self._make_level(
			sequence=1,
			level_code="TST-A1",
			language=language,
			level_system=level_system,
		).insert()

		self.assertIsNotNone(level.name)
		self.assertEqual(level.language, language)
		self.assertEqual(level.level_system, level_system)
		self.assertEqual(level.sequence, 1)
		self.assertEqual(level.level_code, "TST-A1")
		self.assertEqual(level.is_active, 1)

	# --- uniqueness: sequence per (language, level_system) ------------------

	def test_sequence_unique_per_language_and_system(self):
		language = "TST-LANG-SEQ"
		level_system = "TST-SYS-SEQ"

		# First insert is valid
		self._make_level(
			sequence=1,
			level_code="TST-A1",
			language=language,
			level_system=level_system,
		).insert()

		# Same sequence, same language, same system → should raise ValidationError
		with self.assertRaises(ValidationError):
			self._make_level(
				sequence=1,
				level_code="TST-A2",
				language=language,
				level_system=level_system,
			).insert()

	# --- uniqueness: level_code per (language, level_system) ----------------

	def test_unique_level_per_language_and_system(self):
		language = "TST-LANG-LVL"
		level_system = "TST-SYS-LVL"

		# First insert is valid
		self._make_level(
			sequence=1,
			level_code="TST-A1",
			language=language,
			level_system=level_system,
		).insert()

		# Same (language, level_system, level_code) even with different sequence → ValidationError
		with self.assertRaises(ValidationError):
			self._make_level(
				sequence=2,
				level_code="TST-A1",
				language=language,
				level_system=level_system,
			).insert()

	# --- positive cases: scopes are respected --------------------------------

	def test_same_sequence_allowed_for_other_language(self):
		# Same system, same sequence & level_code, but different languages → allowed
		level_system = "TST-SYS-SAMESEQ-OTHERLANG"
		lang1 = "TST-LANG-SAMESEQ-L1"
		lang2 = "TST-LANG-SAMESEQ-L2"

		self._make_level(
			sequence=1,
			level_code="TST-A1",
			language=lang1,
			level_system=level_system,
		).insert()

		level_other = self._make_level(
			sequence=1,
			level_code="TST-A1",
			language=lang2,
			level_system=level_system,
		).insert()

		self.assertEqual(level_other.language, lang2)

	def test_same_sequence_allowed_for_other_system(self):
		# Same language, same sequence & level_code, but different systems → allowed
		language = "TST-LANG-SAMESEQ-OTHERSYS"
		sys1 = "TST-SYS-SAMESEQ-S1"
		sys2 = "TST-SYS-SAMESEQ-S2"

		self._make_level(
			sequence=1,
			level_code="TST-A1",
			language=language,
			level_system=sys1,
		).insert()

		level_other = self._make_level(
			sequence=1,
			level_code="TST-A1",
			language=language,
			level_system=sys2,
		).insert()

		self.assertEqual(level_other.level_system, sys2)

	# --- updates shouldn't trigger false duplicates --------------------------

	def test_updating_existing_level_does_not_trigger_false_duplicate(self):
		language = "TST-LANG-UPDATE"
		level_system = "TST-SYS-UPDATE"

		level = self._make_level(
			sequence=1,
			level_code="TST-A1",
			language=language,
			level_system=level_system,
		).insert()

		# Change a non-key field and save; should not raise ValidationError
		level.level_name = "Updated TST-A1 Name"
		level.save()

		reloaded = frappe.get_doc(level.doctype, level.name)
		self.assertEqual(reloaded.level_name, "Updated TST-A1 Name")
