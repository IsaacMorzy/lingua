from frappe import _


def get_data():
	return [
		{
			"label": _("Lingua Core"),
			"items": [
				{
					"type": "doctype",
					"name": "Lingua Level System",
					"label": _("Level Systems"),
				},
				{
					"type": "doctype",
					"name": "Lingua Language",
					"label": _("Languages"),
				},
				# {
				# 	"type": "doctype",
				# 	"name": "Lingua Language Level",
				# 	"label": _("Language Levels"),
				# },
			],
		},
		# ... other Lingua groups (Academics, Placement, etc.) ...
	]
