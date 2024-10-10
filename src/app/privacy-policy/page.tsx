import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | CodeCrate',
  description: 'CodeCrate&apos;s privacy policy explains how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-4">
          CodeCrate (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website codecrate.app (the &quot;Site&quot;) or use our services.
        </p>
        <p className="mb-4">
          Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
        <p className="mb-4">We collect information that you provide directly to us, such as when you:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Create or modify your account</li>
          <li>Create or share code snippets (&quot;Crates&quot;)</li>
          <li>Communicate with us</li>
        </ul>
        <p className="mb-4">This information may include:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Name</li>
          <li>Email address</li>
          <li>Username</li>
          <li>Password</li>
          <li>Profile information</li>
          <li>Content of your Crates</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>Send technical notices, updates, security alerts, and support messages</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Develop new products and services</li>
          <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Sharing of Information</h2>
        <p className="mb-4">
          We may share your information with third parties in certain circumstances, such as:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>With your consent</li>
          <li>To comply with legal obligations</li>
          <li>To protect and defend our rights and property</li>
          <li>With service providers who help us operate our business</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
        <p className="mb-4">
          Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. To exercise these rights, please contact us using the information provided in the &quot;Contact Us&quot; section.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top of this policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p>
          CodeCrate<br />
          Email: privacy@codecrate.app<br />
          Address: 123 Tech Street, San Francisco, CA 94105, USA
        </p>
      </section>
    </div>
  )
}