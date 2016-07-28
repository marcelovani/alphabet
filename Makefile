all:
	@npm install -d

test:
	@echo "Soon..."

lint:
	@node scripts/runlint.js

.PHONY: all test lint

