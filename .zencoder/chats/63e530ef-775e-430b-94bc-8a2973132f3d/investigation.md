# Investigation and Planning - Portfolio Bug Fixes

## Bug Summary
During the investigation, several issues were identified in the portfolio project:
1.  **Multiple AOS Initialization**: AOS is initialized in `AOSProvider`, `About`, `Contact`, `Projects`, and `Skills`. This causes redundant event listeners and potential performance issues.
2.  **React Hook Dependencies**: Missing dependencies in `useEffect` and `useTransform` hooks across several components.
3.  **Hydration Mismatch**: Random particle positions in `Skills.tsx` and `Certifications.tsx` cause hydration mismatches. (Note: These were already somewhat addressed with fixed positions, but `Contact.tsx` also has a potential issue with `aosMounted` state).
4.  **Accessibility**: Some links in `Projects.tsx` and `Navbar.tsx` lack descriptive labels or have placeholder `#` hrefs.
5.  **Experience Component Logic**: Parallax effect calculation in `Experience.tsx` might cause layout shifts as it uses `100 * (idx + 1)` which can be quite large.
6.  **Contact Form Logic**: Success status timeout is handled with `setTimeout` without clearing it if the component unmounts.
7.  **Z-Index Issues**: Background elements in `About.tsx` use `-z-10` which might be unnecessary if parent has correct stacking context.

## Root Cause Analysis
- **AOS**: Over-initialization due to adding `AOS.init()` in every component instead of relying on the global provider.
- **Next.js 15+ & React 19**: Stricter hydration and hook checks.
- **Framer Motion**: Improper use of `useTransform` and `useScroll` without ensuring the target ref is fully initialized or using them outside of the component body correctly.

## Affected Components
- `src/components/About.tsx`
- `src/components/Contact.tsx`
- `src/components/Experience.tsx`
- `src/components/Navbar.tsx`
- `src/components/Projects.tsx`
- `src/components/Skills.tsx`
- `src/components/AOSProvider.tsx`

## Proposed Solution
1.  **Centralize AOS**: Remove `AOS.init()` from all components except `AOSProvider.tsx`.
2.  **Fix Hook Dependencies**: Add missing dependencies to `useEffect`.
3.  **Sanitize Framer Motion**: Ensure `useTransform` values are safe and refs are properly handled.
4.  **Improve Accessibility**: Add `aria-label` to icon links and replace placeholder links with meaningful defaults or empty strings.
5.  **Refactor Experience Parallax**: Use more subtle parallax values to avoid extreme movement.
6.  **Clean up Event Listeners/Timeouts**: Use cleanup functions in `useEffect` for `setTimeout`.
7.  **Address Hydration**: Ensure all components use `useEffect` for client-only logic properly.
