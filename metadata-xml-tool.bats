#!/usr/bin/env bats

setup() {
  declare desc="some tasks executed before every unit test"
}

teardown() {
  declare desc="some tasks executed after every unit test"
  echo "--------
${output}
--------

"   >> ${BATS_OUT}
}

@test "sourcing script as library" {
  run source metadata-xml-tool.sh
  [[ "$status" == "0" ]]
  [[ "$output" == "" ]]
}

@test "testing the help function" {
  source metadata-xml-tool.sh
  run _help
  [[ "$status" == "0" ]]
  [[ "$output" != "" ]]
  [[ "${lines[0]}" == *"metadata-xml"* ]]
}

@test "running script with -h and --help gives help text" {
  run bash ./metadata-xml-tool.sh -h
  [[ "$status" == "0" ]]
  [[ "$output" == *"Usage"* ]]
  [[ "$output" == *"Options"* ]]

  run bash ./metadata-xml-tool.sh --help
  [[ "$status" == "0" ]]
  [[ "$output" == *"Usage"* ]]
  [[ "$output" == *"Options"* ]]
}

@test "remove-element" {
  test_dir="$(mktemp -d)"
  cp fixtures/remove-element/* "${test_dir}"
  run bash ./metadata-xml-tool.sh remove-element listViews "${test_dir}/actual.xml"
  [[ "$status" == "0" ]]

  run diff -u "${test_dir}/expected.xml" "${test_dir}/actual.xml"
  [[ "$status" == "0" ]]
}

@test "remove-element-matching" {
  test_dir="$(mktemp -d)"
  cp fixtures/remove-element-matching/* "${test_dir}"
  run bash ./metadata-xml-tool.sh remove-element-matching listViews "<fullName>Ideas_Last_7_Days</fullName>" "${test_dir}/actual.xml"
  [[ "$status" == "0" ]]

  run diff -u "${test_dir}/expected.xml" "${test_dir}/actual.xml"
  [[ "$status" == "0" ]]
}

@test "replace-tag-value" {
  test_dir="$(mktemp -d)"
  cp fixtures/replace-tag-value/* "${test_dir}"
  run bash ./metadata-xml-tool.sh replace-tag-value runningUser "user@example.com" "user2@example.com" "${test_dir}/actual.xml"
  [[ "$status" == "0" ]]

  run diff -u "${test_dir}/expected.xml" "${test_dir}/actual.xml"
  [[ "$status" == "0" ]]
}
