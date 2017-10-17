#!/usr/bin/env bash
set -e

_help() {
  echo "metadata-xml-tool."
  echo ""
  echo "Usage:"
  echo "	metadata-xml-tool [options] <command>"
  echo ""
  echo "Commands:"
  echo "	remove-element <element> [file]..."
  echo "	remove-element-matching <element> <expression> [file]..."
  echo "	replace-tag-value <tag> <expression> <new_value> [file]..."
  echo ""
  echo "Options:"
  echo "	-h --help	Show help"
}

_remove-element-matching() {
  elementToRemove="$1"
  expression="$2"
  while read -r file; do
    if [ ! -z "$file" ]; then
      perl -0777 -p -i -e "s{(<${elementToRemove}>.*?</${elementToRemove}>)}{ \$1 =~ m|${expression}|?\"METADATA_XML_TOOL_LINE_TO_BE_REMOVED\":\$1}gse" "$file"
      perl -n -i -e "print unless /METADATA_XML_TOOL_LINE_TO_BE_REMOVED/" "${file}"
    fi
  done < <(echo "${@:3}")
}

_remove-element() {
  elementToRemove="$1"
  while read -r file; do
    if [ ! -z "$file" ]; then
      perl -0777 -p -i -e "s{(<${elementToRemove}>.*?</${elementToRemove}>)}{METADATA_XML_TOOL_LINE_TO_BE_REMOVED}gse" "${file}"
      perl -n -i -e "print unless /METADATA_XML_TOOL_LINE_TO_BE_REMOVED/" "${file}"
    fi
  done < <(echo "${@:2}")
}

_replace-tag-value() {
  export tagToReplace="$1"
  export oldValue="$2"
  export newValue="$3"
  while read -r file; do
    if [ ! -z "$file" ]; then
      perl -0777 -p -i -e 's|<$ENV{tagToReplace}>$ENV{oldValue}</$ENV{tagToReplace}>|<$ENV{tagToReplace}>$ENV{newValue}</$ENV{tagToReplace}>|g' "${file}"
    fi
  done < <(echo "${@:4}")
}

if [[ "$0" == "${BASH_SOURCE[0]}" ]]; then
  set -eo pipefail
  if [[ "$TRACE" ]]; then
    set -x
  fi
  case $1 in
    -h|--help)
      _help; exit 0;
    ;;
    remove-element-matching)
      if [ $# -lt 2 ]; then
        _help; exit 1;
      fi
      shift;
      _remove-element-matching "${@}"
    ;;
    remove-element)
      if [ $# -lt 3 ]; then
        _help; exit 1;
      fi
      shift;
      _remove-element "${@}"
    ;;
    replace-tag-value)
      if [ $# -lt 4 ]; then
        _help; exit 1;
      fi
      shift;
      _replace-tag-value "${@}"
    ;;
    *)
      _help; exit 1;
    ;;
  esac
fi
