import styles from "./page.module.css";

function SparkIcon() {
  return (
    <svg
      aria-hidden="true"
      className={styles.sparkIcon}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 2.5C12.9 8.2 15.8 11.1 21.5 12C15.8 12.9 12.9 15.8 12 21.5C11.1 15.8 8.2 12.9 2.5 12C8.2 11.1 11.1 8.2 12 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M4 6.5h16v11H4v-11Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="m5 7.5 7 5 7-5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 14v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className={styles.page}>
      

      <section className={styles.loginPanel} aria-labelledby="login-title">
        <div className={styles.mobileBrand}>
          <span className={styles.brandMark}>
            <SparkIcon />
          </span>
          <span>Morrow</span>
        </div>

        <div className={styles.accountPrompt}>
          <span>New to Morrow?</span>
          <a href="#">Create an account</a>
        </div>

        <div className={styles.loginContent}>
          <div className={styles.heading}>
            <p className={styles.welcome}>Welcome back</p>
            <h2 id="login-title">Sign in to your account</h2>
            <p>Enter your details below to continue.</p>
          </div>

          <form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="identity">Email or username</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}>
                  <MailIcon />
                </span>
                <input
                  id="identity"
                  name="identity"
                  type="text"
                  autoComplete="username"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="password">Password</label>
                <a href="#">Forgot password?</a>
              </div>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}>
                  <LockIcon />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <label className={styles.remember}>
              <input type="checkbox" name="remember" />
              <span>Keep me signed in</span>
            </label>

            <button className={styles.submitButton} type="button">
              Sign in
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <p className={styles.disclaimer}>
            By continuing, you agree to our <a href="#">Terms</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
