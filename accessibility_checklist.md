# Complete Accessibility Checklist
## Section 508, WCAG 2.1 & 2.2 AA Compliance for Next.js/React Apps

---

## 1. PERCEIVABLE - Information must be presentable to users

### 1.1 Text Alternatives (A)

- [ ] **All images have appropriate alt text**
  ```jsx
  <Image src="/logo.png" alt="Company logo" width={100} height={50} />
  // Decorative images
  <Image src="/decoration.png" alt="" aria-hidden="true" />
  ```

- [ ] **Complex images have long descriptions**
  ```jsx
  <img 
    src="/chart.png" 
    alt="Sales chart showing 40% growth" 
    aria-describedby="chart-desc"
  />
  <div id="chart-desc" className="sr-only">
    Detailed description of chart data...
  </div>
  ```

- [ ] **Icons have accessible labels**
  ```jsx
  <button aria-label="Close menu">
    <XIcon aria-hidden="true" />
  </button>
  ```

- [ ] **Form inputs have associated labels**
  ```jsx
  <label htmlFor="email">Email</label>
  <input type="email" id="email" name="email" />
  ```

### 1.2 Time-based Media (A & AA)

- [ ] **Videos have captions/subtitles**
- [ ] **Audio content has transcripts**
- [ ] **Pre-recorded video has audio descriptions (AA)**
  ```jsx
  <video controls>
    <source src="video.mp4" type="video/mp4" />
    <track kind="captions" src="captions.vtt" srclang="en" label="English" />
    <track kind="descriptions" src="descriptions.vtt" srclang="en" />
  </video>
  ```

### 1.3 Adaptable (A)

- [ ] **Proper heading hierarchy (h1 → h2 → h3)**
  ```jsx
  <h1>Main Title</h1>
  <section>
    <h2>Section Title</h2>
    <h3>Subsection</h3>
  </section>
  ```

- [ ] **Semantic HTML elements used**
  ```jsx
  <header>, <nav>, <main>, <article>, <aside>, <footer>
  ```

- [ ] **Lists use proper markup**
  ```jsx
  <ul>, <ol>, <dl>
  ```

- [ ] **Tables have proper structure**
  ```jsx
  <table>
    <caption>Monthly Sales Data</caption>
    <thead>
      <tr>
        <th scope="col">Month</th>
        <th scope="col">Sales</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">January</th>
        <td>$10,000</td>
      </tr>
    </tbody>
  </table>
  ```

- [ ] **Reading order is logical when CSS is disabled**

- [ ] **Form inputs have autocomplete attributes (WCAG 2.1)**
  ```jsx
  <input 
    type="email" 
    name="email" 
    autocomplete="email"
  />
  <input 
    type="tel" 
    name="phone" 
    autocomplete="tel"
  />
  ```

### 1.4 Distinguishable (A & AA)

- [ ] **Color is not the only visual means of conveying information**
  ```jsx
  // Bad: Only color indicates error
  <input className="border-red-500" />
  
  // Good: Color + icon + text
  <input className="border-red-500" aria-invalid="true" />
  <span className="text-red-500">
    <ErrorIcon /> This field is required
  </span>
  ```

- [ ] **Audio control available if auto-play > 3 seconds**

- [ ] **Text contrast ratio: 4.5:1 for normal text (AA)**
  ```jsx
  // Good examples:
  text-gray-900 on bg-white (21:1)
  text-gray-700 on bg-gray-100 (8:1)
  
  // Check with: https://webaim.org/resources/contrastchecker/
  ```

- [ ] **Large text contrast: 3:1 (18pt+ or 14pt+ bold) (AA)**

- [ ] **Text can be resized up to 200% without loss of functionality (AA)**
  ```jsx
  // Use relative units (rem, em) instead of px
  className="text-base" // Good
  style={{ fontSize: '16px' }} // Avoid
  ```

- [ ] **Images of text avoided (use real text) (AA)**

- [ ] **Content reflows at 320px width without horizontal scroll (WCAG 2.1 AA)**
  ```jsx
  // Use responsive design
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  ```

- [ ] **Text spacing adjustable without breaking layout (WCAG 2.1 AA)**
  ```css
  /* Users should be able to adjust: */
  line-height: 1.5;
  letter-spacing: 0.12em;
  word-spacing: 0.16em;
  paragraph-spacing: 2em;
  ```

- [ ] **Hover/focus content is dismissible, hoverable, persistent (WCAG 2.1 AA)**
  ```jsx
  // Tooltips should not trap focus
  <Tooltip 
    dismissible={true}
    persistent={true}
  >
    Content
  </Tooltip>
  ```

- [ ] **Focus not obscured (minimum) - WCAG 2.2 AA**
  ```jsx
  // Ensure focused elements aren't hidden by sticky headers/footers
  // Add appropriate z-index and scrollMargin
  className="focus:z-50 scroll-mt-20"
  ```

- [ ] **Dragging movements have alternative (WCAG 2.2 AA)**
  ```jsx
  // Provide buttons as alternative to drag & drop
  <DraggableItem />
  <button onClick={moveUp}>Move Up</button>
  <button onClick={moveDown}>Move Down</button>
  ```

---

## 2. OPERABLE - Interface must be operable

### 2.1 Keyboard Accessible (A)

- [ ] **All functionality available via keyboard**
  ```jsx
  // Test: Navigate using only Tab, Shift+Tab, Enter, Space, Arrow keys
  ```

- [ ] **No keyboard traps**
  ```jsx
  // Modals should trap focus but allow escape
  <Dialog onEscapeKey={closeDialog}>
  ```

- [ ] **Keyboard shortcuts don't conflict (if used)**

- [ ] **Character key shortcuts can be turned off/remapped (WCAG 2.1 A)**

### 2.2 Enough Time (A)

- [ ] **Timing adjustable for time limits**
  ```jsx
  <SessionTimeout 
    duration={600}
    extendable={true}
    warningTime={60}
  />
  ```

- [ ] **Pause, stop, hide for moving/blinking content**
  ```jsx
  <Carousel autoPlay={true} pauseOnHover={true}>
    <button onClick={pause}>Pause</button>
  </Carousel>
  ```

- [ ] **No time limits on user actions (unless essential)**

### 2.3 Seizures and Physical Reactions (A)

- [ ] **No content flashes more than 3 times per second**
  ```jsx
  // Avoid rapid animations, strobing effects
  ```

- [ ] **Animation from interactions can be disabled (WCAG 2.1 A)**
  ```jsx
  // Respect prefers-reduced-motion
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

### 2.4 Navigable (A & AA)

- [ ] **Skip navigation link provided**
  ```jsx
  <a 
    href="#main-content" 
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2"
  >
    Skip to main content
  </a>
  ```

- [ ] **Page titles are descriptive**
  ```jsx
  // Next.js
  export const metadata = {
    title: 'Contact Us | RangamWorks',
    description: 'Get in touch with our team'
  };
  ```

- [ ] **Focus order is logical**

- [ ] **Link purpose clear from text or context (AA)**
  ```jsx
  // Bad
  <a href="/about">Click here</a>
  
  // Good
  <a href="/about">Learn about our company</a>
  ```

- [ ] **Multiple ways to find pages (AA)**
  - Navigation menu
  - Site search
  - Sitemap

- [ ] **Headings and labels are descriptive (AA)**

- [ ] **Keyboard focus is visible (AA)**
  ```jsx
  // Tailwind example
  className="focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 focus:ring-2 focus:ring-blue-500"
  ```

- [ ] **Focus appearance (minimum) - WCAG 2.2 AA**
  ```jsx
  // Focus indicator must be at least 2px thick
  className="focus:ring-2 focus:ring-blue-600"
  ```

### 2.5 Input Modalities (A & AA - WCAG 2.1)

- [ ] **Pointer gestures have keyboard/single-pointer alternative (A)**
  ```jsx
  // Provide alternatives to multi-touch gestures
  <PinchZoom />
  <button onClick={zoomIn}>+</button>
  <button onClick={zoomOut}>-</button>
  ```

- [ ] **Pointer cancellation - up-event or abort (A)**
  ```jsx
  // Use onClick (up-event) not onMouseDown
  <button onClick={handleClick}>Click</button>
  ```

- [ ] **Label in name matches accessible name (A)**
  ```jsx
  // Visible text should match aria-label
  <button aria-label="Search for products">Search</button>
  ```

- [ ] **Motion actuation can be disabled (A)**
  ```jsx
  // Provide alternative to shake/tilt gestures
  ```

- [ ] **Target size minimum 24x24 CSS pixels (WCAG 2.2 AA)**
  ```jsx
  // Clickable areas should be large enough
  <button className="min-h-[24px] min-w-[24px] p-2">
    <Icon />
  </button>
  ```

- [ ] **Consistent help mechanism placement (WCAG 2.2 A)**
  ```jsx
  // Help links should be in same location across pages
  <footer>
    <a href="/help">Help</a>
  </footer>
  ```

---

## 3. UNDERSTANDABLE - Information and operation must be understandable

### 3.1 Readable (A & AA)

- [ ] **Page language defined**
  ```jsx
  // Next.js: app/layout.tsx
  <html lang="en">
  ```

- [ ] **Language changes marked in content (AA)**
  ```jsx
  <p>The French word <span lang="fr">bonjour</span> means hello.</p>
  ```

### 3.2 Predictable (A & AA)

- [ ] **Focus doesn't trigger unexpected context change**

- [ ] **Input doesn't trigger unexpected context change**
  ```jsx
  // Don't auto-submit on selection
  <select onChange={handleChange}>
    {/* Require explicit submit */}
  </select>
  <button type="submit">Submit</button>
  ```

- [ ] **Navigation is consistent across pages (AA)**

- [ ] **Components identified consistently (AA)**
  ```jsx
  // Use same icon/label for same function throughout site
  <ShoppingCartIcon aria-label="Shopping cart" />
  ```

- [ ] **Consistent help - WCAG 2.2 A**

### 3.3 Input Assistance (A & AA)

- [ ] **Error identification**
  ```jsx
  <input 
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <span id="email-error" role="alert">
      Please enter a valid email address
    </span>
  )}
  ```

- [ ] **Labels or instructions provided**
  ```jsx
  <label htmlFor="password">
    Password
    <span className="text-sm text-gray-600">
      (Must be at least 8 characters)
    </span>
  </label>
  <input type="password" id="password" />
  ```

- [ ] **Error suggestions provided (AA)**
  ```jsx
  <span role="alert">
    Invalid email. Did you mean user@example.com?
  </span>
  ```

- [ ] **Error prevention for legal/financial/data submissions (AA)**
  ```jsx
  // Provide review step before final submission
  <CheckoutReview />
  <button>Confirm Purchase</button>
  ```

- [ ] **Redundant entry not required (WCAG 2.2 A)**
  ```jsx
  // Auto-fill previously entered info within same session
  // Or allow copy/paste, provide option to select from previous entries
  ```

- [ ] **Accessible authentication (minimum) - WCAG 2.2 AA**
  ```jsx
  // Don't require cognitive function tests (CAPTCHA alternatives)
  // Provide password managers, biometric auth
  <input 
    type="password" 
    autoComplete="current-password"
  />
  ```

---

## 4. ROBUST - Content must be robust enough for assistive technologies

### 4.1 Compatible (A)

- [ ] **Valid HTML (no duplicate IDs, proper nesting)**
  ```jsx
  // Use HTML validator: https://validator.w3.org/
  ```

- [ ] **Name, role, value for all UI components**
  ```jsx
  <button 
    role="button" 
    aria-pressed={isPressed}
    aria-label="Toggle menu"
  >
    Menu
  </button>
  ```

- [ ] **Status messages identified (WCAG 2.1 AA)**
  ```jsx
  <div role="status" aria-live="polite">
    Your changes have been saved
  </div>
  
  <div role="alert" aria-live="assertive">
    Error: Form submission failed
  </div>
  ```

---

## SECTION 508 SPECIFIC REQUIREMENTS

### Software Applications & Operating Systems

- [ ] **Keyboard access to all functionality**
- [ ] **Focus indicators visible**
- [ ] **No disruption of accessibility features**

### Web-based Intranet & Internet

- [ ] **WCAG 2.0 Level AA compliance** (Section 508 references WCAG)
- [ ] **All above WCAG 2.1 & 2.2 AA requirements**

### Functional Performance Criteria

- [ ] **Without vision** - Screen reader compatible
- [ ] **With limited vision** - High contrast, zoom support
- [ ] **Without hearing** - Captions, transcripts
- [ ] **Without speech** - Alternative input methods
- [ ] **Limited manipulation** - Keyboard only access
- [ ] **Limited reach and strength** - Target sizes, no time limits
- [ ] **Limited cognition** - Clear language, consistent navigation

---

## NEXT.JS / REACT SPECIFIC IMPLEMENTATION

### Setup Accessibility Tools

```bash
npm install --save-dev eslint-plugin-jsx-a11y @axe-core/react
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev pa11y pa11y-ci
```

### ESLint Configuration

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:jsx-a11y/recommended"
  ],
  "plugins": ["jsx-a11y"],
  "rules": {
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-role": "error",
    "jsx-a11y/heading-has-content": "error",
    "jsx-a11y/label-has-associated-control": "error"
  }
}
```

### Next.js App Layout

```jsx
// app/layout.tsx
export const metadata = {
  title: 'Your App',
  description: 'Description',
  lang: 'en'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

### Accessible Component Patterns

```jsx
// Accessible Button
const Button = ({ children, onClick, variant = 'primary', ...props }) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 rounded
      focus:outline-2 focus:outline-offset-2 focus:outline-blue-600
      ${variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-200'}
    `}
    {...props}
  >
    {children}
  </button>
);

// Accessible Modal
const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
    >
      <h2 id="modal-title">{title}</h2>
      {children}
      <button onClick={onClose} aria-label="Close modal">
        Close
      </button>
    </div>
  );
};

// Accessible Form
const ContactForm = () => {
  const [errors, setErrors] = useState({});
  
  return (
    <form>
      <div>
        <label htmlFor="name">
          Name <span aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <span id="name-error" role="alert" className="text-red-600">
            {errors.name}
          </span>
        )}
      </div>
    </form>
  );
};
```

### CSS for Accessibility

```css
/* Skip link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .button {
    border: 2px solid currentColor;
  }
}

/* Focus visible (modern browsers) */
:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

---

## TESTING CHECKLIST

### Automated Testing

- [ ] **ESLint jsx-a11y** - Run in development
- [ ] **Lighthouse** - Score > 90 for accessibility
- [ ] **axe DevTools** - Browser extension
- [ ] **WAVE** - Web accessibility evaluation
- [ ] **pa11y** - Automated testing in CI/CD

```json
// package.json
{
  "scripts": {
    "lint:a11y": "eslint . --ext .js,.jsx,.ts,.tsx",
    "test:a11y": "pa11y-ci --sitemap https://yoursite.com/sitemap.xml"
  }
}
```

### Manual Testing

- [ ] **Keyboard navigation** - Tab through entire site
- [ ] **Screen reader** - Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] **Zoom to 200%** - Verify all content visible and usable
- [ ] **Color contrast** - Check all text with WebAIM Contrast Checker
- [ ] **Mobile accessibility** - Test on actual devices
- [ ] **Forms** - Complete entire flow with assistive tech

### Screen Reader Testing Commands

**NVDA (Windows - Free):**
- Start: Ctrl + Alt + N
- Navigate: Arrow keys
- Read all: Insert + Down arrow
- Links list: Insert + F7

**VoiceOver (Mac):**
- Start: Cmd + F5
- Navigate: VO + Arrow keys (VO = Ctrl + Option)
- Rotor: VO + U

---

## DOCUMENTATION & COMPLIANCE

- [ ] **Create accessibility statement**
- [ ] **Document known issues and remediation timeline**
- [ ] **Maintain VPAT (Voluntary Product Accessibility Template)**
- [ ] **Regular accessibility audits** - Quarterly recommended
- [ ] **User testing with people with disabilities**

---

## PRIORITY LEVELS

**🔴 Critical (Fix Immediately):**
- Keyboard traps
- Missing alt text on informative images
- Form inputs without labels
- Color contrast failures
- Missing page titles

**🟡 High (Fix Within Week):**
- Improper heading hierarchy
- Missing skip links
- Focus indicators not visible
- Missing ARIA labels on icons

**🟢 Medium (Fix Within Month):**
- Non-semantic HTML
- Missing autocomplete attributes
- Inconsistent navigation
- Missing captions on videos

---

## USEFUL RESOURCES

- [WebAIM WCAG Checklist](https://webaim.org/standards/wcag/checklist)
- [Section 508 Standards](https://www.section508.gov/)
- [W3C WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Next.js Accessibility](https://nextjs.org/docs/architecture/accessibility)
- [React Accessibility](https://react.dev/learn/accessibility)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

**Last Updated:** January 2026
**Standards Covered:** Section 508 (Revised), WCAG 2.1 Level AA, WCAG 2.2 Level AA