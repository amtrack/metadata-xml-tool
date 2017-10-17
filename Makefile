.PHONY: lint test

lint:
	shellcheck *.sh

test:
	bats *.bats
