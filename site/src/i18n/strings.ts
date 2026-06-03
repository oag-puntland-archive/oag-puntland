// i18n strings for the OAG Puntland public accountability platform (v1).
// All strings are authored manually in both English and Somali. No machine
// translation of audit content — see ADR 0004 and governance/doctrine.md §3.

export type Locale = "en" | "so";

export const LOCALES: Locale[] = ["en", "so"];

export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
  so: "Soomaali",
};

export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  so: "so",
};

export const DIR: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  so: "ltr",
};

// Site-wide strings keyed by canonical English label.
type Strings = Record<string, Record<Locale, string>>;

export const T: Strings = {
  // --- Institutional identity ---
  institution: {
    en: "Office of the Auditor General — Puntland State of Somalia",
    so: "Xafiiska Hantidhawrka Guud — Dowladda Puntland ee Soomaaliya",
  },
  institution_short: {
    en: "OAG Puntland",
    so: "XHG Puntland",
  },
  tagline: {
    en: "The verifiable public record of the Office of the Auditor General.",
    so: "Diiwaanka guud ee la xaqiijin karo ee Xafiiska Hantidhawrka Guud.",
  },

  // --- Top navigation ---
  nav_home: { en: "Home", so: "Bogga Hore" },
  nav_about: { en: "About", so: "Xafiiska" },
  nav_authority: { en: "Authority", so: "Awooda" },
  nav_methodology: { en: "Methodology", so: "Habka Hawsha" },
  nav_standards: { en: "Standards conformance", so: "Heerarka & u-hoggaansanaanta" },
  nav_reports: { en: "Audit reports", so: "Warbixinno baaris" },
  nav_legislation: { en: "Legislation", so: "Sharciyada" },
  nav_source_safety: { en: "Reporting concerns", so: "Soo gudbinta walaaca" },
  nav_custody: { en: "Custody & mirrors", so: "Xafidka & nuqulladaa" },
  nav_contact: { en: "Contact", so: "Xiriir" },

  // --- Footer ---
  footer_corpus_link: {
    en: "Source corpus (Git)",
    so: "Source corpus (Git)",
  },
  footer_doctrine_link: { en: "Operating doctrine", so: "Habka Hawlgalka" },
  footer_provenance_link: { en: "Provenance ledger", so: "Diiwaanka Asalka" },
  footer_archive_label: { en: "Public archive snapshots", so: "Nuqullada arkifka" },
  footer_mirrors_label: { en: "Mirrors", so: "Nuqullada" },
  footer_built_from: {
    en: "Site generated deterministically from the corpus. A fresh clone reproduces this site byte-for-byte. Tampering is detectable.",
    so: "Bogga waxaa laga abuuray corpus si is-soo-celisid leh. Nuqul cusub wuxuu soo saaraa boggan byte-byte ah. Wax-ka-bedelka waa la ogaadaan karaa.",
  },
  footer_independence_note: {
    en: "v1 republishes only content the OAG has already lawfully made public. No new disclosures are introduced. See doctrine §1.",
    so: "Nuqulkan 1aad wuxuu soo daabaca oo kaliya waxa OAG horey u daabacday si sharci ah. Wax cusub lama daabacin. Eeg habka hawlgalka §1.",
  },

  // --- Home page ---
  home_h1: {
    en: "Public accountability for Puntland, on the public record.",
    so: "Xisaab-xirka guud ee Puntland, diiwaan furan ku qoran.",
  },
  home_lede: {
    en: "This site is the verifiable, mirrored, tamper-evident republication of every audit report and reference statute the Office of the Auditor General of Puntland State of Somalia has already made public. The institution remains the author; this site remains the record.",
    so: "Bogganu waa daabacaadda la xaqiijin karto, ee nuqullo leh, ee la garan karo wax-ka-bedelka, ee dhammaan warbixinnada baaris iyo sharciyada Xafiiska Hantidhawrka Guud ee Dowladda Puntland ee Soomaaliya ay horey u daabacday. Xafiiska ayaa weli ah qoraaga; bogganu wuxuu yahay diiwaanka.",
  },
  home_what_v1_does: {
    en: "What this site does",
    so: "Waxa bogganu sameeyo",
  },
  home_what_v1_does_body: {
    en: "Republishes every already-public OAG audit report with verified language and year (taken from the PDF's own masthead, not from a WordPress label). Re-hosts Puntland legislation the OAG keeps as reference material. Carries a written operating doctrine, an architecture decision record, and signed mirrors so that the public record cannot be silently altered or silently removed.",
    so: "Wuxuu soo daabacaa warbixin kasta oo baaris ah ee OAG ee horey loo daabacay, isagoo leh luqad iyo sanad la xaqiijiyay (oo laga soo qaaday cinwaanka PDF-ka lafteeda, ee aan laga soo qaadin sumadda WordPress). Wuxuu sii daabacaa sharciyada Puntland ee OAG ay u haysato sida xog raad-raac. Wuxuu wataa habka hawlgalka oo qoran, diiwaanka go'aannada qaab-dhismeedka, iyo nuqullo la saxiixay, si diiwaanka guud uusan si qarsoodi ah loogu beddelin ama loogu tirtirin.",
  },
  home_what_v1_does_not_do: {
    en: "What this site does NOT do",
    so: "Waxa bogganu aanan samayn",
  },
  home_what_v1_does_not_do_body: {
    en: "Does not collect whistleblower information online — the institution cannot legally guarantee what a digital intake form would imply. Does not auto-translate audit findings. Does not surface a recommendation tracker, entity ranking, or accountability score. Does not host any generative-AI feature. These restraints are deliberate; see the doctrine for why.",
    so: "Ma uruurinayo macluumaadka qabanqaabada online — xafiisku ma awoodo inuu si sharci ah u dammaano waxa uu foom-soo-jeedinta dhijitaalka ahi tilmaami lahaa. Lama turjumayo waxsoosaarka baarista si toos ah. Lama soo bandhigayo raad-raac ku saabsan talooyinka, sumad-bixinta hay'adaha, ama dhibcaha xisaab-xirka. Ma martigeliyo wax-soo-saar AI generative ah. Xayiraadaha-naxariis-leh waxay yihiin kuwo si ula-kac ah loo doortay; eeg habka hawlgalka si aad u ogaato sababta.",
  },
  home_primary_links: {
    en: "Start here",
    so: "Halkan ka bilow",
  },

  // --- Reports library ---
  reports_h1: { en: "Audit reports", so: "Warbixinnada Baarista" },
  reports_lede: {
    en: "Every report below is rendered from the structured corpus, not from a hand-curated list. The fiscal year and language of every PDF are taken from the PDF's own masthead. Where one language version has not yet been officially published, an honest 'official translation pending' marker stands in for it — never a machine translation (doctrine §3).",
    so: "Warbixin kasta oo hoose waxaa laga soo bixiyaa corpus-ka qaabaysan, ee aan laga soo bixin liis gacanta lagu sameeyay. Sanad-miisaaniyeedka iyo luqadda PDF kasta waxaa laga soo qaadaa cinwaanka PDF-ka lafteeda. Halka uu hal nooc oo luqadeed weli si rasmi ah loo daabicin, calaamad daacad ah 'daabacaadda rasmiga ah la sugayo' ayaa lagu beddelaa — marna ma aha turjumaad qalabaysan (Habka §3).",
  },
  reports_empty_category: {
    en: "No published reports in this category yet.",
    so: "Weli warbixinno la daabacay kuma jiraan qaybtan.",
  },
  reports_filter_by_fy: { en: "Fiscal year", so: "Sanad-miisaaniyeed" },
  reports_filter_by_category: { en: "Category", so: "Qaybta" },
  reports_filter_by_language: { en: "Language", so: "Luqad" },
  reports_download_pdf: { en: "Download PDF", so: "Soo dejiso PDF" },
  reports_view_summary: { en: "View summary", so: "Eeg guudmar" },
  reports_official_translation_pending: {
    en: "Official translation pending. The other-language edition above is authoritative. Machine translation of audit findings is not provided (doctrine §3).",
    so: "Daabacaadda rasmiga ah waa la sugayaa. Daabacaadda luqadda kale ee kor ku xusan ayaa ah tan rasmiga ah. Turjumaad qalabaysan oo waxsoosaarka baarista ah lama bixiyo (Habka §3).",
  },
  reports_provenance_label: { en: "Provenance", so: "Asalka" },
  reports_sha256_label: { en: "SHA-256", so: "SHA-256" },
  reports_bytes_label: { en: "Size", so: "Cabbirka" },
  reports_pages_label: { en: "Pages", so: "Bogag" },
  reports_issued_label: { en: "Issued", so: "La daabacay" },
  reports_issuer_label: { en: "Issued by", so: "Waxaa daabacay" },
  reports_fetched_label: { en: "Sourced from", so: "Laga soo qaaday" },

  // --- Legislation ---
  legislation_h1: { en: "Legislation (reference)", so: "Sharciyada (xog-raac)" },
  legislation_lede: {
    en: "These statutes are republished by the OAG as reference material. They are NOT OAG-authored audit outputs; the publisher of each is the State of Puntland (Council of Ministers / Parliament). English titles are unofficial contextual translations and are marked as such.",
    so: "Sharciyadaani waxaa OAG dib u daabacaa sidii xog raad-raac. MA aha waxsoosaar baaris oo OAG qoray; daabacaha mid kasta waa Dowladda Puntland (Golaha Wasiirrada / Baarlamaanka). Cinwaannada Ingiriisiga ahi waa turjumaad aan rasmi ahayn oo lagu calaamadiyay sidaas.",
  },
  legislation_role_audit_relevant: {
    en: "Audit-relevant statute",
    so: "Sharci la xiriira baarista",
  },
  legislation_role_reference: {
    en: "Reference statute",
    so: "Sharci tixraac",
  },
  legislation_year: { en: "Enacted", so: "La meel-mariyay" },
  legislation_download: { en: "Download statute (PDF)", so: "Soo dejiso sharciga (PDF)" },
  legislation_unofficial_translation_marker: {
    en: "Unofficial English title (contextual translation only).",
    so: "Cinwaan Ingiriis aan rasmi ahayn (turjumaad guud oo kaliya).",
  },
  legislation_audit_act_absent: {
    en: "Note: the OAG's own enabling statute (an 'Audit Act') is not yet in this public collection. The Public Financial Management Law 2023 — the most senior currently-public statute touching public-sector audit in Puntland — is highlighted below. The OAG's standards-conformance page is honest about this gap.",
    so: "Xusuus: sharciga gaarka ah ee OAG ('Sharciga Hantidhawrka') wali kuma jiro xogtan guud. Sharciga Maamulka Maaliyadda Guud ee 2023 — ee ah sharciga ugu sare ee hadda daabacan oo la xiriira baarista qaybta dawladda ee Puntland — waa lagu calaamadiyay hoos. Boggii heerarka & u-hoggaansanaantu si daacad ah ayuu ka hadlaa khaladkan.",
  },

  // --- About page ---
  about_h1: { en: "About the OAG", so: "Ku saabsan OAG" },
  about_h_founded: { en: "Established", so: "La aas-aasay" },
  about_founded_body: {
    en: "The Office of the Auditor General was established in 1998, alongside the formation of the Puntland State of Somalia. Its core function is independent external audit of public funds in Puntland. The OAG's enabling statute is being brought into INTOSAI / ISSAI conformance and is not yet fully on the public record (see Authority).",
    so: "Xafiiska Hantidhawrka Guud waxaa la aasaasay 1998, isaga oo waafaqsan abuurista Dowladda Puntland ee Soomaaliya. Hawshiisa aasaasiga ah waa baaritaanka madax-banaan ee maaliyadda guud ee Puntland. Sharciga aasaasiga ah ee OAG waxaa la doonayaa in lagu hagaajiyo qaabka INTOSAI/ISSAI weli kumana jiro diiwaanka guud (eeg Awooda).",
  },
  about_h_mandate: { en: "Mandate", so: "Awoodda" },
  about_mandate_body: {
    en: "Independent external audit of the public sector accounts of Puntland State of Somalia. Audit categories include financial audit (the annual audit of the State's consolidated accounts), compliance audit, performance audit, forensic audit, and donor-funded project audit. Findings are issued as published reports.",
    so: "Baaritaan madax-banaan oo dibadda ah oo lagu sameeyo xisaabaadka guud ee Dowladda Puntland ee Soomaaliya. Qaybaha baaritaanka waxaa ka mid ah baaritaanka maaliyadeed (baaritaanka sanadlaha ah ee xisaabaadka guud ee Dowladda), baaritaan u-hoggaansanaan ah, baaritaan waxqabad, baaritaan forensic ah, iyo baaritaan mashruucyo deeq-bixiyeyaal maalgeliyaan. Natiijooyinka waxaa lagu soo saaraa warbixinno la daabaco.",
  },
  about_h_leadership: { en: "Leadership", so: "Hoggaanka" },
  about_leadership_body: {
    en: "The institution is led by the Auditor General. The current incumbent and contact details are maintained on the live OAG site at oag.pl.so and on the contact page. The name of the current officer is not printed here so the page does not become stale on succession — the office endures, the officer rotates.",
    so: "Hay'adda waxaa hoggaaminaya Hantidhawraha Guud. Sarkaalka hadda jooga iyo xiriirka waxaa lagu hayaa bogga toos ah ee OAG ee oag.pl.so iyo bogga xiriirka. Magaca sarkaalka hadda jooga halkan kuma daabacna si bogganu uusan u duugoobin marka la beddelo — xafiiska ayaa jiraya, sarkaalka ayaa wareegaya.",
  },

  // --- Authority page ---
  authority_h1: { en: "Audit authority", so: "Awoodda baarista" },
  authority_intro: {
    en: "This page states the OAG's legal authority honestly: what is on the public record, what is not yet, and how v1 handles the gap.",
    so: "Bogganu wuxuu si daacad ah uga hadlaa awoodda sharci ee OAG: waxa ku jira diiwaanka guud, waxa weli aan ku jirin, iyo sida nuqulkan 1aad ula tacaalo khaladkaas.",
  },
  authority_h_currently_public: {
    en: "What is currently on the public record",
    so: "Waxa hadda ku jira diiwaanka guud",
  },
  authority_currently_public_body: {
    en: "The Public Financial Management Law (Xeerka Maamulka Maaliyadda Guud ee DPL), 2023, is the most senior currently-public statute that touches public-sector audit in Puntland. The OAG re-hosts it on this site under the Legislation section. This statute and its surrounding instruments form the operating basis for the OAG's current activities.",
    so: "Sharciga Maamulka Maaliyadda Guud ee DPL, 2023, ayaa ah sharciga ugu sare ee hadda daabacan ee la xiriira baarista qaybta dawladda ee Puntland. OAG ayaa dib ku daabacaya bogganu oo ku jira qaybta Sharciyada. Sharcigan iyo aaladahiisa hareeraha ku xeeran waxay sameeyaan saldhigga hawlgalka ee OAG.",
  },
  authority_h_pending: {
    en: "What is pending",
    so: "Waxa la sugayo",
  },
  authority_pending_body: {
    en: "An 'Audit Act' (dedicated OAG enabling statute) is being prepared and brought into conformance with INTOSAI-P 1 / 10 and ISSAI 12. As of the v1 snapshot date (2 June 2026), this draft is not on the public record. The v1 site does not quote, paraphrase, or imply provisions of an instrument that is not publicly available. Doctrine §9 (honesty over impressiveness).",
    so: "'Sharci Hantidhawrka' (sharci gaar ah oo aasaasi ah OAG) ayaa la diyaarinayaa oo la geynayaa qaabka INTOSAI-P 1/10 iyo ISSAI 12. Iyada oo la eegayo taariikhda nuqulkan 1aad (2 Juun 2026), qoraalkani kuma jiro diiwaanka guud. Bogga 1aad ma soo xigtaaba, ma fasiraayo, mana muujiyo waxa ku jira aalado aan dadweynaha la heli karin. Habka §9 (daacadnimo > muuqaal-fiicnaan).",
  },
  authority_h_gap_handling: {
    en: "How v1 handles the gap",
    so: "Sida nuqulkan 1aad ula tacaalo khaladka",
  },
  authority_gap_handling_body: {
    en: "v1's Standards conformance page leans on internationally accepted ISSAI / INTOSAI-P / SAI-PMF principles — the same framework the pending Audit Act is being aligned to — and explicitly names the gap. When the Audit Act enters the public record, it will be added to the Legislation section and quoted here verbatim. Not before.",
    so: "Bogga heerarka & u-hoggaansanaanta ee nuqulkan 1aad wuxuu ku tiirsanyahay mabaadi'da ISSAI/INTOSAI-P/SAI-PMF ee dunida loo aqbalay — qaab-dhismeedka isku midka ah ee Sharciga Hantidhawrka ee la sugayo lagu hagaajinayo — wuuna si toos ah u magacaabaa khaladka. Markii Sharciga Hantidhawrka uu galo diiwaanka guud, waxaa lagu dari doonaa qaybta Sharciyada oo halkan lagu xigan doonaa si toos ah. Ka hor lama sameyn doono.",
  },

  // --- Methodology page ---
  methodology_h1: { en: "Methodology", so: "Habka Hawsha" },
  methodology_intro: {
    en: "How the OAG conducts audits. This page summarises the categories of audit and the high-level methodology; the substance of any individual audit is in the audit report itself.",
    so: "Sida OAG u sameeyo baaritaannada. Bogganu wuxuu soo koobaa qaybaha baaritaanka iyo habka guud; tafaasiisha baaris gaar ah waxay ku jirtaa warbixinta baaritaanka lafteeda.",
  },
  methodology_financial: { en: "Financial audit", so: "Baaritaan maaliyadeed" },
  methodology_financial_body: {
    en: "An annual independent audit of the State of Puntland's consolidated financial statements. Tests whether the accounts prepared by the Office of the Accountant General fairly present the financial position and results of operations for the fiscal year, in accordance with the applicable financial reporting framework. The audit opinion (unqualified, qualified, adverse, or disclaimer) is the central output.",
    so: "Baaritaan sanadle ah oo madax-banaan oo lagu sameeyo xisaabaadka guud ee Dowladda Puntland. Wuxuu tijaabiyaa in xisaabaadka uu diyaariyay Xafiiska Xisaabiyaha Guud ay si saxan u soo bandhigaan xaaladda maaliyadeed iyo natiijooyinka hawlgalka ee sanad-miisaaniyeed, iyada oo waafaqsan qaab-dhismeedka warbixinta maaliyadda ee la dabaqo. Ra'yiga baarista (aan-shardi-laheyn, shardi-leh, lid-ku-ah, ama qiil-darro) waa wax-soo-saarka udub-dhexaadka ah.",
  },
  methodology_compliance: { en: "Compliance audit", so: "Baaritaan u-hoggaansanaan" },
  methodology_compliance_body: {
    en: "Tests whether public sector activities comply with applicable laws, regulations, and authoritative guidance — including PFM Law, Tender & Contract Law, Civil Service Law, and revenue legislation.",
    so: "Wuxuu tijaabiyaa in hawlaha qaybta dawladda ay u hoggaansamayaan sharciyada, xeerarka, iyo hagidda awood-leh ee la dabaqo — oo ay ku jiraan Sharciga PFM, Sharciga Tartanka iyo Qandaraasyada, Sharciga Shaqaalaha Rayidka, iyo sharciyada dakhliga.",
  },
  methodology_performance: { en: "Performance audit", so: "Baaritaan waxqabad" },
  methodology_performance_body: {
    en: "Tests whether public funds achieve economy, efficiency, and effectiveness against intended objectives. Performance audit reports are subject to publication authority that is still being clarified; none have been published to date.",
    so: "Wuxuu tijaabiyaa in maaliyadda guud ay gaarto dhaqaale-galnimada, hufnaanta, iyo waxtarka ujeedooyinka loogu talo galay. Warbixinnada baarista waxqabadka waxay ku xiran yihiin awooda daabacaadda oo weli la cadayn karo; midna lama daabicin ilaa hadda.",
  },
  methodology_forensic: { en: "Forensic audit", so: "Baaritaan forensic ah" },
  methodology_forensic_body: {
    en: "Specialised investigations into suspected fraud or financial misconduct. Forensic findings are highly sensitive and follow a separate publication-authority workflow. None are in the v1 public record.",
    so: "Baaritaano takhasus leh oo lagu sameeyo dembi ama xad-gudub maaliyadeed laga shakiyay. Natiijooyinka forensic-ka aad bay u xasaasi yihiin waxayna raacaan habka u-saxiixaya u-daabacaadda. Midna kuma jiraan diiwaanka guud ee nuqulkan 1aad.",
  },
  methodology_donor: { en: "Donor-funded project audit", so: "Baaritaan mashruucyo deeq-bixiyeyaasha" },
  methodology_donor_body: {
    en: "Project-level audits of grant- or loan-funded programmes, often required by the funding agency's reporting covenants. None are in the v1 public record.",
    so: "Baaritaanno mashruuc heer-fure ah oo lagu sameeyo barnaamijyada deeq ama amaah lagu maalgeliyo, oo badanaa loo baahdo iyada oo waafaqsan heshiisyada warbixinta ee hay'adda maal-gelisa. Midna kuma jiraan diiwaanka guud ee nuqulkan 1aad.",
  },

  // --- Standards conformance ---
  standards_h1: { en: "Standards conformance", so: "Heerarka & u-hoggaansanaanta" },
  standards_intro: {
    en: "The OAG aligns its work with the International Standards of Supreme Audit Institutions (ISSAI) issued by INTOSAI, and tracks its institutional maturity against the SAI Performance Measurement Framework (SAI-PMF) and the value-and-benefits posture of ISSAI 12.",
    so: "OAG wuxuu hawshiisa la jaanqaadiyaa Heerarka Caalamiga ah ee Hay'adaha Hantidhawrka Sare (ISSAI) ee uu soo saaray INTOSAI, wuxuuna raad-raacaa horumarka hay'adda ee uu ka helo Qaab-dhismeedka Cabbiraadda Waxqabadka SAI (SAI-PMF) iyo qaybta qiimaha-iyo-faa'iidooyinka ee ISSAI 12.",
  },
  standards_disclaimer: {
    en: "v1 conformance posture is *aspirational* and is honest about the work in progress. A formal conformance attestation by a peer SAI body (e.g., AFROSAI-E, IDI) is post-v1.",
    so: "Heerka u-hoggaansanaanta ee nuqulkan 1aad waa mid *himilo-yaale ah* wuxuuna si daacad ah uga hadlaa shaqada socota. Caddaynta rasmiga ah ee u-hoggaansanaanta ee uu sameeyo hay'ad SAI saaxiib ah (sida AFROSAI-E, IDI) waa wax ka dambeeya nuqulkan 1aad.",
  },
  standards_issai_h: { en: "ISSAI framework", so: "Qaab-dhismeedka ISSAI" },
  standards_issai_body: {
    en: "ISSAI 100 — Fundamental Principles of Public-Sector Auditing — and the financial / compliance / performance audit standards (ISSAI 200, 300, 400 series) inform our methodology. Each annual financial audit report references the ISSAI series applied; see the individual report PDF.",
    so: "ISSAI 100 — Mabaadi'da Aasaasiga ah ee Baarista Qaybta Dawladda — iyo heerarka baaritaanka maaliyadeed/u-hoggaansanaanta/waxqabadka (ISSAI 200, 300, 400 series) ayaa wax-tar leh habkayaga. Warbixin kasta oo sanadle ah oo baaritaan maaliyadeed ah waxay tixraacaan silsiladda ISSAI ee la dabaqay; eeg warbixinta PDF gaarka ah.",
  },
  standards_saipmf_h: { en: "SAI-PMF posture", so: "Heerka SAI-PMF" },
  standards_saipmf_body: {
    en: "SAI-PMF assessments measure SAI capacity across six domains: independence and legal framework, internal governance, audit standards & methodology, management & support services, human resources & training, and communication & stakeholder engagement. The OAG's self-assessment status against these domains is being prepared. v1 does not publish a SAI-PMF self-score (overclaim risk); the page lists the domains and the OAG's current activities within each.",
    so: "Qiimeynta SAI-PMF waxay cabbirtaa awooda SAI ee lix qaybood: madax-bannaanida iyo qaab-dhismeedka sharci, maamulka gudaha, heerarka & habka baarista, adeegyada maamulka & taageerada, kheyraadka aadanaha & tababarrada, iyo isgaarsiinta & ka qaybgalka daneeyayaasha. Heerka is-qiimeynta OAG ee qaybahan waa la diyaarinayaa. Nuqulkan 1aad ma daabacayo dhibco SAI-PMF is-qiimeyn (khatarta dhaadhicin); bogganu wuxuu sii liisaa qaybaha iyo hawlaha hadda ee OAG ee mid kasta.",
  },
  standards_issai12_h: { en: "ISSAI 12 posture (value & benefits of SAIs)", so: "Heerka ISSAI 12 (qiimaha & faa'iidooyinka SAIs)" },
  standards_issai12_body: {
    en: "ISSAI 12 frames the public-value contribution of a SAI in three pillars: strengthening accountability, transparency, and integrity; demonstrating ongoing relevance to citizens, Parliament, and stakeholders; and being a model organisation through leading by example. v1 surfaces this posture honestly: this site itself is the institution's most concrete current act of transparency and accountability.",
    so: "ISSAI 12 wuxuu qaabeeyaa wax-ku-darka qiimaha guud ee SAI saddex tiir: xoojinta xisaab-xirka, daah-furnaanta, iyo daacadnimada; muujinta xiriirka socda ee dadweynaha, Baarlamaanka, iyo daneeyayaasha; iyo inuu noqdo hay'ad tusaale leh oo hoggaaminta ku hagaajisa tusaale. Nuqulkan 1aad si daacad ah ayuu u soo bandhigaa heerkan: bogganu lafteeda ayaa ah ficilka ugu sahlan ee hadda hay'addu samayso ee daah-furnaanta iyo xisaab-xirka.",
  },

  // --- Source-safety page ---
  source_safety_h1: { en: "Reporting concerns about public funds", so: "Soo gudbinta walaaca ku saabsan maaliyadda guud" },
  source_safety_subtitle: {
    en: "What the OAG can lawfully receive — and what it cannot legally promise. Please read before sharing anything.",
    so: "Waxa OAG si sharci ah u heli karo — iyo waxa aanu si sharci ah u ballan qaadi karin. Fadlan akhri ka hor inta aadan wax la wadaagin.",
  },
  source_safety_what_we_can: {
    en: "What we can do",
    so: "Waxa aanu sameyn karno",
  },
  source_safety_what_we_can_body: {
    en: "The OAG can receive written submissions that describe concerns about how public funds are spent or accounted for. Submissions that include verifiable documentation can be considered for inclusion in future financial, compliance, performance, or forensic audits, in accordance with the OAG's published methodology and resources.",
    so: "OAG wuxuu heli karaa soo gudbinta qoraalka ah oo qeexaya walaac ku saabsan sida maaliyadda guud loo qaybiyo ama loo xisaabiyo. Soo gudbinta oo ay ku jiraan dukumiintiyo la xaqiijin karo waxaa la tixgelin karaa in lagu daro baaritaannada maaliyadeed/u-hoggaansanaanta/waxqabad/forensic ee mustaqbalka, iyada oo waafaqsan habka loo daabacay iyo kheyraadka OAG.",
  },
  source_safety_what_we_cannot: {
    en: "What we cannot legally promise",
    so: "Waxa aanu si sharci ah u ballan qaadi karin",
  },
  source_safety_what_we_cannot_body: {
    en: "The OAG is, by default, treated as compellable to surrender records that identify a source if lawfully ordered to do so by a competent authority. Until and unless a dedicated whistleblower protection law explicitly shields the OAG from such compulsion, the institution cannot promise anonymity to a source whose identity is in the OAG's possession. Promising what the institution cannot keep would be itself a breach of public trust. v1 therefore does NOT collect names, contact details, or identifying metadata online.",
    so: "Si caadi ah, OAG waxaa loola dhaqmaa hay'ad si sharci ah loo qasbi karo inay soo bandhigto diiwaanno aqoonsadaya isha haddii ay si sharci ah u amrayso awoodda saxda ah. Ilaa iyo unless sharci gaar ah oo ilaalinta isha-warbixinta uu si toos ah uga ilaaliyo OAG qasab-yarayntaas, hay'adda ma ballan qaadi karto qarsoonida isha aqoonsigeedu uu ku jiro gacanta OAG. Ballan-qaadka waxa aanay hay'addu hayn karaynba laftigeedu waa ka-bedel kalsooni dadweyne. Nuqulkan 1aad sidaas darteed MA uruurinayo magacyo, faahfaahin xiriir, ama xog aqoonsi online.",
  },
  source_safety_paper_route: {
    en: "The paper / in-person route",
    so: "Habka warqadda / ee shakhsi ahaaneed",
  },
  source_safety_paper_route_body: {
    en: "Serious concerns may be submitted in writing, by paper, addressed to:",
    so: "Walaacyo halis ah waxaa lagu soo gudbin karaa qoraal warqad ah, oo loo cinwaaniyay:",
  },
  source_safety_paper_address_html: {
    en:
      "The Auditor General<br>Office of the Auditor General<br>Garowe, Puntland State of Somalia",
    so:
      "Hantidhawraha Guud<br>Xafiiska Hantidhawrka Guud<br>Garoowe, Dowladda Puntland ee Soomaaliya",
  },
  source_safety_consult_lawyer: {
    en: "Before disclosing anything that identifies you, or that an adversary might use to identify you, consult an independent lawyer or a recognised civil-society legal-aid organisation. This is not formal legal advice; it is a recommendation made in good faith.",
    so: "Ka hor intaadan shaaca ka qaadin wax kasta oo kuu aqoonsada, ama lagu adeegsan karo si laguugu aqoonsado, la tasho qareen madaxbannaan ama hay'ad bulsho rayidka caafimaadka qaaba la aqoonsanyahay. Tani maaha tala sharci rasmi ah; waa talo lagu siiyay daacadnimo.",
  },
  source_safety_no_digital: {
    en: "Why there is no digital tip form",
    so: "Sababta aanu lahayn foom dijital ah oo war soo gudbin",
  },
  source_safety_no_digital_body: {
    en: "The previous OAG website hosted a 'Public Reporting Portal' that collected free-text incident details, party identifications, file uploads, and locations, with a promise of confidentiality. That promise was not one the institution can legally keep under current law — and a written promise the institution cannot keep is worse than no promise at all. v1 will offer a digital intake only when (a) there is an enabling legal framework that genuinely shields source identity, and/or (b) a vetted external intermediary has accepted custody. Neither is in place at the v1 snapshot date.",
    so: "Boggii hore ee OAG wuxuu martigeliyay 'Bogga Soo Gudbinta Dadweynaha' oo uruurin jiray faahfaahin ku saabsan dhacdooyinka, aqoonsiyo, file-yo, iyo goobo, isagoo leh ballan qaadka qarsoonida. Ballan-qaadkaasi ma ahayn mid hay'addu si sharci ah u haysan karto ee sharciga hadda jira — ballan-qaadka qoraal ah oo aanay hay'addu haysan karinba waa ka xun mid aan jirin oo dhan. Nuqulkan 1aad wuxuu bixin doonaa foom dijital ah oo kaliya marka (a) jiro qaab-dhismeed sharci oo si dhab ah u ilaaliya aqoonsiga isha, iyo/ama (b) hay'ad dibadeed oo la xaqiijiyay ay aqbashay xafidka. Midna ma jiraan ilaa taariikhda nuqulkan 1aad.",
  },

  // --- Custody page ---
  custody_h1: { en: "Custody & mirrors", so: "Xafidka & nuqullada" },
  custody_lede: {
    en: "This page exists so that a takedown of the origin site is externally detectable. If you cannot reach the origin (oag.pl.so / this domain), the mirrors below should still hold the same Git corpus and the same site build, byte-for-byte. If a mirror has gone dark too, the archive snapshots remain.",
    so: "Bogganu wuxuu jiraa si in laga ogaado bannaanka haddii bogga asalka (oag.pl.so / domainkan) la goonbinayo. Haddii aadan gaari karin asalka, nuqullada hoose waa inay weli haystaan corpus-ka isku midka ah iyo isla soo saarka boggu, byte-byte ah. Haddii nuqul uu sidoo kale go'ay, nuqullada arkifka ayaa weli jira.",
  },
  custody_origin_label: { en: "Origin site", so: "Bogga asalka" },
  custody_namespace_label: { en: "Namespace authority", so: "Awoodda magaca" },
  custody_seizure_label: { en: "Seizure assessment", so: "Qiimeynta qabashada" },
  custody_mirrors_label: { en: "Public Git mirrors", so: "Nuqullo Git ah oo guud" },
  custody_archive_label: { en: "Public archive snapshots", so: "Nuqullo arkif ah oo guud" },
  custody_peer_label: { en: "Peer custodian", so: "Xafidka saaxiibka" },
  custody_last_snapshot: { en: "Last corpus fetch", so: "Soo qaadista corpus-ka ugu dambaysay" },

  // --- Contact page ---
  contact_h1: { en: "Contact", so: "Xiriir" },
  contact_official_label: { en: "Official OAG contact (live site)", so: "Xiriirka rasmiga ah ee OAG (bogga toos ah)" },
  contact_email_label: { en: "Email", so: "Iimayl" },
  contact_phone_label: { en: "Phone", so: "Taleefan" },
  contact_address_label: { en: "Address", so: "Cinwaan" },
  contact_site_label: { en: "Live site", so: "Bogga toos ah" },
  contact_archival_label: {
    en: "Note on this republication site",
    so: "Xusuus ku saabsan bogga dib-u-daabacaadda",
  },
  contact_archival_body: {
    en: "This site is a structured republication of the OAG's already-public outputs. For service requests, employment, or new disclosures, contact the OAG directly via the official channels above — not via this site's repository.",
    so: "Bogganu waa dib-u-daabacaad qaabaysan oo waxsoosaarrada OAG ee horey loo daabacay. Codsiyada adeegga, shaqada, ama daabacaadyo cusub, la xiriir OAG si toos ah iyada oo loo marayo kanaalada rasmiga ah ee kor ku xusan — eedabar loo mariyo bogga corpus-kan.",
  },
};

export function t(key: string, lang: Locale): string {
  const entry = T[key];
  if (!entry) throw new Error(`Missing i18n string: ${key}`);
  return entry[lang];
}
