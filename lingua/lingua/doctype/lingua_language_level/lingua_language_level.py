# Copyright (c) 2025, IsaacMorzy and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document


class LinguaLanguageLevel(Document):
	def validate(self):
		"""Main validate hook."""
		self._normalize_level_code()
		self._ensure_unique_per_language_and_system()
		self._ensure_default_starting_level_unique()

	# -------------------------------------------------------------------------
	# Normalization helpers
	# -------------------------------------------------------------------------

	def _normalize_level_code(self):
		"""Normalize level_code to uppercase, trimmed."""
		if self.level_code:
			self.level_code = self.level_code.strip().upper()

	# -------------------------------------------------------------------------
	# Uniqueness: sequence & level_code per (language, level_system)
	# -------------------------------------------------------------------------

	def _ensure_unique_per_language_and_system(self):
		"""
		Enforce uniqueness of:
		  * sequence per (language, level_system)
		  * level_code per (language, level_system)
		"""
		if not (self.language and self.level_system):
			# Cannot enforce scoping without both
			return

		base_filters = {
			"language": self.language,
			"level_system": self.level_system,
		}

		# --- 1) sequence uniqueness per (language, level_system) ---
		if self.sequence is not None:
			seq_filters = dict(base_filters)
			seq_filters["sequence"] = self.sequence

			# Exclude current document when updating
			if not self.is_new():
				seq_filters["name"] = ["!=", self.name]

			if frappe.db.exists(self.doctype, seq_filters):
				frappe.throw(
					_("Sequence {0} is already used for this Language and Level System.").format(
						self.sequence
					),
					frappe.ValidationError,
				)

		# --- 2) level_code uniqueness per (language, level_system) ---
		if self.level_code:
			lvl_filters = dict(base_filters)
			lvl_filters["level_code"] = self.level_code

			# Exclude current document when updating
			if not self.is_new():
				lvl_filters["name"] = ["!=", self.name]

			if frappe.db.exists(self.doctype, lvl_filters):
				frappe.throw(
					_("Level {0} is already defined for this Language and Level System.").format(
						self.level_code
					),
					frappe.ValidationError,
				)

	# -------------------------------------------------------------------------
	# Default starting level per (language, level_system)
	# -------------------------------------------------------------------------

	def _ensure_default_starting_level_unique(self):
		"""
		Ensure there is at most one default starting level per (language, level_system).
		"""
		if not (self.is_default_starting_level and self.language and self.level_system):
			return

		filters = {
			"language": self.language,
			"level_system": self.level_system,
			"is_default_starting_level": 1,
			"name": ["!=", self.name or "New Lingua Language Level"],
		}

		if frappe.db.exists(self.doctype, filters):
			frappe.throw(
				_("There is already a default starting level for this Language and Level System."),
				frappe.ValidationError,
			)
