/**
 * The browser-local adapter is intentionally available only in explicit test
 * builds. Keeping this behind a public build-time flag prevents an accidental
 * production authentication bypass while preserving deterministic E2E tests.
 */
export const BYPASS_AUTH_FOR_DEMO = process.env.NEXT_PUBLIC_JASHNLY_LOCAL_TEST_MODE === "true";

