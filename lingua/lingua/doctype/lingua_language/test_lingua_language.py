# Copyright (c) 2025, IsaacMorzy and Contributors
# See license.txt

import frappe
from frappe import ValidationError
from frappe.tests.utils import FrappeTestCase


class TestLinguaLanguage(FrappeTestCase):
	def test_language_code_uniqueness(self):
		"""Duplicate language codes must be blocked."""
		frappe.get_doc(
			{
				"doctype": "Lingua Language",
				"language_name": "Test Language One",
				"code": "TST",
				"is_active": 1,
			}
		).insert()

		with self.assertRaises(ValidationError) as ctx:
			frappe.get_doc(
				{
					"doctype": "Lingua Language",
					"language_name": "Test Language Two",
					"code": "TST",
					"is_active": 1,
				}
			).insert()

		self.assertIn("already in use", str(ctx.exception))

	def test_default_level_system_must_be_active(self):
		"""Default level system must exist and be active."""
		sys = frappe.get_doc(
			{
				"doctype": "Lingua Level System",
				"system_name": "INACTIVE-SYSTEM",
				"code": "INACT",
				"applies_to": "Both",
				"is_active": 0,
			}
		).insert()

		with self.assertRaises(ValidationError) as ctx:
			frappe.get_doc(
				{
					"doctype": "Lingua Language",
					"language_name": "Inactive System Lang",
					"code": "INLANG",
					"default_level_system": sys.name,
					"is_active": 1,
				}
			).insert()

		self.assertIn("is not active", str(ctx.exception))
