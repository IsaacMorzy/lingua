# Copyright (c) 2025, IsaacMorzy and Contributors
# See license.txt


import frappe
from frappe import ValidationError
from frappe.tests.utils import FrappeTestCase


class TestLinguaLevelSystem(FrappeTestCase):
	def test_unique_code_enforced(self):
		sys1 = frappe.get_doc(
			{
				"doctype": "Lingua Level System",
				"system_name": "TEST-SYSTEM-1",
				"code": "TESTSYS",
				"applies_to": "Both",
				"is_active": 1,
			}
		).insert()

		sys2 = frappe.get_doc(
			{
				"doctype": "Lingua Level System",
				"system_name": "TEST-SYSTEM-2",
				"code": "TESTSYS",  # same code
				"applies_to": "Both",
				"is_active": 1,
			}
		)

		with self.assertRaises(frappe.ValidationError):
			sys2.insert()

	def test_only_one_default(self):
		s1 = frappe.get_doc(
			{
				"doctype": "Lingua Level System",
				"system_name": "DEFAULT-SYS",
				"code": "DEF",
				"applies_to": "Both",
				"is_active": 1,
				"is_default": 1,
			}
		).insert()

		s2 = frappe.get_doc(
			{
				"doctype": "Lingua Level System",
				"system_name": "OTHER-SYS",
				"code": "OTH",
				"applies_to": "Both",
				"is_active": 1,
				"is_default": 1,  # make this one default
			}
		).insert()

		s1.reload()
		s2.reload()
		self.assertEqual(s2.is_default, 1)
		self.assertEqual(s1.is_default, 0)
