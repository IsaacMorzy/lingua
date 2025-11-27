import frappe
from frappe import ValidationError, _
from frappe.model.document import Document


class LinguaLevelSystem(Document):
	def validate(self):
		self._normalize_code()
		self._ensure_unique_code()
		self._ensure_single_default()

	def _normalize_code(self):
		"""Ensure code is uppercase and trimmed."""
		if self.code:
			self.code = self.code.strip().upper()

	def _ensure_unique_code(self):
		"""Code must be unique across all level systems."""
		if not self.code:
			return

		filters = {"code": self.code}
		if not self.is_new():
			filters["name"] = ["!=", self.name]

		existing = frappe.db.get_all(
			"Lingua Level System",
			filters=filters,
			pluck="name",
			limit=1,
		)

		if existing:
			frappe.throw(
				_("Code {0} is already used by another Level System.").format(self.code),
				frappe.ValidationError,
			)

	def _ensure_single_default(self):
		"""Only one system can be marked as default."""
		if not self.is_default:
			return

		frappe.db.sql(
			"""
            UPDATE `tabLingua Level System`
            SET is_default = 0
            WHERE name != %s
            """,
			(self.name or "New Lingua Level System",),
		)
