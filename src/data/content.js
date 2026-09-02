// ---------------------------------------------------------------------------
// Everything on the page lives here. To change the site, edit this file only —
// you should not need to touch the components.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Md. Rakib Mahmud\u00A0Hridoy',
  eyebrow: 'Mobile engineer · Dhaka, Bangladesh',
  status: 'Session established · open to on-site, remote and relocation',
  resume: 'Md_Rakib_Mahmud_Hridoy_Resume.pdf',
  email: 'hridoyrakibmahmud@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rakib-mahmud-hridoy/',
  // Set to a URL string to show the GitHub button. Leave null to hide it.
  // Turn it on once the profile has a README and a current Kotlin/Compose or
  // Flutter repo pinned — see README.md.
  github: 'https://github.com/hridoyRakibMahmud',
};

// Contact form backend. Free tier: 250 submissions/month, no dashboard needed.
// 1. Go to web3forms.com, enter your email, and they send you an access key.
// 2. Paste it below. That's the whole setup — no account, no server.
// Leave it null and the form is replaced by your email address instead.
export const contact = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '6aada0b9-7a94-43f8-9c1f-87e400df2ff4',
};

export const bootLines = [
  { dir: 'out', text: 'INVITE — sip:hridoy@dhaka' },
  { dir: 'in', code: '100', text: 'Trying' },
  { dir: 'in', code: '180', text: 'Ringing' },
  { dir: 'in', code: '200', text: 'OK' },
  { dir: 'out', text: 'ACK' },
];

export const strengths = [
  {
    title: 'Native Android',
    icon: 'modules',
    body: 'Kotlin and Jetpack Compose, with the unglamorous parts included: multi-module builds, Play Store releases, billing, and crash triage after launch.',
  },
  {
    title: 'Flutter',
    icon: 'crossplatform',
    body: 'Feature work inside a large production codebase — Clean Architecture, BLoC, GetIt and Drift — rather than tutorial apps. My primary route to cross-platform; I have shipped React Native too.',
  },
  {
    title: 'Real-time systems',
    icon: 'realtime',
    body: 'SIP signalling over Asterisk, self-hosted WebRTC conferencing, and rebuilding live system state from event streams. Reconnection and recovery are the hard part.',
  },
];

// Each block is either { label, items: [...] } for bullets
// or { label, text: '...' } for a paragraph.
export const projects = [
  {
    title: 'Employee HR & attendance platform',
    icon: 'attendance',
    tag: 'Live on Google Play',
    stack: ['Flutter · Dart', 'BLoC · GetIt · Drift', 'REST'],
    blocks: [
      {
        label: 'Overview',
        items: [
          'An HR platform whose attendance people can actually trust — punch in and out, live status, and a month of history they can check against a payslip.',
          'Built in Flutter inside an existing Clean Architecture codebase: data, domain and presentation per feature, BLoC for state, GetIt for injection, GoRouter for navigation.',
        ],
      },
      {
        label: 'What I built',
        items: [
          'The attendance and time-tracking module, end to end.',
          'The leave subsystem — balances, formal and emergency requests, early-leave and extra-time claims.',
          'The manager side: bulk approve and reject, rejection reasons, and status filtering.',
          'Followed the established house pattern throughout rather than introducing my own — matching an existing structure mattered more here than having opinions about it.',
        ],
      },
    ],
    scope: "Built by a team of three. My scope was the attendance, leave and HR workflow modules — the calling, chat and location-tracking subsystems were my teammates'.",
  },
  {
    title: 'Drill-down region map package',
    tag: 'Open source · Flutter package',
    repoUrl: 'https://github.com/hridoyRakibMahmud/geo_drilldown',
    icon: 'drilldown',
    stack: ['Flutter · Dart', 'CustomPainter, zero dependencies', 'GeoJSON'],
    blocks: [
      {
        label: 'Overview',
        items: [
          "A standalone Flutter package for an interactive region map: tap a division to zoom in and reveal its districts, tap a district to reveal points inside it — built generic against any GeoJSON rather than hardcoded to one country.",
          'Renders as flat, stylised shapes via CustomPainter — no tile server, no API key, no map SDK, and it works unchanged on mobile and web.',
          "Ships with real Bangladesh boundary data (UN OCHA's humanitarian boundary dataset), simplified from over 200,000 polygon vertices down to about 7,000 with mapshaper so the shapes redraw smoothly during the zoom animation.",
        ],
      },
      {
        label: 'Built with AI-assisted development',
        text: "I directed an AI coding tool through the implementation, reviewing and testing every part rather than writing it line by line. The design calls were mine: computing each region's label anchor as the point deepest inside its shape rather than a bounding-box centre, which matters once real coastlines and offshore islands are involved; catching that hashing region ids into a fixed color palette collides once you have more regions than colors, and specifying hue-spacing across the full color wheel instead, which is collision-free for any count; and using the actual WCAG luminance formula for label text contrast rather than a naive lightness check, which gets pure yellow and pure blue — identical lightness, opposite correct answers — both right.",
      },
      {
        label: 'Also',
        items: [
          'Over 500 lines of tests, covering the GeoJSON parser, the projection math, the color scheme’s guarantees, and the label-anchor edge cases.',
        ],
      },
    ],
  },
  {
    title: 'Cabin crew calling console',
    icon: 'aircraft',
    tag: 'Aircraft cabin systems',
    stack: ['Android · Java', 'Asterisk AMI · SIP/VoIP', 'OrmLite + SQLCipher', 'Firebase Remote Config'],
    blocks: [
      {
        label: 'Overview',
        items: [
          'On an aircraft, the crew interphone is built into the airframe — a fixed hardware console used to route calls around the cabin.',
          'Most calls land there first, because the person calling rarely knows the cabin extension they actually want; a crew member takes the call and forwards it.',
          'This project moved that console off dedicated hardware and onto an Android app.',
        ],
      },
      {
        label: 'Hardest part',
        text: 'A console is only useful if it shows live state for every extension on the system — who is on a call, who is on a second one, which trunks are currently in use. Asterisk won\u2019t answer that as a question; it emits a continuous stream of events instead. I integrated asterisk-java to subscribe to the AMI event stream, reconstructed the state of every extension and trunk from those events, and kept that model in sync as new ones arrived, so the crew see what is happening now rather than a list that was true a minute ago.',
      },
      {
        label: 'What I built',
        items: [
          'The AMI integration and the entire interface.',
          'Local storage of call records and configuration in OrmLite behind SQLCipher, so nothing sensitive sits unencrypted on the device.',
          'Firebase Remote Config for configuration changes and forced updates, without a manual redeployment to every installation.',
        ],
      },
    ],
  },
  {
    title: 'VoIP calling apps',
    icon: 'voip',
    tag: 'Deployed on aircraft',
    stack: ['Android · Java', 'SIP · in-house SDK', 'OrmLite + SQLCipher', 'Firebase Analytics & Crashlytics'],
    blocks: [
      {
        label: 'Overview',
        items: [
          'Softphones for any organisation running its own telephony server — colleagues reaching each other on internal extensions, outside calls routed through a trunk.',
          'Works against any SIP server you point it at: a fifty-person company on its own PBX is the same setup as anything larger.',
          "The deployment I worked on was aircraft, where calls run in three directions — aircraft to ground, ground to aircraft, and aircraft to aircraft — with cabin extensions staying on the aircraft's own system.",
        ],
      },
      {
        label: 'Hardest part',
        text: "The communication layer came from an SDK built in-house at the company, and getting it to behave inside the calling flow was the bulk of the work. I owned that integration — wiring the SDK to the call handling so that placing, receiving and routing a call behaved the same in every direction, rather than only the straightforward one.",
      },
      {
        label: 'What I built',
        items: [
          "The SDK integration and its wiring into the app's call handling.",
          'Encrypted local storage for call data and configuration, using OrmLite behind SQLCipher.',
          'Firebase Analytics and Crashlytics for release monitoring.',
        ],
      },
    ],
  },
  {
    title: 'Virtual second-number app',
    icon: 'globe',
    tag: 'Live on Google Play',
    stack: ['Android · Java · Kotlin', 'SIP · in-house SDK · REST', 'Google Play Billing', 'Jetpack Navigation', 'OrmLite + SQLCipher', 'Firebase Auth, Analytics & Crashlytics'],
    blocks: [
      {
        label: 'Overview',
        items: [
          'People who already have a SIM in their phone often need a number somewhere else — a US number, or one in whichever country they do business with.',
          'The app sells them a virtual number over SIP and lets them call internationally from it, without a second handset or a second SIM.',
        ],
      },
      {
        label: 'Hardest part',
        text: 'Sourcing and managing the numbers themselves. Inventory came from an external provider through APIs, plumbed in via the cloud backend, and I built the integration that turns that into numbers a user can actually browse, buy and hold inside the app.',
      },
      {
        label: 'Also mine',
        items: [
          "Payments and subscriptions through Google Play Billing — including the parts that aren't the happy path: failed payments, subscription state changes, and behaving correctly in each rather than assuming the purchase went through.",
          "Registration and verification. Some countries require identifying information before a number can be issued at all, so the app collects what's needed and tells the user plainly what's missing instead of failing silently.",
        ],
      },
    ],
    scope: "I built most of the app's API integrations and its major features, and took on the larger share of development after the product was rebranded.",
  },
  {
    title: 'Enterprise video conferencing platform',
    icon: 'conferencing',
    tag: 'Self-hosted infrastructure',
    stack: ['Jitsi · Prosody · Jicofo', 'JVB · Coturn', 'Debian · Nginx', 'Moodle plugin'],
    blocks: [
      {
        label: 'Overview',
        items: [
          'Conferencing that organisations run themselves rather than buying seats on somebody else\u2019s service.',
          'Licensed per organisation: a customer buys a licence, then gets a CMS where administrators add members, manage participants and schedule sessions.',
          'Both registered members and outside guests can be invited; participants join through the conferencing app itself.',
        ],
      },
      {
        label: 'Hardest part',
        text: "Standing up the server. The first deployment went onto an Ubuntu VM and hit problems the team couldn't clear, so we rebuilt on Debian and I took the deployment end to end — configuring the full Jitsi stack of Prosody, Jicofo, JVB and Coturn behind an Nginx reverse proxy until the system was actually operational. Hardening followed: JWT authentication, Prosody domain matching, Jicofo trusted-domain configuration, secure WebSocket upgrade, and firewall rules.",
      },
      {
        label: 'What I built',
        items: [
          'The server environment, end to end.',
          'The mobile and web clients alongside colleagues — session recording, and an in-meeting whiteboard for drawing, presenting PDFs and sharing slides.',
          'A plugin embedding the platform inside Moodle, so course users create and join scheduled sessions without opening the conferencing app separately.',
        ],
      },
    ],
  },
  {
    title: 'Telemedicine consultation app',
    icon: 'vitals',
    tag: 'Internal product',
    stack: ['React Native', 'REST', 'Medical device SDKs'],
    blocks: [
      {
        label: 'Overview',
        items: [
          'Built around clinical hardware — without a device attached there is very little for the app to do, because nearly every feature depends on a reading coming off an instrument.',
          'The main device is the Mintti Vision, measuring blood pressure, body temperature, blood oxygen, heart rate and blood glucose.',
          'It also supports the Mintti Heartbook for continuous single-lead ECG, heart-rate variability and respiratory rate, and a digital stethoscope with heavy sound amplification, active noise cancellation and a live phonocardiogram trace.',
        ],
      },
      {
        label: 'What I built',
        items: [
          'The interface, and the API layer connecting it to backend services.',
          'The path a completed measurement takes from device to server, so a reading can be pulled back up from somewhere else.',
          'Consultation booking, where a patient schedules time with a doctor against the readings already on file.',
        ],
      },
    ],
    scope: 'An internal SaaS product, not yet released to customers. My scope was the UI and API integration — the medical device SDK integration itself was not mine.',
  },
];

export const toolkit = [
  { label: 'Native Android', body: 'Kotlin, Java, Jetpack Compose, Coroutines & Flow, Hilt, Room, Retrofit, Material Design, Google Play Billing' },
  { label: 'Flutter', body: 'Dart, flutter_bloc, GetIt, GoRouter, Drift, Dio, Firebase Crashlytics & Remote Config' },
  { label: 'Other cross-platform', body: 'React Native, JavaScript, TypeScript' },
  { label: 'Architecture', body: 'MVVM, MVI, Clean Architecture, multi-module design, dependency injection, offline-first patterns' },
  { label: 'Real-time & telephony', body: 'SIP, VoIP, Asterisk AMI, asterisk-java, Jitsi stack, WebRTC' },
  { label: 'Backend & data', body: 'RESTful API design, MySQL, SQLite, ORMLite, Firebase services, JWT authentication' },
  { label: 'Ways of working', body: 'Git, Docker, Nginx, Azure, Jira, Agile/Scrum, Play Store release management, AI-assisted development' },
];
