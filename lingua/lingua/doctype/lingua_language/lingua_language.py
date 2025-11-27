import frappe
from frappe import _
from frappe.model.document import Document


class LinguaLanguage(Document):
	def validate(self):
		self._normalize_code()
		self._ensure_unique_code()
		self._validate_default_level_system()

	def _normalize_code(self):
		"""Keep language codes short, uppercase, and trimmed."""
		if self.code:
			self.code = self.code.strip().upper()

	def _ensure_unique_code(self):
		"""Enforce unique language code across all languages."""
		if not self.code:
			return

		# For NEW docs, we just check by code.
		# For existing docs, exclude self by name.
		filters = {"code": self.code}
		if not self.is_new():
			filters["name"] = ["!=", self.name]

		existing = frappe.db.get_all(
			"Lingua Language",
			filters=filters,
			pluck="name",
			limit=1,
		)

		if existing:
			frappe.throw(
				_("Language code {0} is already in use.").format(self.code),
				frappe.ValidationError,
			)

	def _validate_default_level_system(self):
		"""If a default level system is set, ensure it exists and is active."""
		if not self.default_level_system:
			return

		active = frappe.db.get_value(
			"Lingua Level System",
			self.default_level_system,
			"is_active",
		)

		if active is None:
			frappe.throw(
				_("Default Level System {0} does not exist.").format(self.default_level_system),
				frappe.ValidationError,
			)

		if not active:
			frappe.throw(
				_("Default Level System {0} is not active.").format(self.default_level_system),
				frappe.ValidationError,
			)
