# Changelog

All notable changes to this project will be documented in this file.

This project has **no release artifacts**. Changes are separated by date, like a diary of one day's work. Category names follow [Keep a Changelog](https://keepachangelog.com/en/1.0.0/); SemVer version numbers are not used.

## [Unreleased]

## 2026-09-24

### Added
- Define L1 v4 role layers and gap-honesty rules (`docs/l1-roles.md`, ADR-0008)
- Add ErgeMD adapter profile with core / reading mappings
- Add theme intake DoD: source pin, value honesty (verbatim / formula / explicit exemption), auditable mapping

### Changed
- Mark OnePage gap roles explicitly as contract fallbacks

## 2026-09-14

### Added
- Derive family preview section and badge config into `preview/data.js` (single source with the index)

### Changed
- Unify OnePage status and ANSI colors (26 rows) to HEX display (DEC-002)
- Align preview contrast guard with Python (show dash instead of a fake ratio)
- Harden generators and ensure byte-idempotent output

### Fixed
- Stop painting `var()` formula values as transparent swatches in preview
- Drop graph-* formula roles from OnePage card sections

## 2026-09-13

### Added
- Initial ThemeVault import: OnePage family (#073 warm-brown, #074 warm-paper) plus index / preview / docs skeleton
