/* LógosAI — bilingual layer (Ελληνικά / English). No framework, no build.
 *
 * English is the source of truth: it lives inline in index.html. This file
 * only carries the Greek overrides plus a tiny engine that swaps them in and
 * out, keyed by three attributes:
 *
 *   data-i18n="key"       → element.innerHTML
 *   data-i18n-ph="key"    → element placeholder
 *   data-i18n-aria="key"  → element aria-label
 *
 * The English baseline is captured on first run, so switching back to EN is
 * just "restore what was there." The visitor's pick is remembered; a first
 * visit follows the browser (el-* → Greek, everyone else → English).
 *
 * app.js reads window.LX_I18N for the handful of strings it builds itself
 * (the form's sending / success / error states).
 */
(function () {
  'use strict';

  var STORE_KEY = 'logosai.lang';

  /* ---- Greek copy. Warm-professional, singular «εσύ». Values may keep the
     same inline markup (spans, <b>, <em>, the demo link) as the English. ---- */
  var EL = {
    'nav.build': 'Τι φτιάχνουμε',
    'nav.demo': 'Ζωντανό demo',
    'nav.pricing': 'Πακέτα & τιμές',
    'nav.faq': 'Συχνές ερωτήσεις',
    'nav.cta': 'Κλείσε ραντεβού',

    'hero.pill': 'Αναλαμβάνουμε 2–3 νέα bots αυτό το τρίμηνο',
    'hero.h1': 'Bots που <span class="glow">απαντούν</span>. Agents που <span class="glow">δρουν</span>. Σελίδες που <span class="glow">πουλούν</span>.',
    'hero.sub': 'Σου βγάζουμε από πάνω τις επαναλαμβανόμενες ερωτήσεις, τα ακυρωμένα ραντεβού και τα τηλέφωνα «πού είναι η παραγγελία μου;» — μ’ έναν Greek-first βοηθό που απαντά 24/7 και κλείνει ραντεβού, ελέγχει παραγγελίες και ενημερώνει μόνος του το CRM σου. Στηριγμένο στο δικό σου περιεχόμενο, έτοιμο σε μέρες.',
    'hero.cta1': 'Μίλα στο ζωντανό bot →',
    'hero.cta2': 'Δες πακέτα & τιμές',
    'hero.meta1': '<b>1–3 μέρες</b> για ένα FAQ widget',
    'hero.meta2': '<b>Σταθερή τιμή</b> · χωρίς χρεώσεις χρήσης',
    'hero.meta3': '<b>Απευθείας</b> — μιλάς με τον developer',

    'build.kicker': 'Τι φτιάχνουμε',
    'build.h2': 'Τρία πράγματα, μία συνομιλία',
    'build.lede': 'Οι περισσότεροι πελάτες ξεκινούν από ένα και μεγαλώνουν στα υπόλοιπα. Το bot και η σελίδα μοιράζονται την ίδια φωνή, γιατί τα γράφει το ίδιο άτομο.',
    'build.c1.h3': 'Συνομιλιακά chatbots',
    'build.c1.p': 'Το widget που απαντά σε ωράρια, τιμές, «πού είστε;» — στηριγμένο στο δικό σου περιεχόμενο, ώστε οι απαντήσεις να βγαίνουν από σένα, όχι από το πουθενά.',
    'build.c1.li1': 'Ένα &lt;script&gt; tag, μπαίνει σε οποιαδήποτε σελίδα',
    'build.c1.li2': 'Ελληνικά + Αγγλικά στην ίδια συνομιλία',
    'build.c1.li3': 'Απαντά από το περιεχόμενό σου, χωρίς εφευρέσεις',
    'build.c2.h3': 'AI agents που κάνουν πράγματα',
    'build.c2.p': 'Όχι απλώς μιλούν — δρουν. Κλείνουν το ραντεβού, ελέγχουν την παραγγελία, καταχωρούν την επιστροφή, σπρώχνουν το lead στο CRM σου. Περιορισμένη πρόσβαση, κάθε ενέργεια ανιχνεύσιμη — σχεδιασμένο ανά έργο.',
    'build.c2.li1': 'Ημερολόγιο, e-shop, CRM, πληρωμές, SMS',
    'build.c2.li2': 'Περιορισμένα δικαιώματα, read-only εξ ορισμού',
    'build.c2.li3': 'Κάθε ενέργεια καταγράφεται — βλέπεις τι έκανε',
    'build.c3.h3': 'Η σελίδα όπου ζει',
    'build.c3.p': 'Αν το bot χρειάζεται σπίτι, το χτίζουμε. Γρήγορες, mobile-first landing pages και εταιρικές σελίδες — με την ίδια εστίαση στη μετατροπή, μόνο που τώρα έχουν βοηθό ενσωματωμένο αντί για μια φόρμα που δεν συμπληρώνει κανείς.',
    'build.c3.li1': 'Mobile-first, φορτώνει γρήγορα στο 4G',
    'build.c3.li2': 'Bot ενσωματωμένο, όχι βιδωμένο από πάνω',
    'build.c3.li3': 'Ο κώδικας είναι δικός σου — χωρίς δεσμεύσεις',

    'a11y.skip': 'Μετάβαση στο περιεχόμενο',

    'demo.kicker': 'Ζωντανό, όχι mockup',
    'demo.h2': 'Διάλεξε μια επιχείρηση. Μίλα στο bot της.',
    'demo.lede': 'Είναι πραγματικά, λειτουργικά bots — ακριβώς η εμπειρία που θα σου παραδίδαμε, με δείγμα δεδομένων. Διάλεξε το σενάριο που μοιάζει στη δική σου επιχείρηση και δοκίμασέ το ζωντανά, εδώ στη σελίδα.',

    'badge.live': 'Ζωντανό',
    'badge.real': 'Πραγματικός πελάτης',
    'badge.livedemo': 'Ζωντανό demo',
    'badge.custom': 'Custom · κατόπιν προσφοράς',
    'scn.try': 'Δοκίμασε το demo →',

    'scn.r.tier': 'Επίπεδο 1 · FAQ',
    'scn.r.h3': 'Ταβέρνα «Το Κύμα»',
    'scn.r.p': 'Ο βοηθός μιας ψαροταβέρνας — ωράριο, το ψάρι της ημέρας, κρατήσεις, αλλεργίες, πάρκινγκ. Απαντά ελεύθερα, ελληνικά ή αγγλικά.',
    'scn.r.li1': 'Απαντά από ένα αρχείο περιεχομένου',
    'scn.r.li2': 'Ελληνικά + Αγγλικά στην ίδια κουβέντα',
    'scn.r.li3': 'Παραπέμπει στο τηλέφωνο όταν δεν ξέρει',

    'scn.c.tier': 'Επίπεδο 2 · Κρατήσεις',
    'scn.c.h3': 'Οδοντιατρείο «Γαλήνη»',
    'scn.c.p': 'Η ρεσεψιόν ενός οδοντιατρείου — σε πάει βήμα-βήμα σε πραγματικό ραντεβού (υπηρεσία → μέρα → ώρα → στοιχεία) κι απαντά σε ερωτήσεις στην πορεία.',
    'scn.c.li1': 'Ζωντανές ώρες από το πρόγραμμα',
    'scn.c.li2': 'Κωδικός κράτησης στην επιβεβαίωση',
    'scn.c.li3': 'Συζητά ενώ κλείνει το ραντεβού',

    'scn.e.tier': 'Επίπεδο 1 · Σε παραγωγή',
    'scn.e.h3': 'Χαραλαμπίδη — e-shop λευκών ειδών',
    'scn.e.p': 'Ένα πραγματικό bot που φτιάξαμε και τρέχουμε για κατάστημα λευκών ειδών στη Θεσσαλονίκη — προτάσεις προϊόντων, διαστάσεις, τιμές, φροντίδα, επιστροφές. Ζωντανό στη σελίδα τους σήμερα.',
    'scn.e.li1': 'Προτείνει με βάση διάσταση & προϋπολογισμό',
    'scn.e.li2': 'Ένα script tag στη σελίδα τους',
    'scn.e.li3': 'Με ύφος πωλητή, όχι απλό FAQ',

    'modal.open': 'Άνοιγμα σε νέα καρτέλα ↗',
    'modal.close': 'Κλείσιμο demo',

    'proof.s1': 'Πάντα ενεργό — ακόμα κι όταν έχεις κλείσει',
    'proof.b2': '1–3 μέρες',
    'proof.s2': 'Από το πρώτο call σε ζωντανό FAQ widget',
    'proof.b3': '3 bots',
    'proof.s3': 'Ζωντανά σε αυτή τη σελίδα — δοκίμασέ τα τώρα',
    'proof.s4': 'Ο κώδικας δικός σου — χωρίς δεσμεύσεις',

    'pricing.kicker': 'Πακέτα & τιμές',
    'pricing.h2': 'Τέσσερα επίπεδα. Ξεκίνα χαμηλά, ανέβα όταν αποδίδει.',
    'pricing.lede': 'Η τιμή βασίζεται στη δουλειά που σου βγάζει από πάνω, όχι σε tokens. Μια σταθερή μηνιαία συνδρομή συν ένα εφάπαξ setup — αυτό είναι όλο: το hosting, το AI μοντέλο και η υποστήριξη περιλαμβάνονται, οπότε δεν υπάρχει έκπληξη στον λογαριασμό. Κάθε επίπεδο αναβαθμίζεται στο επόμενο χωρίς ξαναχτίσιμο, και πιστώνουμε το προηγούμενο setup όταν ανεβαίνεις.',

    'unit.mo': '/μήνα',

    't1.no': 'ΕΠΙΠΕΔΟ 1 · Ερωτήσεις',
    't1.what': 'Μια αιωρούμενη φούσκα συνομιλίας που καταλαβαίνει ελεύθερες ερωτήσεις και απαντά από το περιεχόμενό σου — ωράρια, υπηρεσίες, τιμές, τοποθεσία, πολιτικές. Στηρίζεται στο υλικό σου, οπότε όταν δεν ξέρει το λέει και σε παραπέμπει σε άνθρωπο.',
    't1.p1.desc': 'Έξυπνες ελληνικές απαντήσεις. Μικρό κατάστημα.',
    't1.p1.set': 'setup €200',
    't1.p2.desc': 'Δίγλωσσο EL/EN, πιο πλούσιο ύφος για τουρισμό.',
    't1.p2.set': 'setup €250',
    't1.fit': '<b>Ιδανικό για:</b> εστιατόρια, καταστήματα, υπηρεσίες με συχνές ερωτήσεις.',
    't1.live': '▸ Δες το ζωντανά',
    't1.cta': 'Θέλω το FAQ bot μου →',

    't2.no': 'ΕΠΙΠΕΔΟ 2 · Κρατήσεις',
    't2.what': 'Οδηγεί τον επισκέπτη στην κράτηση βήμα-βήμα (υπηρεσία → μέρα → ώρα → στοιχεία) ενώ απαντά σε ερωτήσεις στην πορεία. Οι ελεύθερες ώρες έρχονται από το δικό σου πρόγραμμα, οπότε δεν είναι ποτέ ξεπερασμένες· εκδίδει κωδικό κράτησης.',
    't2.p1.desc': 'Πλήρης ροή κράτησης + έξυπνο Q&amp;A.',
    't2.p1.set': 'setup €400',
    't2.p2.desc': 'Προχωρημένο δίγλωσσο + επιπλέον σενάρια κράτησης.',
    't2.p2.set': 'setup €450',
    't2.fit': '<b>Ιδανικό για:</b> ιατρεία, κομμωτήρια, γυμναστήρια — οτιδήποτε με ραντεβού.',
    't2.live': '▸ Δες το ζωντανά',
    't2.cta': 'Στήσε κρατήσεις →',

    't3.no': 'ΕΠΙΠΕΔΟ 3 · Πωλήσεις / lead-gen',
    't3.what': 'Ανοίγει τη συνομιλία, καταλαβαίνει τι θέλει ο επισκέπτης, αξιολογεί το ενδιαφέρον, μαζεύει στοιχεία επικοινωνίας και παραδίδει το ζεστό lead σε άνθρωπο με περίληψη της συνομιλίας.',
    't3.p1.desc': 'Σενάρια αξιολόγησης, φόρμα lead, ειδοποίηση πωλήσεων, βασικά analytics.',
    't3.mo': 'από €190<small>/μήνα</small>',
    't3.set': 'setup από €700',
    't3.range': 'Με προσφορά ανά έργο — ανάλογα με τον όγκο συνομιλιών και την πολυπλοκότητα των σεναρίων.',
    't3.fit': '<b>Ιδανικό για:</b> υπηρεσίες με leads — μεσιτικά, ασφάλειες, B2B.',
    't3.cta': 'Κλείσε ένα ραντεβού σχεδιασμού →',

    't4.no': 'ΕΠΙΠΕΔΟ 4 · Πλήρης agent',
    't4.what': 'Δεν μιλάει απλώς — κάνει τη δουλειά: κλείνει σε πραγματικό ημερολόγιο, ενημερώνει το CRM σου, στέλνει SMS/email, ακόμα και δέχεται πληρωμές. Σχεδιασμένο γύρω από τα συστήματα που ήδη έχεις.',
    't4.p1.desc': '1–3 ενσωματώσεις συστημάτων, ασφαλείς ροές, priority support.',
    't4.mo': 'από €390<small>/μήνα</small>',
    't4.set': 'setup από €1200',
    't4.range': 'Πάντα με προσφορά ανά έργο — το κόστος καθορίζεται από τις ενσωματώσεις και τους ελέγχους ασφαλείας.',
    't4.fit': '<b>Ιδανικό για:</b> επιχειρήσεις με συστήματα που θέλουν πραγματική αυτοματοποίηση.',
    't4.cta': 'Σχεδίασε την ενσωμάτωση →',

    'addons.h4a': 'Πρόσθετα',
    'addon.a1': '<span>Κανάλι WhatsApp / Instagram / Messenger</span><b>+€25–45/μήνα</b>',
    'addon.a2': '<span>Επιπλέον γλώσσα πέρα από EL/EN</span><b>+€10/μήνα</b>',
    'addon.a3': '<span>Σύνδεση με εξωτερικό σύστημα <em>(ανά ενσωμάτωση)</em></span><b>από €250 εφάπαξ</b>',
    'addon.a4': '<span>Μηνιαία αναφορά &amp; analytics</span><b>+€15/μήνα</b>',
    'addon.a5': '<span>Priority support</span><b>+€20/μήνα</b>',
    'addons.h4b': 'Εκπτώσεις & ευελιξία',
    'addon.d1': '<span>Ετήσια προπληρωμή</span><b>2 μήνες δώρο (−16%)</b>',
    'addon.d2': '<span>Εποχικές επιχειρήσεις (π.χ. ταβέρνες)</span><b>χειμερινή παύση / μειωμένο εκτός σεζόν</b>',
    'addon.d3': '<span>Αναβάθμιση επιπέδου όποτε θες</span><b>πίστωση προηγούμενου setup</b>',
    'addons.vat': 'Όλες οι τιμές σε € χωρίς ΦΠΑ 24%. Ενδεικτικές και προσαρμόσιμες ανά έργο — ελληνική αγορά.',

    'proc.kicker': 'Πώς πάει',
    'proc.h2': 'Από το πρώτο call στο live σε πέντε βήματα',
    'proc.s1.h4': 'Κλήση γνωριμίας',
    'proc.s1.p': 'Τι πρέπει να αναλάβει ή να κάνει; Επιλέγουμε μαζί το επίπεδο και το μοντέλο. Χωρίς δέσμευση.',
    'proc.s2.h4': 'Ροή & περιεχόμενο',
    'proc.s2.p': 'Χαρτογραφούμε τη συνομιλία και μαζεύουμε το FAQ, τα έγγραφα ή την πρόσβαση στα συστήματά σου. Εγκρίνεις τη ροή.',
    'proc.s3.h4': 'Build & tuning',
    'proc.s3.p': 'Prompting, retrieval ή tool-calling, φωνή της μάρκας. Το δοκιμάζεις σε staging link.',
    'proc.s4.h4': 'Ενσωμάτωση',
    'proc.s4.p': 'Ημερολόγιο, CRM, e-shop — συνδεδεμένα με περιορισμένα credentials και audit log. Πρώτα σε sandbox.',
    'proc.s5.h4': 'Launch & παρακολούθηση',
    'proc.s5.p': 'Ένα script tag βγαίνει live. Παρακολουθούμε τις πρώτες εβδομάδες και διορθώνουμε ό,τι αστοχεί.',

    'why.kicker': 'Γιατί εμάς, συγκεκριμένα',
    'why.h2': 'Φτιαγμένο για να το εμπιστεύεσαι',
    'why.i2.h4': 'Greek-first, όχι ελληνικά εκ των υστέρων',
    'why.i2.p': 'Το μοντέλο επιλέγεται ανά πελάτη, όχι ένα-για-όλους — premium μοντέλα όπου μετράει το ελληνικό ύφος και η ακρίβεια, οικονομικότερα όπου το δικαιολογεί ο όγκος.',
    'why.i4.h4': 'Agentic, αλλά προσεκτικά',
    'why.i4.p': 'Credentials κρυπτογραφημένα σε secrets manager, δικαιώματα ελάχιστων προνομίων, rate limiting, και μια γραμμή audit για κάθε ενέργεια του bot.',
    'why.i6.h4': 'Ένα άτομο, από την αρχή ως το τέλος',
    'why.i6.p': 'Χωρίς ενδιάμεσους account managers. Το άτομο που σχεδιάζει το bot είναι αυτό που το χτίζει και αυτό στο οποίο θα γράψεις όταν κάτι στραβώσει.',

    'faq.kicker': 'Καθαρές απαντήσεις',
    'faq.h2': 'Ερωτήσεις που μας κάνουν συχνά',
    'faq.q1': 'Θα βγάζει πράγματα απ’ το μυαλό του;',
    'faq.a1': 'Απαντά από το περιεχόμενο που του δίνεις και έχει οδηγία να λέει «Δεν ξέρω — δες εδώ πώς να βρεις άνθρωπο» όταν κάτι είναι εκτός θέματος. Το να στηρίζεται στο δικό σου υλικό αντί να αυτοσχεδιάζει είναι ακριβώς αυτό που το κρατά από το να εφευρίσκει ωράρια ή τιμές. Δοκιμάζουμε τα όρια πριν το launch.',
    'faq.q2': 'Χρειάζεστε τους κωδικούς μας;',
    'faq.a2': 'Για τα Επίπεδα 1 και 2, ουσιαστικά όχι — ένα bot Ερωτήσεων δεν κρατά credentials, ένα bot Κρατήσεων θέλει απλώς πρόσβαση σε ημερολόγιο/email. Μόνο το πλήρες Επίπεδο Agent αγγίζει πραγματικά συστήματα, κι εκεί χρησιμοποιούμε περιορισμένα κλειδιά ελάχιστων προνομίων, κρυπτογραφημένα, με κάθε ενέργεια καταγεγραμμένη ώστε να ελέγχεις τι έκανε.',
    'faq.q3': 'Υπάρχουν κρυφές χρεώσεις χρήσης πάνω από τη μηνιαία τιμή;',
    'faq.a3': 'Όχι. Η συνδρομή του επιπέδου είναι σταθερή και ήδη περιλαμβάνει το hosting και το AI μοντέλο, οπότε δεν υπάρχει ξεχωριστός «λογαριασμός API» που ανεβαίνει με την κίνηση. Ακόμα και στο πιο ακριβό μοντέλο, το κόστος λειτουργίας μας μένει αρκετά κάτω από όσα καλύπτει η συνδρομή — γι’ αυτό η τιμή βασίζεται στην αξία (λιγότερα τηλέφωνα, λιγότερα ακυρωμένα ραντεβού, 24/7), όχι σε tokens.',
    'faq.q4': 'Μιλάει σωστά ελληνικά;',
    'faq.a4': 'Ναι — κάθε επίπεδο είναι δίγλωσσο EL/EN εξ ορισμού και το περιεχόμενο γράφεται στα ελληνικά. Επιλέγουμε το μοντέλο ανά πελάτη: premium μοντέλα όπου μετράει περισσότερο το ελληνικό ύφος και οι λεπτές αποχρώσεις, πιο οικονομικά όπου το δικαιολογεί ο μεγάλος όγκος συνομιλιών.',
    'faq.q5': 'Έχουμε ήδη ιστοσελίδα. Χρειαζόμαστε καινούρια;',
    'faq.a5': 'Όχι. Το chatbot μπαίνει στην υπάρχουσα σελίδα σου μ’ ένα script tag. Φτιάχνουμε σελίδα μόνο αν τη θες ή αν η τωρινή εμποδίζει το bot.',
    'faq.q6': 'Κι αν ξεπεράσουμε το επίπεδο από το οποίο ξεκινάμε;',
    'faq.a6': 'Αυτό είναι το σχέδιο. Αναβάθμιση όποτε θες — ένα bot Ερωτήσεων μεγαλώνει σε Κρατήσεις, οι Κρατήσεις σε Πωλήσεις, και οποιοδήποτε σε πλήρη Agent. Χωρίς ξαναχτίσιμο, και πιστώνουμε το setup που ήδη πλήρωσες στο νέο επίπεδο. Τα επίπεδα μπορούν να είναι και υβριδικά: π.χ. ένα bot Ερωτήσεων μ’ ένα κουμπί κράτησης δανεισμένο από το Επίπεδο 2.',
    'faq.q7': 'Μας ανήκει;',
    'faq.a7': 'Ναι. Το build είναι δικό σου. Η συνδρομή managed-service είναι προαιρετική — σταμάτα την όποτε θες, το bot παραμένει δικό σου. Χωρίς δεσμεύσεις.',

    'contact.kicker': 'Επικοινωνία',
    'contact.h3': 'Πες μας τι σε πνίγει.',
    'contact.p': 'Οι επαναλαμβανόμενες ερωτήσεις, τα ακυρωμένα ραντεβού, τα τηλέφωνα για το πού είναι η παραγγελία — ό,τι κι αν είναι, μάλλον υπάρχει επίπεδο γι’ αυτό. Γράψε μας και απαντάμε μέσα σε μία εργάσιμη, συνήθως με μια-δυο ερωτήσεις πριν δώσουμε τιμή.',
    'contact.ch1.label': 'Κλήση ή WhatsApp',
    'contact.ch2.label': 'Email',
    'contact.ch3.label': 'Έδρα',
    'contact.ch3.val': 'Ελλάδα — δουλεύουμε εξ αποστάσεως με επιχειρήσεις σε όλη την ΕΕ',

    'form.ph.name': 'Το όνομά σου',
    'form.ph.email': 'Email',
    'form.ph.company': 'Επωνυμία επιχείρησης (προαιρετικό)',
    'form.ph.message': 'Ποιο είναι το επαναλαμβανόμενο πράγμα που θα ήθελες να δώσεις αλλού; Δυο προτάσεις αρκούν.',
    'form.opt.0': 'Τι ψάχνεις; (προαιρετικό)',
    'form.opt.1': 'Επίπεδο 1 · Bot Ερωτήσεων — απάντηση σε ερωτήσεις πελατών',
    'form.opt.2': 'Επίπεδο 2 · Bot Κρατήσεων — οδήγησε επισκέπτες σε ραντεβού',
    'form.opt.3': 'Επίπεδο 3 · Bot Πωλήσεων — αξιολόγησε &amp; μάζεψε leads',
    'form.opt.4': 'Επίπεδο 4 · Πλήρης Agent — σύνδεση με τα συστήματά μας',
    'form.opt.5': 'Μια ιστοσελίδα (με ή χωρίς bot)',
    'form.opt.6': 'Δεν είμαι σίγουρος ακόμα — βοήθησέ με να διαλέξω',
    'form.submit': 'Στείλ’ το →',
    'form.note': 'Απαντάμε μέσα σε μία εργάσιμη. Χωρίς spam, χωρίς drip — απλώς ένας άνθρωπος.',

    'foot.copy': 'LógosAI — chatbots, AI agents &amp; ιστοσελίδες. Αθήνα.',
    'foot.pricing': 'Τιμές',
    'foot.demo': 'Demo',
    'foot.contact': 'Επικοινωνία',

    'sticky.call': 'Κλήση',
    'nav.menu': 'Άνοιγμα μενού'
  };

  /* ---- <title> + <meta description> per language ---- */
  var META = {
    en: {
      title: 'LógosAI — Chatbots, AI Agents & Websites for Greek businesses',
      desc: 'LógosAI designs conversational chatbots, action-taking AI agents, and the websites they live on. Greek-first, bilingual EL/EN. Live demos on the page.'
    },
    el: {
      title: 'LógosAI — Chatbots, AI Agents & ιστοσελίδες για ελληνικές επιχειρήσεις',
      desc: 'Η LógosAI σχεδιάζει συνομιλιακά chatbots, AI agents που εκτελούν ενέργειες, και τις ιστοσελίδες όπου ζουν. Greek-first, δίγλωσσα EL/EN. Ζωντανά demos στη σελίδα.'
    }
  };

  /* ---- strings app.js builds at runtime (the form's states) ---- */
  var DYN = {
    'form.sending': { en: 'Sending…', el: 'Αποστολή…' },
    'form.ok.title': { en: 'Got it ✓', el: 'Το λάβαμε ✓' },
    'form.ok.body': {
      en: 'Thanks {name}. We read every message ourselves — expect a reply within one business day, usually with a couple of questions about your use case before any number gets quoted.',
      el: 'Ευχαριστούμε {name}. Διαβάζουμε κάθε μήνυμα οι ίδιοι — περίμενε απάντηση μέσα σε μία εργάσιμη, συνήθως με μερικές ερωτήσεις για την περίπτωσή σου πριν δοθεί οποιαδήποτε τιμή.'
    },
    'form.err': {
      en: 'Hmm, that didn’t send (an adblocker can do this). Email us directly and we’ll pick it up.',
      el: 'Χμ, δεν στάλθηκε (μπορεί να φταίει κάποιος adblocker). Στείλε μας email απευθείας και θα το δούμε.'
    }
  };

  var meta = document.querySelector('meta[name="description"]');
  var baseHTML = new Map();   // captured English innerHTML, per element
  var basePH = new Map();     // captured English placeholders
  var baseAria = new Map();   // captured English aria-labels
  var lang = 'en';

  function preferred() {
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (saved === 'el' || saved === 'en') return saved;
    } catch (e) { /* private mode / storage off — fall through to the browser */ }
    return /^el\b/i.test(navigator.language || navigator.userLanguage || '') ? 'el' : 'en';
  }

  function swap(attr, store, map, setter) {
    var nodes = document.querySelectorAll('[' + attr + ']');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute(attr);
      if (!store.has(el)) store.set(el, setter.read(el));
      var override = lang === 'el' ? map[key] : null;
      setter.write(el, override != null ? override : store.get(el));
    }
  }

  function apply(next) {
    lang = next === 'el' ? 'el' : 'en';
    document.documentElement.lang = lang;

    swap('data-i18n', baseHTML, EL, {
      read: function (el) { return el.innerHTML; },
      write: function (el, v) { el.innerHTML = v; }
    });
    swap('data-i18n-ph', basePH, EL, {
      read: function (el) { return el.getAttribute('placeholder') || ''; },
      write: function (el, v) { el.setAttribute('placeholder', v); }
    });
    swap('data-i18n-aria', baseAria, EL, {
      read: function (el) { return el.getAttribute('aria-label') || ''; },
      write: function (el, v) { el.setAttribute('aria-label', v); }
    });

    var m = META[lang];
    document.title = m.title;
    if (meta) meta.setAttribute('content', m.desc);

    var toggles = document.querySelectorAll('[data-lang-set]');
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].setAttribute('aria-pressed', toggles[i].getAttribute('data-lang-set') === lang ? 'true' : 'false');
    }

    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* nothing we can do */ }
  }

  // the toggle buttons live in both the nav and the drawer; one delegated handler
  document.addEventListener('click', function (ev) {
    var btn = ev.target.closest && ev.target.closest('[data-lang-set]');
    if (!btn) return;
    ev.preventDefault();
    apply(btn.getAttribute('data-lang-set'));
  });

  // what app.js calls for its runtime strings
  window.LX_I18N = {
    t: function (key) {
      var pair = DYN[key];
      if (!pair) return key;
      return pair[lang] || pair.en;
    },
    get lang() { return lang; }
  };

  apply(preferred());
})();
